import Community from "@/models/community";
import Post from "@/models/posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import {
  createPayload,
  createPostPayload,
} from "@/utils/backend/helpers/post.helpers";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import ReportedPosts from "@/models/reported.posts";
import { ReportPostProps } from "../types/community.types";

export async function getAllPosts(userId: any) {
  const userCommunities = await Community.find({ members: userId }).select(
    "_id"
  );

  const communityIds = userCommunities.map((c) => c._id);
  const allPosts = await Post.find({ community: { $in: communityIds } })
    .populate({ path: "community", model: Community })
    .populate({ path: "author", model: User })
    .sort({ created_at: -1 })
    .exec();

  const payload = await createPayload(allPosts, userId);
  return payload;
}

export async function getPostDetails(id: string | number, userId: any) {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new apiErrors([], "Post not found", 404);
  }
  const post = await Post.findById(id)
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
  const payload = await createPostPayload(post, userId);
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
  await community.save();

  return report;
}

//might be usefull in future
// export async function getReportedPosts(req, res) {
//   try {
//     const { communityId } = req.params;

//     const reports = await ReportedPosts.aggregate([
//       { $match: { communityId, status: "pending" } },
//       {
//         $group: {
//           _id: "$postId",
//           reportCount: { $sum: 1 },
//           latestReason: { $last: "$reason" }, // Shows the latest report reason
//           reportedByUsers: { $push: "$reportedBy" }, // List of users who reported
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "_id",
//           foreignField: "_id",
//           as: "postDetails",
//         },
//       },
//       { $unwind: "$postDetails" },
//     ]);

//     res.json(reports);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch reported posts" });
//   }
// }
