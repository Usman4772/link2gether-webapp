import {
  checkAdmin,
  checkCommunityExistence,
  validateSingleModData,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { removeModerator } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    checkAdmin(userId, community);
    const modId = validateSingleModData(req, community, userId);
    await removeModerator(communityId, modId);
    return SUCCESS_RESPONSE([], 200, "Moderators removed successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
