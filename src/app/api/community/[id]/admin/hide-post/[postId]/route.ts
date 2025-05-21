import apiErrors from "@/utils/backend/helpers/apiErrors";
import {
    checkCommunityExistence,
    checkModerator,
} from "@/utils/backend/helpers/community.helper";
import {errorHandler, validateToken} from "@/utils/backend/helpers/globals";
import {SUCCESS_RESPONSE} from "@/utils/backend/helpers/responseHelpers";
import {discardReportedPost} from "@/utils/backend/modules/auth/services/admin.community.services";
import {connectToDatabase} from "@/utils/backend/modules/auth/services/authServices";
import {Types} from "mongoose";
import {NextRequest} from "next/server";
import Post from "@/models/posts";
import {createNotification} from "@/utils/backend/modules/auth/services/community.services";
import {sendPusherNotification} from "@/utils/backend/pusher/actions/send.notification";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const {userId} = await validateToken(req);
        const communityId = req.nextUrl.pathname.split("/")[3];
        const postId = req.nextUrl.pathname.split("/")[6];
        const community = await checkCommunityExistence(communityId);
        checkModerator(community, userId);
        await hidePost(postId, community);
        return SUCCESS_RESPONSE([], 200, "Post has been hidden successfully");
    } catch (error) {
        return errorHandler(error);
    }
}

async function hidePost(postId: string, community: any) {
    if (!Types.ObjectId.isValid(postId)) {
        throw new apiErrors([], "Invalid post id", 400);
    }
    if (!community.posts.toString().includes(postId.toString())) {
        throw new apiErrors([], "Post not found", 400);
    }
    community.posts = community.posts.filter((post: any) => {
        return post._id.toString() !== postId.toString();
    });
    await discardReportedPost(community, postId);
    await community.save();
    await sendPostHiddenNotification(postId, community);

}

async function sendPostHiddenNotification(postId: string, community: any) {
    const post = await Post.findById(postId.toString())
    const notificationData = {
        title: "Your post has been hidden",
        body: `Your post ${post?.description} in ${community?.community_name} has been hidden by the admin `,
        avatar: community?.avatar,
        userId: post?.author
    }

    const notification = await createNotification(notificationData)
    await sendPusherNotification(post?.author, notification)
}