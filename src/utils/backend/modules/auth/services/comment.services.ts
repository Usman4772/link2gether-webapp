import Comment from "@/models/comments";
import Post from "@/models/posts";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { CommandEmpty } from "cmdk";
import { createCommentPayload } from "@/utils/backend/helpers/comment.helpers";
import Community from "@/models/community";
import User from "@/models/user";
import { getCommunityPostsPayload } from "@/utils/backend/helpers/community.helper";

export async function handlePostComment(
  postId: string,
  userId: any,
  content: string | number
) {
  const post = await Post.findById(postId);
  if (!post) {
    throw new apiErrors([], "Post not found", 404);
  }
  const comment = await Comment.create({
    content,
    author: userId,
    post: postId,
  });
  post.comments.push(comment._id);
  await post.save();
  return comment;
}

export async function getPostComments(postId: string, userId: any) {
  if (!postId || !Types.ObjectId.isValid(postId)) {
    throw new apiErrors([], "Invalid post id", 400);
  }
  const post = await Post.findById(postId)
    .populate({
      path: "comments",
      model: Comment,
      options: { sort: { created_at: -1 } },
      select: "-post -__v",
      populate: { path: "author", select: "id username profileImage " },
    })
    .select("comments")
    .exec();
  if (!post) {
    throw new apiErrors([], "Post not found", 404);
  }

  const payload = createCommentPayload(post.comments, userId);
  return payload;
}

export async function handleLikeComment(commentId: string, userId: any) {
  if (!commentId || !Types.ObjectId.isValid(commentId)) {
    throw new apiErrors([], "Invalid comment id", 400);
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiErrors([], "Comment not found", 404);
  }
  if (comment.likes.includes(userId)) {
    comment.likes = comment.likes.filter(
      (id: ObjectId) => id.toString() !== userId.toString()
    );
    await comment.save();
    return {
      likes: comment.likes.length,
      isLiked: false,
    };
  }
  comment.likes.push(userId);
  await comment.save();
  return {
    likes: comment.likes.length,
    isLiked: true,
  };
}

export async function getCommunityPosts(communityId: any, userId: any) {
  const community = await Community.findById(communityId).populate({
    path: "posts",
    model: Post,
    options: { sort: { created_at: -1 } },
    select: "-community -__v",
    populate: {
      path: "author",
      select: "_id username profileImage",
      model: User,
    },
  });
  return getCommunityPostsPayload(community.posts, userId);
}
