import Chats from "@/models/chat.schema";
import Message from "@/models/messsage.schema";
import User from "@/models/user";
import {
  errorHandler,
  validateToken
} from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import {
  ChatMessage,
  RawMessage
} from "@/utils/backend/modules/auth/types/chat.types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
   const {userId}= await validateToken(req);
    const receiverId = req.nextUrl.pathname.split("/").at(-1) as string;
    const chat = await fetchChatMessages(userId,receiverId);
    return SUCCESS_RESPONSE(chat, 200, "Chat messages fetched successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

async function fetchChatMessages(userId: string,receiverId:string) {
  const chat = await Chats.findOne({ participants: { $all: [userId,receiverId] } })
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
    .select("-_id messages");
  if (!chat) {
    return [];
  }
  return chat?.messages?.map((message: RawMessage): ChatMessage => {
    return {
      messageId: message._id,
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
