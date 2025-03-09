import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { likePost } from "@/utils/backend/modules/auth/services/post.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const postId = req.nextUrl.pathname.split("/")[3];
   const post= await likePost(postId, userId);
    return SUCCESS_RESPONSE(post, 200, "Success");
  } catch (error) {
    return errorHandler(error);
  }
}




