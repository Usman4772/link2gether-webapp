import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getAllPosts } from "@/utils/backend/modules/auth/services/post.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const posts = await getAllPosts(userId, req);
    return SUCCESS_RESPONSE(posts, 200, "Posts fetched successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}
