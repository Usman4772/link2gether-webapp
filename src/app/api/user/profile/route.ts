import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getUserProfileDetails } from "@/utils/backend/modules/auth/services/user.services.";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
      const { userId } = await validateToken(req);
     const user= await getUserProfileDetails(userId);
    return  SUCCESS_RESPONSE(user, 200, "User profile details fetched successfully");
  } catch (error) {
      return errorHandler(error)
  }
}

    

