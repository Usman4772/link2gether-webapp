import Community from "@/models/community";
import ReportedPosts from "@/models/reported.posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { Types } from "mongoose";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function getReportedPosts(communityId: any) {
  const community = await Community.findById(communityId)
    .populate({
      path: "reportedPosts",
      model: ReportedPosts,
      select: "-__v",
    })
    .select("-_id reportedPosts");
  return community.reportedPosts;
}

export async function getJoinRequests(communityId: any) {
  const community = await Community.findById(communityId)
    .populate({
      path: "joinRequests",
      model: User,
      select: "_id username email",
    })
    .select("-_id joinRequests");
  return (community.joinRequests = community.joinRequests.map((req: any) => {
    return {
      id: req._id,
      username: req.username,
      email: req.email,
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



export async function discardReportedPost(communityId: string, postId: string) {
  console.log('idr to aya ha ')
  const community = await Community.findById(communityId);
  if (!postId || !Types.ObjectId.isValid(postId)) {
    throw new apiErrors([], "Invalid post id", 400);
  }

  const post = await ReportedPosts.findOneAndDelete({
    post_id: postId,
    community_id: communityId,
  });
  if (post) {
 
    community.reportedPosts = community.reportedPosts.filter(
      (id: ObjectId) => id.toString() !== post._id.toString()
    );

    await community.save();
  }
}