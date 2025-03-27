import CustomTable from "@/components/Global/CustomTable";
import Heading from "@/components/Global/Heading";
import { getFormattedDate } from "@/utils/frontend/helpers/globals";
import { Card } from "antd";
import useGetDashboardCommunities from "../hooks/useGetDashbaordCommunities";
import Status from "@/components/Global/Status";

function DashboardCommunities() {
  const { data, isLoading } = useGetDashboardCommunities();

  const columns = [
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "name",
    },
    {
      title: "Members Count",
      dataIndex: "members",
      key: "members",
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      render: (data: string) => <Status text={data} />,
    },
    {
      title: "Reported Posts",
      dataIndex: "reported_posts",
      key: " reportedPosts",
    },
    {
      title: "Join Requests",
      dataIndex: "join_requests",
      key: " joinRequests",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "  created_at",
      render: (date: string) => <div>{getFormattedDate(date)}</div>,
    },
  ];

  return (
    <Card className="p-6 outline-none border-none shadow-none">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Your Communities" size="20px" />
      </div>
      <CustomTable
        columns={columns}
        data={data}
        route={"/admin/community"}
        loading={isLoading}
      />
    </Card>
  );
}

export default DashboardCommunities;
