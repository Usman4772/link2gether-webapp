import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { validatePreferencesPayload } from "@/utils/backend/helpers/user.helpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { updateUserPreferences } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const data = await req.json();
    validatePreferencesPayload(data);
    await updateUserPreferences(userId, data);
    return SUCCESS_RESPONSE([], 200, "Categories added successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
