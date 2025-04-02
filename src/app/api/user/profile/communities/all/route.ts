import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getAllUserCommunities } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communities = await getAllUserCommunities(userId);
    return SUCCESS_RESPONSE(
      communities,
      200,
      "Communities fetched successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
