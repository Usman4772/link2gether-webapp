import Community from "@/models/community";
import ReportedPosts from "@/models/reported.posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import {Types} from "mongoose";
import {NextRequest} from "next/server";
import {ObjectId} from "mongodb";
import Post from "@/models/posts";
import {getCommunityMembersPayload, getReportedPostsPayload,} from "@/utils/backend/helpers/admin.community.helpers";
import BannedUser from "@/models/bannedUsers";

export async function getReportedPosts(communityId: any) {
  const community = await Community.findById(communityId)
    .populate({
      path: "reportedPosts",
      model: ReportedPosts,
      select: "-__v",
      populate: [
        {
          path: "reported_by",
          model: User,
          select: "_id username",
        },
        {
          path: "post_id",
          model: Post,
          populate: { path: "author", model: User, select: "_id username" },
          select: "_id author",
        },
      ],
    })
    .select("-_id reportedPosts");
  const payload = getReportedPostsPayload(community.reportedPosts);
  return payload;
}

export async function getJoinRequests(communityId: any) {
  const community = await Community.findById(communityId)
    .populate({
      path: "joinRequests",
      model: User,
      select: "_id username email profileImage created_at",
    })
    .select("-_id joinRequests");
  return (community.joinRequests = community.joinRequests.map((req: any) => {
    return {
      id: req._id,
      username: req.username,
      email: req.email,
      profileImage: req?.profileImage,
      created_at: req.created_at,
    };
  }));
}

export async function rejectJoinRequest(community: any, req: NextRequest) {
  const { userId } = await req.json();
  if (!userId || !Types.ObjectId.isValid(userId)) {
    throw new apiErrors([], "Invalid user id", 400);
  }

  if (!community.joinRequests.includes(userId)) {
    throw new apiErrors([], "User has not requested join request", 400);
  }

  community.joinRequests = community.joinRequests.filter(
    (req: any) => req.toString() !== userId.toString()
  );

  await community.save();
}

export async function approveJoinRequest(community: any, req: NextRequest) {
  const { userId } = await req.json();
  if (!userId || !Types.ObjectId.isValid(userId)) {
    throw new apiErrors([], "Invalid user id", 400);
  }

  if (!community.joinRequests.includes(userId)) {
    throw new apiErrors([], "User has not requested join request", 400);
  }

  community.joinRequests = community.joinRequests.filter(
    (req: any) => req.toString() !== userId.toString()
  );
  community.members.push(userId);
  await community.save();
}

export async function discardReportedPost(community: any, postId: string) {


  if (!postId || !Types.ObjectId.isValid(postId)) {
    throw new apiErrors([], "Invalid post id", 400);
  }

  const post = await ReportedPosts.findOneAndDelete({
    post_id: postId,
    community_id: community?._id.toString(),
  });

  if (post) {
    community.reportedPosts = community.reportedPosts.filter(
      (id: ObjectId) => id.toString() !== post._id.toString()
    );
  }
}

export async function getCommunityMembers(communityId: string) {
  const members = await Community.findById(communityId)
    .populate({
      path: "members",
      model: User,
      select: "_id username profileImage email created_at",
    }).populate({
        path:"bannedUsers",
        model:BannedUser,
        select:"user"
      })
    .select("moderators members createdBy bannedUsers");
  return await getCommunityMembersPayload(members);
}
