import Tokens from "@/models/tokens";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function validateToken(req: NextRequest) {
  const headers = req.headers;

  const token = headers.get("Authorization")?.split(" ")[1];
  if (!token)
    throw new Error(
      JSON.stringify({
        errors: [],
        status: 401,
        message: "Unauthenticated",
      })
    );
  try {
    const userToken = await Tokens.findOne({ token: token });
    if (!userToken) throw new Error("Unauthenticated");

    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode("u$man2309")
    );
    const userId = tokenDetails?.payload?.id;
    return userId;
  } catch (error: any) {
    return unauthorizedError(error?.message);
  }
}

function unauthorizedError(message: string) {
  throw new Error(
    JSON.stringify({
      status: 401,
      message: message,
    })
  );
}
