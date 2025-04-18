import User from "@/models/user";
import apiErrors from "./apiErrors";

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

export function getSenderReceiverIds(channelId: string) {
  if (!channelId) throw new apiErrors([], "Chat ID is required", 400);
  const [senderId, receiverId] = channelId.split("_");
  return { senderId, receiverId };
}
