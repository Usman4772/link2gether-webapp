import Post from "@/models/posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { Types } from "mongoose";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
      const postId = req.nextUrl.pathname.split("/")[3];
     const successMessage= await savePostService(postId, userId);
      return SUCCESS_RESPONSE([], 200, successMessage);
  } catch (error) {
    return errorHandler(error);
  }
}

async function savePostService(postId: any, userId: any) {
  let successMessage="Post Saved Successfully"
  if (!postId || !Types.ObjectId.isValid(postId))
    throw new apiErrors([], "Invalid post id", 400);

  const post = await Post.findById(postId);
  if (!post) throw new apiErrors([], "Post not found", 404);

  const user = await User.findById(userId);

  if (user.savedPosts.includes(postId)) {
    user.savedPosts = user.savedPosts.filter(
      (post: ObjectId) => post.toString() !== postId.toString()
    );
    successMessage="Post Removed from saved"
  } else {
    user.savedPosts.push(postId);
  }

  await user.save();
  return successMessage;
}
