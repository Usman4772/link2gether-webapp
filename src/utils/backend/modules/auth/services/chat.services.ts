import Chats from "@/models/chat.schema";
import Message from "@/models/messsage.schema";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { sendPusherMessage } from "@/utils/backend/pusher/actions/send.message";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import { createMessageArgs } from "../types/chat.types";
import { createdMessageResponse } from "@/utils/backend/helpers/chat.helpers";
import {
  ChatMessage,
  RawMessage,
} from "@/utils/backend/modules/auth/types/chat.types";

export async function sendMessageService(
  senderId: string,
  receiverId: string,
  message: string
) {
  const chat = await Chats.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!chat) {
    const newChat = await createChat(senderId, receiverId);
    const messageResponse = await createMessageService(
      senderId,
      receiverId,
      message,
      newChat
    );
    newChat.messages.push(messageResponse.messageId);
    await newChat.save();
    await sendPusherMessage(messageResponse, newChat?._id);
    return messageResponse;
  }

  const messageResponse = await createMessageService(
    senderId,
    receiverId,
    message,
    chat
  );
  chat.messages.push(messageResponse.messageId);
  await chat.save();
  await sendPusherMessage(messageResponse, chat?._id);
  return messageResponse;
}

export async function createChat(senderId: string, receiverId: string) {
  const receiver = User.findById(receiverId);
  if (!receiver) throw new apiErrors([], "Receiver not found", 404);
  const senderObjectId = new mongoose.Types.ObjectId(senderId);
  const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
  const newChat = await Chats.create({
    participants: [senderObjectId, receiverObjectId],
  });
  return newChat;
}

async function createMessageService(
  senderId: string,
  receiverId: string,
  message: string,
  chat: any
) {
  if (message.includes("@ai")) {
    const userMessage = await createMessage({
      senderId,
      receiverId,
      message: message,
      chatId: chat?._id,
    });
    await chat.messages.push(userMessage._id);
    await chat.save();
    const sender = await User.findById(senderId).select("_id profileImage");
    const userMessageRes = createdMessageResponse(userMessage, sender);
    await sendPusherMessage(userMessageRes, chat?._id);
    message = message.replace("@ai", "").trim();
    const aiResponse = await getAIResponse(message);
    const messageResponse = await createMessage({
      senderId: senderId,
      receiverId: receiverId,
      message: aiResponse,
      by_ai: true,
      chatId: chat?._id,
    });

    const response = createdMessageResponse(messageResponse, "ai");
    return response;
  }

  const messageResponse = await createMessage({
    senderId,
    receiverId,
    message,
    chatId: chat?._id,
  });
  const sender = await User.findById(senderId).select("_id profileImage");
  const response = createdMessageResponse(messageResponse, sender);
  return response;
}

async function createMessage({
  senderId,
  receiverId,
  message,
  by_ai = false,
  chatId,
}: createMessageArgs) {
  const response = await Message.create({
    senderId,
    receiverId,
    message: message,
    by_ai,
    chatId,
  });
  return response;
}

async function getAIResponse(message: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_AI_MODEL!,
    contents: message,
  });
  const res = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return res;
}



export async function fetchChatMessages(userId: string, receiverId: string) {
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


export async function deleteChat(chatId: string): Promise<void> {
  if(!chatId)throw new apiErrors([],"Chat id is required",400)
  const chat = await Chats.findOneAndDelete({_id: chatId});
  if(!chat)throw new apiErrors([],"Chat could not be found",404)
}