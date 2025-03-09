import apiErrors from "@/utils/backend/helpers/apiErrors";
import {
  checkCommunityExistence,
  checkModerator,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const postId = req.nextUrl.pathname.split("/")[6];
    const community = await checkCommunityExistence(communityId);
    checkModerator(community, userId);
    await banPost(postId, community);
    return SUCCESS_RESPONSE([], 200, "Post has been hidden successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

async function banPost(postId: string, community: any) {
  if (!Types.ObjectId.isValid(postId)) {
    throw new apiErrors([], "Invalid post id", 400);
  }
  if (!community.posts.toString().includes(postId.toString())) {
    throw new apiErrors([], "Post not found", 400);
  }
  community.posts = community.posts.filter((post: any) => {
    return post._id.toString() !== postId.toString();
  });
  //todo send notification to user.
  // const io = getIO();
  // io.emit("send-notification", {
  //   message: `Your post has been hidden in ${community.community_name}`,
  // });
  await community.save();
}
