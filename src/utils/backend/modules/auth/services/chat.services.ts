import Chats from "@/models/chat.schema";
import Message from "@/models/messsage.schema";
import User from "@/models/user";
import { getSenderReceiverIds } from "@/utils/backend/helpers/chat.helpers";
import { generateChannelId } from "@/utils/backend/helpers/globals";
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
  console.log(chat, "chat");
  if (!chat) {
    const channelId = generateChannelId(senderId, receiverId);
    const newChat = await createChat(channelId);
    const messageResponse = await createMessage(
      senderId,
      message,
      newChat._id,
      channelId
    );
    newChat.messages.push(messageResponse._id);
    await newChat.save();
    await sendPusherMessage(messageResponse, channelId);
    return messageResponse;
  }

  const messageResponse = await createMessage(
    senderId,
    message,
    chat._id,
    chat?.channelId
  );
  chat.messages.push(messageResponse._id);
  await chat.save();
  await sendPusherMessage(messageResponse, chat?.channelId);
  return messageResponse;
}

async function createChat(channelId: string) {
  const { senderId, receiverId } = getSenderReceiverIds(channelId);
  const senderObjectId = new mongoose.Types.ObjectId(senderId);
  const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
  const newChat = await Chats.create({
    channelId,
    participants: [senderObjectId, receiverObjectId],
  });
  return newChat;
}

async function createMessage(
  senderId: string,
  message: string,
  chatId: string,
  channelId: string
) {
  const messageResponse = await Message.create({
    channelId,
    senderId,
    message,
    chatId,
  });
  const sender = await User.findById(senderId).select("_id profileImage");

  return {
    _id: messageResponse._id,
    channelId: messageResponse.channelId,
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
