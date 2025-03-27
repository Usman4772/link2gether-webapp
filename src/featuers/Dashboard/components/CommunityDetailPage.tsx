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
import useFetchAdminCommunityDetails from "../hooks/useFetchAdminCommunityDetails";
import Loading from "@/components/Global/Loading";

interface CommunityDetailProps {
  params: {
    id: string;
  };
}

export default function CommunityDetailPage({ params }: CommunityDetailProps) {
  const { data, isLoading } = useFetchAdminCommunityDetails(params.id);

  if (isLoading) return <Loading />;
  return (
    <div className="container mx-auto py-8 px-4 ">
      <CommunityHeader data={data} id={params.id} />
      <MembersTable id={params.id} />
      <ReportedPostsTable id={params.id} />
      {data?.visibility == "private" && <JoinRequestsTable id={params.id} />}
    </div>
  );
}
