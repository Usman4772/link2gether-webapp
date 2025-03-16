"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, Badge, Dropdown, Menu, Button } from "antd";
import { MoreOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import Status from "@/components/Global/Status";
import CommunityHeader from "./CommunityHeader";
import MembersTable from "./MembersTable";
import ReportedPosts from "@/models/reported.posts";
import ReportedPostsTable from "./ReportedPostsTable";
import JoinRequestsTable from "./JoinRequestsTable";

interface CommunityDetailProps {
  params: {
    id: string;
  };
}

export default function CommunityDetailPage({ params }: CommunityDetailProps) {
  const [community, setCommunity] = useState({
    id: params.id,
    name: "Programming Enthusiasts",
    createdAt: "March 15, 2023",
    visibility: "Public",
    description: "A community for sharing programming tips and tricks",
  });


  return (
    <div className="container mx-auto py-8 px-4 ">
      <CommunityHeader data={community} />
      <MembersTable />
      <ReportedPostsTable />
      <JoinRequestsTable />
    </div>
  );
}
