import apiErrors from "@/utils/backend/helpers/apiErrors";
import {
  checkAdmin,
  checkCommunityExistence,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { rejectJoinRequest } from "@/utils/backend/modules/auth/services/admin.community.services";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[4];
    const community = await checkCommunityExistence(communityId);
    checkAdmin(userId, community);
    await rejectJoinRequest(community, req);
    return SUCCESS_RESPONSE([], 200, "Request rejected successfully");
  } catch (error) {
    return errorHandler(error);
  }
}


