import { getAllUserCommunities } from "@/utils/backend/helpers/dashboard.helpers";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getTopActiveCommunities } from "@/utils/backend/modules/auth/services/dashoboard.services";
import dayjs from "dayjs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const topCommunities = await getTopActiveCommunities(userId);
    return SUCCESS_RESPONSE(
      topCommunities,
      200,
      "Top active communities fetched successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}


