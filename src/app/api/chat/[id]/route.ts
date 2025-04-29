import Chats from "@/models/chat.schema";
import Message from "@/models/messsage.schema";
import User from "@/models/user";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { createChat } from "@/utils/backend/modules/auth/services/chat.services";
import {
  ChatMessage,
  RawMessage,
} from "@/utils/backend/modules/auth/types/chat.types";
import { NextRequest } from "next/server";

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

async function fetchChatMessages(userId: string, receiverId: string) {
  const chat = await Chats.findOne({
    participants: { $all: [userId, receiverId] },
  })
    .populate({
      path: "messages",
      model: Message,
      populate: {
        path: "senderId",
        model: User,
        select: "_id profileImage ",
      },
      select: "-_-id -created_at -__v",
    })
    .select(" messages");
  console.log("chat", chat);
  if (!chat) {
    const chat = await createChat(userId, receiverId);
    return {
      chatId: chat?._id,
      messages: [],
    };
  }
  const messages = chat?.messages?.map((message: RawMessage): ChatMessage => {
    return {
      chatId: chat._id,
      messageId: message._id,
      sender: {
        _id: message.senderId._id,
        profileImage: message?.by_ai
          ? process.env.NEXT_PUBLIC_AI_AVATAR || null
          : message.senderId.profileImage,
      },
      by_ai: message.by_ai,
      message: message.message,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  });
  return {
    chatId: chat?._id,
    messages: messages,
  };
}
