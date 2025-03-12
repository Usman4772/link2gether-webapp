import {
  checkCommunityExistence,
  checkModerator,
  validateBanPayload,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { banUser } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const bannedUserId = req.nextUrl.pathname.split("/")[6];
    const community = await checkCommunityExistence(communityId);
    checkModerator(community, userId);
    const data = await validateBanPayload(req, bannedUserId, community, userId);
    await banUser(bannedUserId, community, userId, data);
    return SUCCESS_RESPONSE([], 200, `User has been banned successfully`);
  } catch (error) {
    return errorHandler(error);
  }
}
