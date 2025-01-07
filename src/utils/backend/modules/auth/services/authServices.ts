import { connectDb } from "@/db/connectDb";
import Tokens from "@/models/tokens";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import moment from "moment";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";
import { UserPayload } from "../../../../frontend/types";
import { uploadMedia } from "../../../../frontend/uploadMedia";
import { ERROR_RESPONSE } from "../../../helpers/responseHelpers";
import { loginSchema, registerSchema } from "../../../helpers/validationSchema";
import { LoginProps } from "../types/types";

export async function connectToDatabase() {
  if (!(await connectDb())) {
    throw new Error(
      JSON.stringify({
        errors: "Database not connected",
        status: 500,
        message: "Database connection error",
      })
    );
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
    throw new Error(
      JSON.stringify({
        errors,
        status: 400,
        message: "Validation errors found",
      })
    );
  }
}

export async function handleMediaUpload(media: Blob | null) {
  if (!media) return null;

  const { secure_url }: any = await uploadMedia(media, "link-to-gether");
  return secure_url || null;
}

export async function checkUserExistence(email: string) {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(
      JSON.stringify({
        errors: [{ email: "This email is already registered" }],
        status: 404,
        message: "User already exists",
      })
    );
  }
}

export async function createUser(userData: any) {
  return await User.create(userData);
}

export function createToken(id: ObjectId, remember: boolean = false) {
  let maxAge = "1d";
  if (remember) maxAge = "7d";
  return jwt.sign({ id }, "u$man2309", { expiresIn: maxAge });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export function userPayload(user: any, token: string): UserPayload {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    remember: user.remember,
    token: token,
  };
}

export function handleError(error: any) {
  let parsedError;
  try {
    parsedError =
      typeof error.message === "string" && error.message.trim()
        ? JSON.parse(error.message)
        : { message: error?.message || "Something went wrong", status: 500 };
  } catch {
    parsedError = {
      message: error?.message || "Something went wrong",
      errors: null,
      status: 500,
    };
  }
  return ERROR_RESPONSE(
    parsedError.errors || "",
    parsedError.status || 500,
    parsedError.message || "Something went wrong"
  );
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
    throw new Error(
      JSON.stringify({
        errors: [
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
        status: 401,
        message: "Validation errors",
      })
    );
  }
}

export async function parseLoginFormData(req: NextRequest) {
  try {
    const formData = await req.formData();
    return {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
  } catch (error) {
    try {
      const formData = await req.json();
      return {
        email: formData.email as string,
        password: formData.password as string,
        remember: formData.remember as boolean,
      };
    } catch (error) {
      throw new Error(
        JSON.stringify({
          errors: [
            { email: "Email is required" },
            { password: "Password is required" },
          ],
          status: 401,
          message: "Validation errors found",
        })
      );
    }
  }
}

export async function verifyLoginDetails(userData: LoginProps) {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error(
      JSON.stringify({
        errors: [{ email: "This email is not registered" }],
        status: 401,
        message: "This email is not registered",
      })
    );
  }
  user.remember = false;
  await user.save();
  const remember = userData.remember;

  const isPasswordCorrect = await decryptPassword(userData?.password, user);
  if (!isPasswordCorrect) {
    throw new Error(
      JSON.stringify({
        errors: [],
        status: 401,
        message: "Invalid email or password",
      })
    );
  }
  if (remember) user.remember = remember;
  await user.save();
  return user;
}

export async function decryptPassword(password: string, user: any) {
  return await bcrypt.compare(password, user?.password);
}

export function getLoginPaylod(user: any, token: string) {
  return {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    remember: user?.remember,
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
  if (!headers) return LogoutError([], "Logout request failed");
  const token = headers.split(" ")[1];
  if (!token) return LogoutError([], "Logout request failed");
  await verifyToken(token);
}

export async function verifyToken(token: string) {
  try {
    const isVerified = await jwtVerify(
      token,
      new TextEncoder().encode("u$man2309")
    );
    if (!isVerified) return LogoutError([], "Logout request failed");
    const loggedIn = await Tokens.findOne({ token });
    if (!loggedIn) throw new Error("User already logged out");
    await Tokens.findOneAndDelete({ token });
    const userId = isVerified?.payload?.id;
    const user = await User.findById(userId);
    if (!user) return LogoutError([], "Logout request failed");
    user.token = null;
    user.remember = false;
    await user.save();
  } catch (error: any) {
    return LogoutError(error?.message, "Logout request failed");
  }
}

export function getTokenExpiration(remember: boolean | undefined) {
  const expires_at = moment()
    .add(remember ? 7 : 1, "days")
    .toDate();
  return expires_at;
}
