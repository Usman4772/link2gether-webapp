import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getPostDetails } from "@/utils/backend/modules/auth/services/post.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const id = req.nextUrl.pathname.split("/")[3];
    const post = await getPostDetails(id, userId);
    return SUCCESS_RESPONSE(post, 200, "Post details fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
