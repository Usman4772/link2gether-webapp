import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/backend/modules/auth/services/authServices";
import {errorHandler, validateToken} from "@/utils/backend/helpers/globals";
import {validateNotificationId} from "@/utils/backend/helpers/user.helpers";
import {deleteNotification} from "@/utils/backend/modules/auth/services/user.services.";
import {SUCCESS_RESPONSE} from "@/utils/backend/helpers/responseHelpers";

export async function DELETE(req:NextRequest){
    try {
        await connectToDatabase()
        const {userId} = await validateToken(req)
        const notificationId=validateNotificationId(req)
      const notifications=  await deleteNotification(userId,notificationId)
        return SUCCESS_RESPONSE(notifications, 200, "Notification(s) deleted successfully!")
    }catch (error) {
        return errorHandler(error)
    }
}
