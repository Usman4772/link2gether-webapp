"use client";
import CommunityHeader from "./CommunityHeader";
import MembersTable from "./MembersTable";
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
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <CommunityHeader data={data} id={params.id} />

      <div className="grid grid-cols-1 gap-6">
        <MembersTable id={params.id} />
        <ReportedPostsTable id={params.id} />
        {data?.visibility === "private" && <JoinRequestsTable id={params.id} />}
      </div>
    </div>
  );
}
