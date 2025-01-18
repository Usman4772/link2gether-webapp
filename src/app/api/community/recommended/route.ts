import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getRecommendedCommunities } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId, user } = await validateToken(req);
    if (user.onboardingStatus === "completed")
      //todo set this status in cookies as well so we can check this using middleware
      throw new apiErrors(
        [{ onboardingStatus: user.onboardingStatus }],
        "User has already completed onboarding",
        200
      );
    const communities = await getRecommendedCommunities(userId);
    return SUCCESS_RESPONSE(
      communities,
      200,
      "Communities fetched successfully!"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
