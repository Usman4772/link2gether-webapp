import Tokens from "@/models/tokens";
import User from "@/models/user";
import {
  errorHandler,
  validatePublicToken,
  validateToken,
} from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getPostComments } from "@/utils/backend/modules/auth/services/comment.services";
import { jwtVerify } from "jose";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const postId = req.nextUrl.pathname.split("/")[3];
    if (Types.ObjectId.isValid(postId)) {
      const { userId } = await validateToken(req);
      const comments = await getPostComments(postId, userId);
      return SUCCESS_RESPONSE(comments, 200, "Comments fetched successfully");
    }
    //we assume it's a public id so we don't send unauthenticated message.
    const userId = await validatePublicToken(req);
    const comments = await getPostComments(postId, userId);
    return SUCCESS_RESPONSE(comments, 200, "Comments fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
