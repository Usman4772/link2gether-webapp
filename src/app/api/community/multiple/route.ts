import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { validateMultipleCommunitiesData } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { joinMultipleCommunities } from "@/utils/backend/modules/auth/services/community.services";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId, user } = await validateToken(req);
    if (user.onboardingStatus === "completed")
      throw new apiErrors(
        [{ onboardingStatus: user.onboardingStatus }],
        "User has already completed onboarding",
        200
      );
    const data = await validateMultipleCommunitiesData(req);
    const res = await joinMultipleCommunities(data.joined, userId);
    const dbUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          onboardingStatus: "completed",
        },
      },
      { new: true, runValidators: true }
    ).select("onboardingStatus");
    await dbUser.save();
    return SUCCESS_RESPONSE(dbUser, 200, "Communities Joined successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}
