import Chats from "@/models/chat.schema";
import Message from "@/models/messsage.schema";
import User from "@/models/user";
import { sendPusherMessage } from "@/utils/backend/pusher/actions/send.message";
import mongoose from "mongoose";

export async function sendMessageService(
  senderId: string,
  receiverId: string,
  message: string
) {
  const chat = await Chats.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!chat) {
    const newChat = await createChat(senderId,receiverId);
    const messageResponse = await createMessage(
      senderId,
      message,
      newChat._id,
    );
    newChat.messages.push(messageResponse.messageId);
    await newChat.save();
    await sendPusherMessage(messageResponse, newChat?._id);
    return messageResponse;
  }

  const messageResponse = await createMessage(
    senderId,
    message,
    chat._id,
  );
  chat.messages.push(messageResponse.messageId);
  await chat.save();
  await sendPusherMessage(messageResponse, chat?._id);
  return messageResponse;
}

async function createChat(senderId: string,receiverId:string) {
  const senderObjectId = new mongoose.Types.ObjectId(senderId);
  const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
  const newChat = await Chats.create({
    participants: [senderObjectId, receiverObjectId],
  });
  return newChat;
}

async function createMessage(
  senderId: string,
  message: string,
  chatId: string,
) {
  const messageResponse = await Message.create({
    senderId,
    message,
    chatId,
  });
  const sender = await User.findById(senderId).select("_id profileImage");

  return {
    messageId: messageResponse._id,
    chatId: messageResponse.chatId,
    sender: {
      _id: sender._id,
      type: senderId === messageResponse.senderId ? "user" : "receiver",
      profileImage: sender.profileImage,
    },
    message: messageResponse.message,
    createdAt: messageResponse.createdAt,
    updatedAt: messageResponse.updatedAt,
  };
}
