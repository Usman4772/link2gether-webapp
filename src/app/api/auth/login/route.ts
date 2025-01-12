import Tokens from "@/models/tokens";
import { errorHandler } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
  connectToDatabase,
  createToken,
  getLoginPayload,
  getTokenExpiration,
  parseLoginFormData,
  validateUserData,
  verifyLoginDetails,
} from "@/utils/backend/modules/auth/services/authServices";
import { LoginProps } from "@/utils/backend/modules/auth/types/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const userData: LoginProps = await parseLoginFormData(req);
    validateUserData(userData, "login");

    const user = await verifyLoginDetails(userData);
    const token = createToken(user?._id, userData.remember);

    const expires_at = getTokenExpiration(userData?.remember);
    await Tokens.create({ token, userId: user?._id, expires_at });
    const payload = getLoginPayload(user, token);
    return SUCCESS_RESPONSE(payload, 200, "Logged in successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
