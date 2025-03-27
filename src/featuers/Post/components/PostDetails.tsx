"use client";
import Post from "@/featuers/Feed/components/Post";
import React from "react";
import CommentSection from "./CommentSection";
import useFetchPostDetails from "../hook/useFetchPostDetails";
import Loading from "@/components/Global/Loading";

function PostDetails({ id }: { id: number | string }) {
  const { data, isLoading } = useFetchPostDetails(id);

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col gap-4">
      <Post data={data} communityDetails={data?.community}/>
      <CommentSection postId={id} />
    </div>
  );
}

export default PostDetails;
