import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const community = await checkCommunityExistence(req);
    return SUCCESS_RESPONSE(
      community,
      200,
      "Community fetched successfully!!!"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
