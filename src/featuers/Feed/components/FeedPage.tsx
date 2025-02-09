"use client";
import React from "react";
import Post from "./Post";
import useFetchPosts from "../hooks/useFetchPosts";
import Loading from "@/components/Global/Loading";
import NotFound from "@/components/Global/NotFound";

export interface PostProps {
  id: string;
  title: string;
  created_at: string;
  description: string;
  media: string;
  type: string;
  likes: number;
  comments: number;
  community?: {
    id: string;
    community_name: string;
    displayPic: string;
  };
  author: {
    _id: string;
    username: string;
    profileImage: string;
  };
}



function FeedPage() {
  const { data, isLoading, error } = useFetchPosts();
  if (isLoading) return <Loading />;
  if(!data || data.length === 0) return <NotFound text="No posts yet" />;
  return (
    <div className="w-full flex flex-col gap-16 px-14">
      {data && data.length > 0 && 
        data.map((post: PostProps) => <Post data={post} key={post.id}/>)
      }
    </div>
  );
}

export default FeedPage;
