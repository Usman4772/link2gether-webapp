import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
  parseCommunityFormData,
  validateCommunityPayload,
} from "@/utils/backend/helpers/user.helpers";
import {
  connectToDatabase,
  handleMediaUpload,
} from "@/utils/backend/modules/auth/services/authServices";
import { createCommunity } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { user, userId } = await validateToken(req);

    const formData = await req.formData();
    await validateCommunityPayload(formData);
    const data = await parseCommunityFormData(formData);
    const avatar = await handleMediaUpload(data.avatar);
    data.avatar = avatar;
    const community = await createCommunity(data, userId);
    user.communityMemberships.push(community._id);
    await user.save();
    return SUCCESS_RESPONSE(community, 201, "Community created successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
