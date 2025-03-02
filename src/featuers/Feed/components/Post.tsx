"use client";
import React from "react";
import { PostProps } from "./FeedPage";
import Link from "next/link";
import Image from "next/image";
import Paragraph from "@/components/Global/Paragraph";
import ReactTimeAgo from "react-time-ago";
import ShowMore from "@/components/Global/ShowMore";

function Post({ data }: { data: PostProps }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between  px-2">
       {data?.community ? <div className="flex items-start gap-4 ">
          <Image
            src={data?.community?.avatar || "/group-default.png"}
            width={50}
            height={50}
            className="rounded-[50%] object-cover w-[50px] h-[50px]"
            alt="Avatar"
          />
          <div className="flex flex-col justify-center ">
            <Link
              href={`/community/${data?.community?.id}`}
              className="text-[#0D171C] text-[16px] font-[600] tracking-tighter"
            >
              {data?.community?.community_name}
            </Link>
            <Link href={"#"} className="text-[#4F7A96] text-[12px]">
              by {data?.author?.username}
            </Link>
            <ReactTimeAgo
              date={new Date(data?.created_at)}
              locale="en-US"
              className="text-[#4F7A96] text-[12px]"
            />
          </div>
        </div>: <UserHeader author={data.author} created_at={data.created_at}/>}
        <div>
          {/*todo add this dropdown to save the post*/}
          {/* <DotDropdown
            items={[
              {
                id: "1",
                label: "Save Post",
                onClick: (id: string) => {
                  console.log("clicked here", id);
                },
              },
            ]}
          /> */}
        </div>
      </div>
      <div className="flex flex-col justify-center px-2">
        <ShowMore text={data?.description} maxLength={200} />
      </div>
      {data.type !== "text" && (
        <img
          src={data?.media}
          className="w-full h-[500px] object-cover rounded-[15px]"
          alt="Post"
        />
      )}
      <div className="flex justify-between pt-4 px-2">
        <button className="flex items-center gap-2">
          <img src="/like.svg" width={20} height={20} />
          <Paragraph text="Like" />
        </button>
        <button className="flex items-center gap-2">
          <img src="/comment.svg" width={20} height={20} />
          <Paragraph text="Comment" />
        </button>
        <button className="flex items-center gap-2">
          <img src="/share.svg" width={20} height={20} />
          <Paragraph text="Share" />
        </button>
      </div>
    </div>
  );
}

export default Post;



interface UserHeaderProps {
    _id: string;
    username: string;
    profileImage: string;
  
}

function UserHeader({author,created_at}:{author:UserHeaderProps,created_at:string}) {
  return (
    <div className="flex items-start gap-4 ">
      <Image
        src={author?.profileImage || "/group-default.png"}
        width={50}
        height={50}
        className="rounded-[50%] object-cover w-[50px] h-[50px]"
        alt="Profile Picture"
      />
      <div className="flex flex-col justify-center ">
        <Link
          href={`/profile/${author?._id}`}
          className="text-[#0D171C] text-[16px] font-[600] tracking-tighter"
        >
          {author?.username}
        </Link>
      
        <ReactTimeAgo
          date={new Date(created_at)}
          locale="en-US"
          className="text-[#4F7A96] text-[12px]"
        />
      </div>
    </div>
  );
}