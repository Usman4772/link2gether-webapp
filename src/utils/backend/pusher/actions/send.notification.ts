import {pusherServer} from "@/lib/pusher";
import apiErrors from "@/utils/backend/helpers/apiErrors";

export async function sendPusherNotification(channelId:string,data:any) {
    try {
       await  pusherServer.trigger(channelId.toString(), "incoming-notification", {
            data
        })
    }catch (error:any) {
        throw new apiErrors(error, "Error while sending notification", 500);
    }
}