import { validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { validatePreferencesPayload } from "@/utils/backend/helpers/user.helpers";
import {
  connectToDatabase,
  handleError,
} from "@/utils/backend/modules/auth/services/authServices";
import {
  getRecommendedCommunities,
  updateUserPreferences,
} from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const userId = await validateToken(req);
    const data = await req.json();
    validatePreferencesPayload(data);
    await updateUserPreferences(userId, data);
    const communities = await getRecommendedCommunities(userId);
    return SUCCESS_RESPONSE(
      communities,
      200,
      "Communities fetched successfully"
    );
  } catch (error) {
    return handleError(error);
  }
}
