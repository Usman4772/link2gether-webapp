import {
  connectToDatabase,
  createToken,
  getLoginPaylod,
  getTokenExpiration,
  parseLoginFormData,
  validateUserData,
  verifyLoginDetails,
} from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../../../utils/backend/modules/auth/services/authServices";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { LoginProps } from "@/utils/backend/modules/auth/types/types";
import Tokens from "@/models/tokens";
import moment from "moment";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const userData: LoginProps = await parseLoginFormData(req);
    validateUserData(userData, "login");
    const user = await verifyLoginDetails(userData);
    const token = createToken(user?._id, userData.remember);

    const expires_at = getTokenExpiration(userData?.remember);
    await Tokens.create({ token, userId: user?._id, expires_at });
    const payload = getLoginPaylod(user, token);
    return SUCCESS_RESPONSE(payload, 200, "Logged in successfully");
  } catch (error) {
    return handleError(error);
  }
}
