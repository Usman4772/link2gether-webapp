import Community from "@/models/community";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { user } = await validateToken(req);
    if (user.onboardingStatus == "completed")
      throw new apiErrors(
        [{ onboardingStatus: user.onboardingStatus }],
        "User has already completed onboarding",
        200
      );
    const communities = await Community.find({});
    const payload = getPayload(communities, user);
    return SUCCESS_RESPONSE(payload, 200, "Categories fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

function getPayload(data: any[], user: any) {
  return data.map((item) => {
    return {
      name: item.community_name,
      description: item.description,
      icon: item.avatar,
      value: item?.category,
      onboardingStatus: user.onboardingStatus,
    };
  });
}
