import Community from "@/models/community";
import Post from "@/models/posts";
import User from "@/models/user";
import { createPayload } from "@/utils/backend/helpers/post.helpers";

export async function getAllPosts(userId: any) {
  const allPosts = await Post.find({})
    .populate({ path: "community", model: Community })
    .populate({ path: "author", model: User })
    .sort({ created_at: -1 })
    .exec();
  const payload = createPayload(allPosts, userId);
  return payload;
}
