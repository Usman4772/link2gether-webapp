import { pusherClient } from "@/lib/pusher";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

export function subscribeChannels(chatIds: string[]) {
  try {
    chatIds.forEach((chatId) => {
      pusherClient.subscribe(chatId);
      pusherClient.bind("incoming-message", (message: any) => {
        console.log("Received message:", message);
      });
    });
  } catch (error) {
    return handleAPIErrors(error, "Error subscribing to channels");
  }
}
