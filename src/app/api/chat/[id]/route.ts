import Chats from "@/models/chat.schema";
import Message from "@/models/messsage.schema";
import User from "@/models/user";
import {
  errorHandler,
  generateChannelId,
  validateToken,
} from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import {
  ChatMessage,
  MessageType,
} from "@/utils/backend/modules/auth/types/chat.types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
   const {userId}= await validateToken(req);
    const channelId = req.nextUrl.pathname.split("/").at(-1) as string;
    // const channelId = generateChannelId(userId, receiverId);
    const chat = await fetchChatMessages(channelId,userId);
    return SUCCESS_RESPONSE(chat, 200, "Chat messages fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

async function fetchChatMessages(channelId: string,userId:string) {
  const chat = await Chats.findOne({ channelId })
    .populate({
      path: "messages",
      model: Message,
      populate: {
        path: "senderId",
        model: User,
        select: "_id profileImage ",
      },
      select: "-_-id -chatId -created_at -__v",
    })
    .select("-_id messages");
  if (!chat) {
    return [];
  }
  return chat?.messages?.map((message: MessageType): ChatMessage => {
    return {
      _id: message._id,
      channelId: message.channelId,
      sender: {
        type:message?.senderId?._id==userId?"user":"receiver",
        _id: message.senderId._id,
        profileImage: message.senderId.profileImage,
      },
      message: message.message,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  });
}
