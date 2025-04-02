import { errorHandler, validatePublicToken, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getPostDetails } from "@/utils/backend/modules/auth/services/post.services";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const id = req.nextUrl.pathname.split("/")[3];
    if (Types.ObjectId.isValid(id)) {
      const { userId } = await validateToken(req);
      const post = await getPostDetails(req, id, userId);
      return SUCCESS_RESPONSE(post, 200, "Post details fetched successfully");
    }
    //we assume it's a public id so we don't send unauthenticated message.
    const userId = await validatePublicToken(req);
    const post = await getPostDetails(req, id,userId);
    return SUCCESS_RESPONSE(post, 200, "Post details fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}


