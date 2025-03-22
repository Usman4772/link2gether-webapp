import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { validateUpdateProfilePayload } from "@/utils/backend/helpers/user.helpers";
import {
    connectToDatabase
} from "@/utils/backend/modules/auth/services/authServices";
import { updateProfile } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const data = await validateUpdateProfilePayload(req);
    const user = await updateProfile(data, userId);
    return SUCCESS_RESPONSE(user, 200, "Profile updated successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
