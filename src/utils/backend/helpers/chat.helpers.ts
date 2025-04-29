import User from "@/models/user";
import apiErrors from "./apiErrors";
import { MessageSender } from "../modules/auth/types/chat.types";

export async function validateSendMessageRequest(
  receiverId: string,
  message: string
) {
  if (!receiverId || receiverId.trim() == "")
    throw new apiErrors([], "Receiver ID is required", 400);
  if (!message || message.trim() == "")
    throw new apiErrors([], "Message is required", 400);

  const receiver = await User.findById(receiverId);
  if (!receiver) throw new apiErrors([], "Receiver not found", 404);
}

export function createdMessageResponse(
  rawResponse: any,
  sender: MessageSender | "ai"
) {
  return {
    messageId: rawResponse._id,
    chatId: rawResponse.chatId,
    sender: {
      _id: sender == "ai" ? rawResponse?.senderId : sender?._id,
      profileImage:
        sender == "ai"
          ? process.env.NEXT_PUBLIC_AI_AVATAR || null
          : sender?.profileImage,
    },
    by_ai: rawResponse.by_ai,
    message: rawResponse.message,
    createdAt: rawResponse.createdAt,
    updatedAt: rawResponse.updatedAt,
  };
}
