import Community from "@/models/community";
import Post from "@/models/posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import {
  createPayload,
  createPostPayload, reportReasons,
} from "@/utils/backend/helpers/post.helpers";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import ReportedPosts from "@/models/reported.posts";
import { ReportPostProps } from "../types/community.types";
import { NextRequest } from "next/server";
import {sendPusherNotification} from "@/utils/backend/pusher/actions/send.notification";
import {createNotification} from "@/utils/backend/modules/auth/services/community.services";

export async function getAllPosts(userId: any, req: NextRequest) {
  const userCommunities = await Community.find({ members: userId }).select(
    "_id"
  );

  const communityIds = userCommunities.map((c) => c._id);
  const allPosts = await Post.find({ community: { $in: communityIds } })
    .populate({ path: "community", model: Community })
    .populate({ path: "author", model: User })
    .sort({ created_at: -1 })
    .exec();

  const payload = await createPayload(allPosts, userId, req);
  return payload;
}

export async function getPostDetails(
  req: NextRequest,
  id: string | number,
  userId: any = null
) {
  if (!id) {
    throw new apiErrors([], "Post not found", 404);
  }

  const queryCondition = Types.ObjectId.isValid(id)
    ? { _id: id }
    : { publicId: id };
  const post = await Post.findOne(queryCondition)
    .populate({
      path: "community",
      model: Community,
      select: "id community_name avatar",
    })
    .populate({
      path: "author",
      model: User,
      select: "id username profileImage",
    })
    .sort({ created_at: -1 })
    .exec();
  if (!post) {
    throw new apiErrors([], "Post not found", 404);
  }
  const shareableLink = generateShareableLink(req, post);
  const payload = await createPostPayload(post, shareableLink, userId);
  return payload;
}

export async function likePost(postId: string, userId: any) {
  if (!postId || !Types.ObjectId.isValid(postId))
    throw new apiErrors([], "Invalid post id", 400);
  const post = await Post.findById(postId);
  if (!post) throw new apiErrors([], "Post not found", 404);
  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter(
      (id: ObjectId) => id.toString() !== userId.toString()
    );
    await post.save();
    return {
      likes: post.likes.length,
      isLiked: false,
    };
  }
  post.likes.push(userId);
  await post.save();
  return {
    likes: post.likes.length,
    isLiked: true,
  };
}

export async function reportPost({ data, postId, userId }: ReportPostProps) {
  //if post is already reported then just increase it's count.
  const reported_post = await ReportedPosts.findOne({
    post_id: postId,
    community_id: data.community_id,
  });

  if (reported_post && reported_post.reported_by.includes(userId)) {
    throw new apiErrors([], "You have already reported this post", 400);
  }

  if (reported_post) {
    reported_post.report_count += 1;
    reported_post.reported_by.push(userId);
    await reported_post.save();
    await sendReportedPostNotification(postId,userId,data?.reason)
    return reported_post;
  }

  const report = await ReportedPosts.create({
    post_id: postId,
    reported_by: userId,
    community_id: data.community_id,
    reason: data.reason,
    report_count: 1,
  });

  const community = await Community.findById(data.community_id);
  community.reportedPosts.push(report._id);
  await sendReportedPostNotification(postId,userId,data?.reason)
  await community.save();

  return report;
}



async  function sendReportedPostNotification(postId:string,userId:string,reason:string){
const post=await Post.findById(postId).populate({
  path:"community",
  select:"community_name avatar"
})
const user=await User.findById(userId).select("username")


const notificationData={
  title:`Your post "${post?.description}" in ${post?.community?.community_name} has been reported by ${user?.username}`,
  body:reportReasons[reason] || "Your post has been reported",
  avatar:post?.community?.avatar,
  userId:post?.author
}
console.log(notificationData,'data')
const notification=await createNotification(notificationData)
await sendPusherNotification(post?.author,notification)

}

export function generateShareableLink(req: NextRequest, post: any) {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const publicId = post.publicId;
  const URL = `${baseUrl}/public/post/${publicId}`;
  return URL;
}
