import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { handleLeaveCommunity } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { user } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    await handleLeaveCommunity(community, user);
    return SUCCESS_RESPONSE([], 200, "Community Left successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}
