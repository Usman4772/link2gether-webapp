import { validateMultipleCommunitiesData } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { joinMultipleCommunities } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const userId = await validateToken(req);
    const data = await validateMultipleCommunitiesData(req);
    const res = await joinMultipleCommunities(data.joined, userId);
    return SUCCESS_RESPONSE([], 200, "Communities Joined successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}
