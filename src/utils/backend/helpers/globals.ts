import Tokens from "@/models/tokens";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import apiErrors from "./apiErrors";
import User from "@/models/user";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

export async function validateToken(
  req: NextRequest
): Promise<{ userId: string; user: any }> {
  const headers = req.headers;
  const token = headers.get("Authorization")?.split(" ")[1];
  if (!token) throw new apiErrors([], "Unauthenticated", 401);

  const userToken = await Tokens.findOne({ token: token });
  if (!userToken) throw new apiErrors([], "Unauthenticated", 401);

  const tokenDetails = await jwtVerify(
    token,
    new TextEncoder().encode("u$man2309")
  );
  const userId = tokenDetails?.payload?.id as string;
  const user = await User.findById(userId);
  return { userId, user };
}

export async function validatePublicToken(req: NextRequest) {
  const headers = req.headers;
  const token = headers.get("Authorization")?.split(" ")[1];
  if (!token) return null;
  const userToken = await Tokens.findOne({ token: token });
  if (!userToken) return null;

  const tokenDetails = await jwtVerify(
    token,
    new TextEncoder().encode("u$man2309")
  );
  const userId = tokenDetails?.payload?.id;
  return userId;
}

export const errorHandler = (error: any) => {
  if (error instanceof apiErrors) {
    return NextResponse.json(
      {
        message: error.message,
        success: error.success,
        errors: error.errors,
      },
      { status: error.status }
    );
  }

  return NextResponse.json(
    {
      message: error?.message || "Internal server error",
      success: false,
      errors: [],
    },
    { status: 500 }
  );
};

export function generateChannelId(
  loggedInUserId: string,
  receiverId: string
): string {
  if (!receiverId || !Types.ObjectId.isValid(receiverId)) {
    throw new apiErrors([], "Invalid receiver Id", 400);
  }
  return `${loggedInUserId}_${receiverId}`;
}
