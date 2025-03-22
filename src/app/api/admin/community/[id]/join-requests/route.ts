import Community from "@/models/community";
import ReportedPosts from "@/models/reported.posts";
import User from "@/models/user";
import { checkAdmin, checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { getJoinRequests, getReportedPosts } from "@/utils/backend/modules/auth/services/admin.community.services";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const { userId } = await validateToken(req);
        const communityId = req.nextUrl.pathname.split("/")[4];
        const community = await checkCommunityExistence(communityId);
        checkAdmin(userId, community);
        const joinRequests = await getJoinRequests(communityId);
        return SUCCESS_RESPONSE(joinRequests, 200, "Join requests fetched successfully");
    } catch (error) {
        return errorHandler(error);
    }
}
