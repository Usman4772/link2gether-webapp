import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
      const { userId } = await validateToken(req);
      
  } catch (error) {
      return errorHandler(error)
  }
}

function getUserProfileDetails(userId:any) {
  if (!userId || !Types.ObjectId.isValid(userId)) throw new apiErrors([], "Invalid user id", 400);


  
  
    
}
