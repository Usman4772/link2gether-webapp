import { validateSendMessageRequest } from "@/utils/backend/helpers/chat.helpers";
import {
  errorHandler,
  generateChannelId,
  validateToken,
} from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { sendMessageService } from "@/utils/backend/modules/auth/services/chat.services";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId:senderId } = await validateToken(req);
    const receiverId = req.nextUrl.pathname.split("/").at(-2) as string;
    const { message } = await req.json();
    await validateSendMessageRequest(receiverId, message);
    const messageResponse = await sendMessageService(senderId,receiverId, message);
    return SUCCESS_RESPONSE(messageResponse, 200, "Message sent successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
