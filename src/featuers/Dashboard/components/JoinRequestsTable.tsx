"use client";

import CustomButton from "@/components/Global/CustomButton";
import CustomTable from "@/components/Global/CustomTable";
import Heading from "@/components/Global/Heading";
import { CheckOutlined } from "@ant-design/icons";
import { Card, Badge } from "antd";
import { X } from "lucide-react";
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
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src={data?.profileImage || "/default-user.jpeg"}
              alt={data?.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-800">{data?.username}</div>
            {data?.bio && (
              <div className="text-xs text-gray-500 truncate max-w-[200px]">
                {data?.bio}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <div className="text-gray-600">{email}</div>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (data: any) => (
        <div className="text-gray-600">{getFormattedDate(data)}</div>
      ),
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
        return (
          <div className="flex items-center gap-2">
            <DotDropdown items={items} />
          </div>
        );
      },
    },
  ];

  return (
    <Card className="rounded-xl shadow-sm overflow-hidden border border-gray-100 p-0">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100 p-5">
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
                className="text-purple-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M19 8v6"></path>
                <path d="M22 11h-6"></path>
              </svg>
            </div>
            <div>
              <Heading text="Pending Join Requests" />
              <div className="text-sm text-gray-500">
                {data?.length || 0} {data?.length === 1 ? "user" : "users"}{" "}
                waiting for approval
              </div>
            </div>
          </div>
          <Badge
            count={data?.length || 0}
            className="bg-purple-500"
            style={{ fontWeight: "500" }}
          />
        </div>
      </div>

      <div className="p-0">
        <CustomTable
          columns={joinRequestsColumns}
          data={data}
          loading={isLoading}
          className="mb-0"
          NoDataMessage="No pending join requests for this community"
        />
      </div>

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
