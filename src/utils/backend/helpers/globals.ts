import Tokens from "@/models/tokens";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import apiErrors from "./apiErrors";
import User from "@/models/user";

export async function validateToken(req: NextRequest) {
  const headers = req.headers;

  const token = headers.get("Authorization")?.split(" ")[1];
  if (!token) throw new apiErrors([], "Unauthorized", 401);

  const userToken = await Tokens.findOne({ token: token });
  if (!userToken) throw new apiErrors([], "Unauthorized", 401);

  const tokenDetails = await jwtVerify(
    token,
    new TextEncoder().encode("u$man2309")
  );
  const userId = tokenDetails?.payload?.id;
  const user = await User.findById(userId);
  return { userId, user };
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
