import apiErrors from "@/utils/backend/helpers/apiErrors";
import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { handleCancelRequest } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    await handleCancelRequest(community, userId);
    return SUCCESS_RESPONSE([], 200, "Request cancelled successfully!!!");
  } catch (error) {
    return errorHandler(error);
  }
}
