import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import Link from "next/link";
import React from "react";

interface CommunityProps {
  _id: string;
  avatar?: string;
  community_name: string;
  description: string;
}

function Community({ data }: { data: CommunityProps }) {
  return (
    <Link
      className="flex items-center justify-start gap-4 p-4 w-full hover:bg-gray-100 rounded-md"
      href={`/community/${data?._id}`}
    >
      <img
        src={data?.avatar || "/default-avatar.jpeg"}
        className="w-28 h-16 rounded-md object-cover"
      />
      <div className="flex flex-col w-full">
        <Heading text={data?.community_name} />
        <Paragraph text={data?.description} className="w-3/4 truncate" />
      </div>
    </Link>
  );
}

export default Community;
