import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/backend/modules/auth/services/authServices";
import {errorHandler, validateToken} from "@/utils/backend/helpers/globals";
import {SUCCESS_RESPONSE} from "@/utils/backend/helpers/responseHelpers";
import {getUserNotifications} from "@/utils/backend/modules/auth/services/user.services.";



export  async function GET(req:NextRequest) {
    try {
        await connectToDatabase()
        const {userId} = await validateToken(req)
        const notifications = await getUserNotifications(userId)
        return SUCCESS_RESPONSE(notifications, 200, "Notifications fetched successfully")

    } catch (error) {
        return errorHandler(error)
    }
}






