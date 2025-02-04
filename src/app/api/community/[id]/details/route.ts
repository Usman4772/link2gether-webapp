import apiErrors from "@/utils/backend/helpers/apiErrors";
import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId ,user } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split('/')[3]
    const community = await checkCommunityExistence(communityId);
    return SUCCESS_RESPONSE(
      community,
      200,
      "Community fetched successfully!!!"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
