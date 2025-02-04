import Community from "@/models/community";
import Post from "@/models/posts";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { checkCommunityExistence } from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { validatePostSchema } from "@/utils/backend/helpers/post.helpers";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
  connectToDatabase,
  handleMediaUpload,
} from "@/utils/backend/modules/auth/services/authServices";
import { postSchema } from "@/utils/backend/validation-schema/post.schema";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

interface CreatePostProps {
  description: string;
  media: Blob | null;
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { user ,userId } = await validateToken(req);
    
    const communityId = req.nextUrl.pathname.split("/")[5];
    const community = await checkCommunityExistence(communityId);
    if(!community.members.includes(userId)) throw new apiErrors([], "You can't create post in this community", 403);
    const data = await validatePostSchema(req);
    const post = await createPost(data, user, community);

    return SUCCESS_RESPONSE(post, 200, "Post created successfully!");
  } catch (error) {
    return errorHandler(error);
  }
}

async function createPost(data: CreatePostProps, user: any, community: any) {
  let type = "text";
  if (data.media) type = data.media.type.split("/")[0];
  const media = await handleMediaUpload(data.media);

  const post = await Post.create({
    description: data.description,
    type: type,
    author: user._id,
    community: community._id,
    media,
  });
  if (!post) throw new apiErrors([], "Error creating post", 500);

  user.posts.push(post._id);
  community.posts.push(post._id);
  await user.save();
  await community.save();

  return post;
}
