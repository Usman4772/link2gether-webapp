import Post from "@/models/posts";
import User from "@/models/user";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import {
  getSavedPosts,
  getUserProfileDetails,
} from "@/utils/backend/modules/auth/services/user.services.";
import { SaveFilled } from "@ant-design/icons";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const posts = await getSavedPosts(userId);
    return SUCCESS_RESPONSE(posts, 200, "Saved Posts fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
