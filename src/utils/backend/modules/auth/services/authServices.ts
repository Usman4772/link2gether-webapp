import Tokens from "@/models/tokens";
import User from "@/models/user";
import bcrypt from "bcrypt";
import {jwtVerify} from "jose";
import jwt from "jsonwebtoken";
import moment from "moment";
import {ObjectId} from "mongoose";
import mongoose from "mongoose";
import {NextRequest} from "next/server";
import {UserPayload} from "../../../../frontend/types";
import {uploadMedia} from "../../../../frontend/uploadMedia";
import {LoginProps} from "../types/types";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import {loginSchema, registerSchema} from "@/utils/backend/validation-schema/auth.schema";

export async function connectToDatabase() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI!,
        );
    } catch (error: any) {
        throw new apiErrors(error, "Database connection error", 500)
    }

}

export function validateUserData(userData: any, route: "register" | "login") {
    const result =
        route == "register"
            ? registerSchema.safeParse(userData)
            : loginSchema.safeParse(userData);
    if (!result.success) {
        const errors = result.error?.errors.map((err) => {
            return {
                [err?.path.toString()]: err?.message,
            };
        });
        throw new apiErrors(errors, "Validation errors found", 400);
    }
}

export async function handleMediaUpload(media: Blob | null) {
    if (!media) return null;

    const {secure_url}: any = await uploadMedia(media, "link-to-gether");
    return secure_url || null;
}

export async function checkUserExistence(email: string) {
    const user = await User.findOne({email});
    if (user) {
        throw new apiErrors(
            [{email: "This email is already registered"}],
            "User already exists",
            400
        );
    }
}

export async function createUser(userData: any) {
    return await User.create(userData);
}

export function createToken(id: ObjectId, remember: boolean = false) {
    let maxAge: jwt.SignOptions["expiresIn"] = "1d";
    if (remember) maxAge = "7d";
    return jwt.sign({id}, "u$man2309", {expiresIn: maxAge});
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export function userPayload(user: any, token: string): UserPayload {
    return {
        id: user._id,
        username: user.username,
        onboardingStatus: user.onboardingStatus,
        email: user.email,
        profileImage: user.profileImage,
        remember: user.remember,
        token: token,
    };
}

export async function parseRegisterFormData(req: NextRequest) {
    try {
        const formData = await req.formData();
        let profileImage: any = formData?.get("profileImage");
        if (
            profileImage?.name == "" ||
            profileImage?.size == 0 ||
            profileImage == ""
        ) {
            profileImage = null;
        }
        return {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirm_password: formData.get("confirm_password") as string,
            profileImage: profileImage as Blob | null,
        };
    } catch (error) {
        throw new apiErrors(
            [
                {
                    username: "Username is required",
                },
                {
                    email: "Email is required",
                },
                {
                    password: "Password is required",
                },
                {
                    confirm_password: "Confirm password is required",
                },
            ],
            "Validation errors",
            400
        );
    }
}

export async function parseLoginFormData(req: NextRequest) {
    const formData = await req.json();
    if (!formData) throw new apiErrors([{email: "Email is required"}, {password: "Password is required"}], "Validation errors found", 400);
    if (!formData.email) throw new apiErrors([{email: "Email is required"}], "Validation errors found", 400);
    if (!formData.password) throw new apiErrors([{password: "Password is required"}], "Validation errors found", 400);

    return {
        email: formData.email as string,
        password: formData.password as string,
        remember: formData.remember as boolean,
    };

}

export async function verifyLoginDetails(userData: LoginProps) {
    const user = await User.findOne({email: userData.email});
    if (!user) {
        throw new apiErrors(
            [{email: "This email is not registered"}],
            "This email is not registered",
            400
        );
    }
    user.remember = false;
    await user.save();
    const remember = userData.remember;

    const isPasswordCorrect = await decryptPassword(userData?.password, user);
    if (!isPasswordCorrect) {
        throw new apiErrors([], "Invalid email or password", 400);
    }
    if (remember) user.remember = remember;
    await user.save();
    return user;
}

export async function decryptPassword(password: string, user: any) {
    return await bcrypt.compare(password, user?.password);
}

export function getLoginPayload(user: any, token: string) {
    return {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        remember: user?.remember,
        onboardingStatus: user?.onboardingStatus,
        profileImage: user?.profileImage,
        communityMemberships: user?.communityMemberships,
        posts: user?.posts,
        created_at: user?.created_at,
        token: token,
    };
}

export function LogoutError(
    errors: [] | string = [],
    message: string = "Logout request failed"
) {
    throw new Error(
        JSON.stringify({
            errors: errors,
            status: 400,
            message: message,
        })
    );
}

export async function validateLogoutRequest(req: NextRequest) {
    const headers = req.headers.get("authorization");
    if (!headers) throw new apiErrors([], "Logout request failed", 400);
    const token = headers.split(" ")[1];
    if (!token) return new apiErrors([], "Logout request failed", 400);
    await verifyToken(token);
}

export async function verifyToken(token: string) {
    const isVerified = await jwtVerify(
        token,
        new TextEncoder().encode("u$man2309")
    );
    if (!isVerified) return new apiErrors([], "Logout request failed", 400);
    const loggedIn = await Tokens.findOne({token});
    if (!loggedIn) throw new apiErrors([], "User already logged out", 400);
    await Tokens.findOneAndDelete({token});
    const userId = isVerified?.payload?.id;
    const user = await User.findById(userId);
    if (!user) return new apiErrors([], "Logout request failed", 400);
    user.token = null;
    user.remember = false;
    await user.save();
}

export function getTokenExpiration(remember: boolean | undefined) {
    const expires_at = moment()
        .add(remember ? 7 : 1, "days")
        .toDate();
    return expires_at;
}

export async function changePassword(data: any, user: any) {
    const decryptedPass = await decryptPassword(data?.old_password, user);
    if (!decryptedPass) {
        throw new apiErrors(
            [{old_password: "Old password is incorrect"}],
            "Old password is incorrect",
            400
        );
    }

    const hashedPassword = await hashPassword(data.new_password);
    user.password = hashedPassword;
    await user.save();
}
