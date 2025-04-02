import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { fetchExploreCommunities } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { user } = await validateToken(req);
    const query = req.nextUrl.searchParams.get("query") || null;
    const communities = await fetchExploreCommunities(user,query);
    return SUCCESS_RESPONSE(
      communities,
      200,
      "Communities Fetched Successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
