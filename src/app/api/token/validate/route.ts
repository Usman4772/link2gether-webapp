import Tokens from "@/models/tokens";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const headers = req.headers;
    const token = headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return SUCCESS_RESPONSE(
        { isValid: false },
        200,
        "Validated successfully!"
      );

    const userToken = await Tokens.findOne({ token: token });
    if (!userToken)
      return SUCCESS_RESPONSE(
        { isValid: false },
        200,
        "Validated successfully!"
      );

    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode("u$man2309")
    );
    if (tokenDetails?.payload?.id) {
      return SUCCESS_RESPONSE(
        { isValid: true },
        200,
        "Validated successfully!"
      );
    }

    return SUCCESS_RESPONSE({ isValid: false }, 200, "Validated successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}
