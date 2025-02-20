import { NextRequest } from "next/server";
import { postSchema } from "../validation-schema/post.schema";
import apiErrors from "./apiErrors";
import { comment } from "postcss";

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


export function createPayload(posts: any[], userId: any) {
  const filteredPosts = posts.filter((post) =>
    post.community.members.includes(userId)
  );
  return filteredPosts.map((post) => {
    return {
      id: post._id,
      description: post.description,
      media: post.media,
      type: post.type,
      likes: post.likes.length,
      comments: post.comments.length,
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
