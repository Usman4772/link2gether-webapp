import Comment from "@/models/comments";
import Post from "@/models/posts";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { validateCommentData } from "@/utils/backend/helpers/comment.helpers";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { handlePostComment } from "@/utils/backend/modules/auth/services/comment.services";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const postId = req.nextUrl.pathname.split("/")[3];
    const content = await validateCommentData(postId, req);
    await handlePostComment(postId, userId, content);
    return SUCCESS_RESPONSE([], 201, "Comment added successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
