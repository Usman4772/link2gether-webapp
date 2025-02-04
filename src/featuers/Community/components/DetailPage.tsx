import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import Link from "next/link";
import React from "react";
import DetailPageHeader from "./DetailPageHeader";
import Post from "@/featuers/Feed/components/Post";
import DetailSection from "./DetailSidebar";
import DetailSidebar from "./DetailSidebar";

function DetailPage({ id }: { id: number | string }) {
  const posts = [
    {
      id: "1",
      title: "Post 1",
      created_at: "2021-09-20",
      description: "This is a post",
      media: "/food.jpg",
      type: "image",

      likes: 10,
      comments: 20,
      author: {
        id: "1",
        username: "Usman Ali",
        profileImage: "/food.jpg",
      },
    },
    {
      id: "1",
      title: "Post 1",
      created_at: "2021-09-20",
      description: "This is a post",
      media: "/food.jpg",
      type: "image",

      likes: 10,
      comments: 20,
      author: {
        id: "1",
        username: "Usman Ali",
        profileImage: "/food.jpg",
      },
    },
    {
      id: "1",
      title: "Post 1",
      created_at: "2021-09-20",
      description: "This is a post",
      media: "/food.jpg",
      type: "image",

      likes: 10,
      comments: 20,
      author: {
        id: "1",
        username: "Usman Ali",
        profileImage: "/food.jpg",
      },
    },
  ];
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] min-h-full flex flex-col  items-center justify-start py-2 ">
        <DetailPageHeader />
        <div className="flex justify-between w-full  relative py-4">
          <div className="w-[65%] h-auto flex flex-col gap-8">
            {posts.map((post) => (
              <Post data={post} />
            ))}
          </div>
          <DetailSidebar/>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
