import apiErrors from "@/utils/backend/helpers/apiErrors";
import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { JoinCommunity } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    if (
      community.visibility == "private" &&
      !community.members.includes(userId)
    ) {
      //todo create a separate joinRequest table and modify admin request table accordingly.
      if (!community.joinRequests.includes(userId)) {
        community.joinRequests.push(userId);
      }
      await community.save();
      return SUCCESS_RESPONSE([], 200, "Request sent successfully!");
    }

    await JoinCommunity(userId, community);
    return SUCCESS_RESPONSE([], 200, "Community Joined successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}

