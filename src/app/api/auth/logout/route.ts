import { errorHandler } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
  connectToDatabase,
  validateLogoutRequest,
} from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    await validateLogoutRequest(req);
    return SUCCESS_RESPONSE({}, 200, "Logout successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
