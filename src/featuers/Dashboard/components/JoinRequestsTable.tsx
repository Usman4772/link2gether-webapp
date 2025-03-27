import CustomButton from "@/components/Global/CustomButton";
import CustomTable from "@/components/Global/CustomTable";
import Heading from "@/components/Global/Heading";
import { CheckOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Cross, Key, X } from "lucide-react";
import React from "react";
import useFetchJoinRequests from "../hooks/useFetchJoinRequests";
import DotDropdown from "@/components/Global/DotDropdown";
import { getFormattedDate } from "@/utils/frontend/helpers/globals";
import useApproveRequest from "../hooks/useApproveRequest";
import useRejectRequest from "../hooks/useRejectRequest";
import RequestActionModal from "./RequestActionModal";
import { useRouter } from "next/navigation";

function JoinRequestsTable({ id }: { id: string }) {
  const { data, isLoading } = useFetchJoinRequests(id);
  const router = useRouter();
  const {
    approveBtnLoading,
    approveRequest,
    openApproveModal,
    userId,
    setUserId,
    setOpenApproveModal,
  } = useApproveRequest();
  const {
    rejectBtnLoading,
    rejectRequest,
    rejectedUserId,
    setRejectedUserId,
    openRejectModal,
    setOpenRejectModal,
  } = useRejectRequest();

  const joinRequestsColumns = [
    {
      title: "User Name",
      key: "username",
      render: (data: any) => (
        <div className="flex items-center gap-3">
          <img
            src={data?.profileImage || "/default-user.jpeg"}
            alt={data?.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{data?.username}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (data: any) => <div>{getFormattedDate(data)}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => {
        const items = [
          {
            label: "View Profile",
            Key: "View Profile",
            onClick: () => router.push(`/user/profile/${record?.id}`),
          },
          {
            label: "Approve",
            Key: "Approve",
            onClick: () => {
              setUserId(record?.id);
              setOpenApproveModal(true);
            },
          },
          {
            label: "Reject",
            Key: "Reject",
            danger: true,
            onClick: () => {
              setRejectedUserId(record?.id);
              setOpenRejectModal(true);
            },
          },
        ];
        return <DotDropdown items={items} />;
      },
    },
  ];

  return (
    <Card className="shadow-sm p-2">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Pending Join Requests" />
      </div>
      <CustomTable
        columns={joinRequestsColumns}
        data={data}
        className="mb-4"
        loading={isLoading}
      />
      <RequestActionModal
        openModal={openApproveModal}
        setOpenModal={setOpenApproveModal}
        isApprovalModal={true}
        btnLoading={approveBtnLoading}
        onConfirmAction={async () => await approveRequest(id, userId)}
        onCancel={() => setUserId(null)} 
        
      />
      <RequestActionModal
        openModal={openRejectModal}
        setOpenModal={setOpenRejectModal}
        btnLoading={rejectBtnLoading}
        onConfirmAction={async () => await rejectRequest(id, rejectedUserId)}
        onCancel={() => setRejectedUserId(null)}
      />
    </Card>
  );
}

export default JoinRequestsTable;
