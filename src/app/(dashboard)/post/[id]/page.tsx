import PostDetails from "@/featuers/Post/components/PostDetails";
import React from "react";

function Page({ params }: { params: { id: string | number } }) {
  const id = params.id;
  return <PostDetails id={id} />;
}

export default Page;
