"use client";
import React from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import NotFound from "@/components/Global/NotFound";
import Post from "./Post";
import { CommunityPostsProps } from "@/utils/backend/modules/auth/types/community.types";
import Loading from "@/components/Global/Loading";
import NoPostsFound from "@/featuers/Post/components/NoPostsFound";

function FeedPage() {
  const { data, isLoading, error } = useFetchPosts();
  if (isLoading) return <Loading />;
  if (!data || data.length === 0) return <NoPostsFound />;
  return (
    <div className="w-full flex flex-col gap-16 ">
      {data &&
        data.length > 0 &&
        data.map((post: CommunityPostsProps) => (
          <Post
            data={post}
            key={post.id}
            communityDetails={post?.community}
            communityId={post.community?.id}
          />
        ))}
    </div>
  );
}

export default FeedPage;
