import {
  checkAdmin,
  checkCommunityExistence,
  validateRulesPayload,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { RulesPayload } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    checkAdmin(userId, community);
    const { rules, merge } = await validateRulesPayload(req);
    await updateRules(rules, merge, community);
    return SUCCESS_RESPONSE([], 200, "Rules updated successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

async function updateRules(
  rules: {rule:string}[],
  merge: boolean,
  community: any
) {
  if (!merge) {
    community.rules = rules;
    await community.save();
    return;
  }

  await mergeRules(rules, community);
}

async function mergeRules(rules: {rule:string}[], community: any) {
  const mergedRules = [...community.rules, ...rules];
  community.rules = mergedRules;
  await community.save();
}
