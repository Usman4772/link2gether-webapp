import {
  checkAdmin,
  checkCommunityExistence,
  validateRulesPayload,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { addRules } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    checkAdmin(userId, community);
    const {rules} = await validateRulesPayload(req);
    await addRules(rules, community);
    return SUCCESS_RESPONSE([], 200, "Rules added successfully");
  } catch (error) {
    return errorHandler(error);
  }
}


