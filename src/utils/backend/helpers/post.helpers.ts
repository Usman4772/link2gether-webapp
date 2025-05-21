import { NextRequest } from "next/server";
import { postSchema, reportPostSchema } from "../validation-schema/post.schema";
import apiErrors from "./apiErrors";
import User from "@/models/user";
import Community from "@/models/community";
import Post from "@/models/posts";
import { Types } from "mongoose";
import { generateShareableLink } from "../modules/auth/services/post.services";

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

  return data;
}

export async function createPayload(
  posts: any[],
  userId: any,
  req: NextRequest
) {
  const filteredPosts = posts.filter((post) =>
    post.community.members.includes(userId)
  );

  const user = await User.findById(userId);
  return filteredPosts.map((post) => {
    return {
      id: post._id,
      description: post.description,
      media: post.media,
      type: post.type,
      likes: post.likes.length,
      url: generateShareableLink(req, post),
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

export async function createPostPayload(
  post: any,
  shareableLink: string,
  userId?: any
) {
  let user = null;
  if (userId) {
    user = await User.findById(userId);
  }
  return {
    id: post._id,
    description: post.description,
    media: post.media,
    type: post.type,
    likes: post.likes.length,
    comments: post.comments.length,
    url: shareableLink,
    allow_actions: userId ? true : false,
    isLiked: userId ? post.likes.includes(userId.toString()) : false,
    isSaved: userId ? user.savedPosts.includes(post._id) : false,
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

  // Ensure the post belongs to the given community
  if (!community.posts.toString().includes(postId)) {
    throw new apiErrors(
      [{ post_id: "This post does not belong to the specified community" }],
      "Validation errors found",
      400
    );
  }
}


export  const reportReasons: Record<string, string> = {
    "Harassment": "Your post has been reported for harassment. Please ensure all interactions remain respectful and follow our community guidelines.",
    "Threatening violence": "Your post has been reported for containing threats of violence. This is a serious violation of our safety policies.",
    "Hate": "Your post has been reported for promoting hate or discrimination. Such content is strictly against our community standards.",
    "Minor abuse": "Your post has been reported for potential abuse involving minors. We do not tolerate any form of harm or exploitation of minors.",
    "Sharing personal information": "Your post has been reported for sharing personal or sensitive information. Please respect others' privacy.",
    "Non-consensual intimate media": "Your post has been reported for sharing intimate media without consent. This is a serious violation of our policies.",
    "Prohibited transaction": "Your post has been reported for involving a prohibited transaction. Please ensure all posts comply with our transaction policies.",
    "Impersonation": "Your post has been reported for impersonating another individual or entity. Misrepresentation is not allowed.",
    "Copyright violation": "Your post has been reported for potentially violating copyright. Please only share content you have the rights to use.",
    "Trademark violation": "Your post has been reported for potentially violating trademark rules. Please ensure your content respects brand rights.",
    "Self-harm or suicide": "Your post has been reported for referencing self-harm or suicide. If you're in distress, please seek professional help or contact support.",
    "Spam": "Your post has been reported as spam. Avoid repetitive, irrelevant, or promotional content that doesn't contribute to the community.",
    "Contributor Program violation": "Your post has been reported for violating our Contributor Program guidelines. Please review the program rules to stay compliant.",
  };

