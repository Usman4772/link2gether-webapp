
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";
import {deleteChat, fetchChatMessages} from "@/utils/backend/modules/auth/services/chat.services";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const receiverId = req.nextUrl.pathname.split("/").at(-1) as string;
    const chat = await fetchChatMessages(userId, receiverId);
    return SUCCESS_RESPONSE(chat, 200, "Chat messages fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}


export async function DELETE(req:NextRequest){
  try {
    await connectToDatabase()
    await validateToken(req)
    const chatId=req.nextUrl.pathname.split("/").at(-1) as string;
    await deleteChat(chatId);
    return SUCCESS_RESPONSE([], 200, "Chat deleted successfully");
  }catch(error) {
    return errorHandler(error);
  }
}