import { NextRequest } from "next/server";
import { postSchema, reportPostSchema } from "../validation-schema/post.schema";
import apiErrors from "./apiErrors";
import User from "@/models/user";
import Community from "@/models/community";
import Post from "@/models/posts";
import { Types } from "mongoose";

export async function validatePostSchema(req: NextRequest) {
  const formData = await req.formData();

  let media: any = formData?.get("media");
  if (media?.name == "" || media?.size == 0 || media == "" || !media) {
    media = null;
  }

  const data = {
    description: formData.get("description") as string,
    media: media as Blob | null,
  };

  const result = postSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((err) => {
      return {
        [err?.path.toString()]: err?.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found", 400);
    }
    
    return data
}


export async function createPayload(posts: any[], userId: any) {
  const filteredPosts = posts.filter((post) =>
    post.community.members.includes(userId)
  );


  const user=await User.findById(userId)
  return filteredPosts.map((post) => {
    return {
      id: post._id,
      description: post.description,
      media: post.media,
      type: post.type,
      likes: post.likes.length,
      comments: post.comments.length,
      isLiked: post.likes.includes(userId.toString()),
      isSaved: user.savedPosts.includes(post._id),
      created_at: post.created_at,
      community: {
        id: post.community._id,
        community_name: post.community.community_name,
        avatar: post.community.avatar,
      },
      author: {
        id: post.author._id,
        username: post.author.username,
        profileImage: post.author.profileImage,
      },
    };
  });
}


export async function createPostPayload(post: any, userId: any) {
  const user=await User.findById(userId)
  return {
    id: post._id,
    description: post.description,
    media: post.media,
    type: post.type,
    likes: post.likes.length,
    comments: post.comments.length,
    isLiked: post.likes.includes(userId.toString()),
    isSaved: user.savedPosts.includes(post._id),
    created_at: post.created_at,
    community: {
      id: post.community._id,
      community_name: post.community.community_name,
      avatar: post.community.avatar,
    },
    author: {
      id: post.author._id,
      username: post.author.username,
      profileImage: post.author.profileImage,
    },
  };
}



export async function validateReportPostPayload(req: NextRequest) {
  const data = await req.json();
  const result = reportPostSchema.safeParse(data);


  if (!result.success) {
    throw new apiErrors(
      result.error.errors.map((err) => ({
        [err?.path.toString()]: err?.message,
      })),
      "Validation errors found",
      400
    );
  }

  return data;
}

export async function validateCommunityAndPost(
  communityId: string,
  postId: string
) {
  if (!Types.ObjectId.isValid(communityId)) {
    throw new apiErrors(
      [{ community_id: "Invalid community ID" }],
      "Validation errors found",
      400
    );
  }
  if (!Types.ObjectId.isValid(postId)) {
    throw new apiErrors(
      [{ post_id: "Invalid post ID" }],
      "Validation errors found",
      400
    );
  }

  // Fetch both community and post in parallel
  const [community, post] = await Promise.all([
    Community.findById(communityId),
    Post.findById(postId),
  ]);

  if (!community) {
    throw new apiErrors(
      [{ community_id: "Community not found" }],
      "Validation errors found",
      400
    );
  }

  if (!post) {
    throw new apiErrors(
      [{ post_id: "Post not found" }],
      "Validation errors found",
      400
    );
  }

  // 🔹 Ensure the post belongs to the given community
  if (post.community.toString() !== communityId) {
    throw new apiErrors(
      [{ post_id: "This post does not belong to the specified community" }],
      "Validation errors found",
      400
    );
  }
}