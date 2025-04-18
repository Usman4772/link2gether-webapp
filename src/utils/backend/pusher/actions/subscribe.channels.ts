import { pusherClient } from "@/lib/pusher";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

export function subscribeChannels(channelIds: string[]) {
  try {
    channelIds.forEach((channelId) => {
      pusherClient.subscribe(channelId);
      pusherClient.bind("incoming-message", (message: any) => {
        console.log("Received message:", message);
      });
    });
  } catch (error) {
    return handleAPIErrors(error, "Error subscribing to channels");
  }
}
