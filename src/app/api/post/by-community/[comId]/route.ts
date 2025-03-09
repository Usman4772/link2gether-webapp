import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getCommunityPosts } from "@/utils/backend/modules/auth/services/comment.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[4];
    await checkCommunityExistence(communityId);
    const posts = await getCommunityPosts(communityId, userId);
    return SUCCESS_RESPONSE(posts, 200, "Posts fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
