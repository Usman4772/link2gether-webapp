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
import Comment from "@/models/comments";

export async function getAllPosts(userId: any) {
  const allPosts = await Post.find({})
    .populate({ path: "community", model: Community })
    .populate({ path: "author", model: User })
    .sort({ created_at: -1 })
    .exec();
  const payload = createPayload(allPosts, userId);
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
  const payload = createPostPayload(post, userId);
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
