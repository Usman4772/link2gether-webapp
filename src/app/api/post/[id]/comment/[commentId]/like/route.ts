import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { handleLikeComment } from "@/utils/backend/modules/auth/services/comment.services";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const commentId = req.nextUrl.pathname.split("/")[5];
   const payload= await handleLikeComment(commentId, userId);
    return SUCCESS_RESPONSE(payload, 200, "Success");
  } catch (error) {
    return errorHandler(error);
  }
}

