import { Types } from "mongoose";
import apiErrors from "./apiErrors";
import { NextRequest } from "next/server";

export async function validateCommentData(postId: string, req: NextRequest) {
  if (!postId) {
    throw new apiErrors([], "Invalid post id", 400);
  }
  const { content } = await req.json();
  if (!content) {
    throw new apiErrors([], "Comment content is required", 400);
  }
  return content;
}

export function createCommentPayload(comments: any, userId?: any) {
  return comments?.map((comment: any) => {
    return {
      id: comment._id,
      content: comment.content,
      allow_actions: userId ? true : false,
      author: {
        id: comment.author._id,
        username: comment.author.username,
        profileImage: comment.author.profileImage,
      },
      created_at: comment.created_at,
      likes: userId ? comment.likes.length : false,
      isLiked: userId ? comment.likes.includes(userId) : false,
    };
  });
}
