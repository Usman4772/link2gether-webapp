"use server";
import { pusherServer } from "@/lib/pusher";
import apiErrors from "../../helpers/apiErrors";
import { ChatMessage } from "../../modules/auth/types/chat.types";



export async function sendPusherMessage(message: ChatMessage, channelId: string) {
  try {
    pusherServer.trigger(channelId, "incoming-message", {
      message,
    });
  } catch (error: any) {
    throw new apiErrors(error, "Error while sending message", 500);
  }
}
