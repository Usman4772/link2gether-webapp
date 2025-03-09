import Comment from "@/models/comments";
import Post from "@/models/posts";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getPostComments } from "@/utils/backend/modules/auth/services/comment.services";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const postId = req.nextUrl.pathname.split("/")[3];
    const comments = await getPostComments(postId, userId);
    return SUCCESS_RESPONSE(comments, 200, "Comments fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}


