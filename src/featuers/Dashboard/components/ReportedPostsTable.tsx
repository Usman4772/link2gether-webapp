"use client";

import CustomTable from "@/components/Global/CustomTable";
import DotDropdown from "@/components/Global/DotDropdown";
import Heading from "@/components/Global/Heading";
import { Badge, Card } from "antd";
import { useState } from "react";
import useFetchReportedPosts from "../hooks/useFetchReportedPosts";
import Status from "@/components/Global/Status";
import { useRouter } from "next/navigation";
import useHidePost from "@/featuers/Community/hooks/useHidePost";
import HidePostModal from "@/featuers/Community/components/HidePostModal";
import useDismissReport from "../hooks/useDismissReport";
import DismissReportModal from "./DismissReportModal";

function ReportedPostsTable({ id }: { id: string }) {
  const { data, isLoading } = useFetchReportedPosts(id);
  const router = useRouter();
  const [postId, setPostId] = useState(null);
  const { openHidePostModal, setOpenHidePostModal, hidePost, hideBtnLoading } =
    useHidePost(postId, id);
  const { dismiss, dismissBtnLoading, openDismissModal, setOpenDismissModal } =
    useDismissReport();

  const reportedPostsColumns = [
    {
      title: "Posted by",
      dataIndex: "posted_by",
      key: "postedBy",
      render: (data: any) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img
              src={data?.profileImage || "/default-user.jpeg"}
              alt={data?.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-800">{data?.username}</span>
        </div>
      ),
    },
    {
      title: "Report Reason",
      dataIndex: "reason",
      key: "reason",
      render: (reason: string) => (
        <div className="max-w-xs truncate text-gray-700">{reason}</div>
      ),
    },
    {
      title: "Last Reported By",
      dataIndex: "last_reported_by",
      key: "reportedBy",
      render: (data: any) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img
              src={data?.profileImage || "/default-user.jpeg"}
              alt={data?.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-800">{data?.username}</span>
        </div>
      ),
    },
    {
      title: "Report Count",
      dataIndex: "report_count",
      key: "reportCount",
      render: (count: number) => (
        <Badge
          count={count}
          style={{
            backgroundColor: count > 3 ? "#ff4d4f" : "#faad14",
            fontWeight: "500",
          }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data: any) => <Status text={data} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        const items = [
          {
            key: "1",
            label: "View Post",
            onClick: () => {
              router.push(`/post/${record?.post_id}`);
            },
          },
          {
            key: "2",
            label: "Hide Post",
            danger: true,
            onClick: () => {
              setPostId(record?.post_id);
              setOpenHidePostModal(true);
            },
          },
          {
            key: "3",
            label: "Dismiss Report",
            onClick: () => {
              setPostId(record?.post_id);
              setOpenDismissModal(true);
            },
          },
        ];
        return <DotDropdown items={items} />;
      },
    },
  ];
  return (
    <Card className="mb-8 rounded-xl shadow-sm overflow-hidden border border-gray-100 p-0">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-100 p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </div>
            <div>
              <Heading text="Reported Posts" />
              <div className="text-sm text-gray-500">
                {data?.length || 0} {data?.length === 1 ? "post" : "posts"}{" "}
                reported by community members
              </div>
            </div>
          </div>
          <Badge
            count={data?.length || 0}
            className="bg-red-500"
            style={{ fontWeight: "500" }}
          />
        </div>
      </div>

      <div className="p-0">
        <CustomTable
          columns={reportedPostsColumns}
          data={data}
          loading={isLoading}
          className="mb-0"
          NoDataMessage="No reported posts in this community"
        />
      </div>

      <HidePostModal
        openModal={openHidePostModal}
        setOpenModal={setOpenHidePostModal}
        onConfirmAction={hidePost}
        loading={hideBtnLoading}
      />
      <DismissReportModal
        openModal={openDismissModal}
        setOpenModal={setOpenDismissModal}
        onConfirmAction={() => dismiss(id, postId)}
        loading={dismissBtnLoading}
      />
    </Card>
  );
}

export default ReportedPostsTable;
