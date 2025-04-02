import Community from "@/models/community";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getUserCreatedCommunities } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communities = await getUserCreatedCommunities(userId);
    return SUCCESS_RESPONSE(
      communities,
      200,
      "User Communities fetched successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}

