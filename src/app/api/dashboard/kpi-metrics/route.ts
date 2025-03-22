import Community from "@/models/community";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { getKPIsData } from "@/utils/backend/modules/auth/services/dashoboard.services";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const data = await getKPIsData(userId);
    return SUCCESS_RESPONSE(data, 200, "KPIs data fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
