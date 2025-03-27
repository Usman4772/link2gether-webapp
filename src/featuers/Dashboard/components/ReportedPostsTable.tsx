import CustomTable from "@/components/Global/CustomTable";
import DotDropdown from "@/components/Global/DotDropdown";
import Heading from "@/components/Global/Heading";
import { Badge, Card } from "antd";
import React, { useState } from "react";
import useFetchReportedPosts from "../hooks/useFetchReportedPosts";
import { AnyARecord } from "dns";
import Status from "@/components/Global/Status";
import { useRouter } from "next/navigation";
import ReportModal from "@/featuers/Community/components/ReportPostModal";
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
      render: (data: any) => <div>{data?.username}</div>,
    },
    {
      title: "Report Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Last Reported By",
      dataIndex: "last_reported_by",
      key: "reportedBy",
      render: (data: any) => <div>{data?.username}</div>,
    },
    {
      title: "Report Count",
      dataIndex: "report_count",
      key: "reportCount",
      render: (count: number) => (
        <Badge
          count={count}
          style={{ backgroundColor: count > 3 ? "#ff4d4f" : "#faad14" }}
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
    <Card className="mb-8 shadow-sm p-2">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Reported Posts" />
      </div>
      <CustomTable
        columns={reportedPostsColumns}
        data={data}
        loading={isLoading}
        className="mb-4"
      />
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
