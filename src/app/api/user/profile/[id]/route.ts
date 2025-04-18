import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { Types } from "mongoose";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import User from "@/models/user";
import { profile } from "console";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { getUserDetails } from "@/utils/backend/modules/auth/services/user.services.";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    await validateToken(req);
    const profileUserId = req.nextUrl.pathname.split("/").pop() as string;
    const user = await getUserDetails(profileUserId);
    return SUCCESS_RESPONSE(
      user,
      200,
      "User profile details fetched successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
