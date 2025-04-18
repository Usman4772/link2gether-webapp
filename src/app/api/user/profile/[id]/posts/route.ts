import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { Types } from "mongoose";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getUserPosts } from "@/utils/backend/modules/auth/services/user.services.";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const profileUserId = req.nextUrl.pathname.split("/")[4] as string;
    const posts = await getUserPosts(req, profileUserId, userId);
    return SUCCESS_RESPONSE(posts, 200, "User posts fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
