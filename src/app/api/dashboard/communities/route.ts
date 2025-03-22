import { allCommunitiesPayload, getAllUserCommunities } from "@/utils/backend/helpers/dashboard.helpers";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {

        await connectToDatabase()
        const { userId } = await validateToken(req)
        const communities = await getAllUserCommunities(userId)
        const payload = allCommunitiesPayload(communities)
        return SUCCESS_RESPONSE(payload, 200, "Communities fetched successfully")
        
    } catch (error) {
        return  errorHandler(error)
        
    }
}


