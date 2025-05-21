"use client";

import CustomTable from "@/components/Global/CustomTable";
import DotDropdown from "@/components/Global/DotDropdown";
import Heading from "@/components/Global/Heading";
import Status from "@/components/Global/Status";
import { getFormattedDate } from "@/utils/frontend/helpers/globals";
import { Badge, Card } from "antd";
import { useState } from "react";
import useFetchCommunityMembers from "../hooks/useFetchCommunityMembers";
import useMakeMode from "../hooks/useMakeMode";
import useRemoveMode from "../hooks/useRemoveMode";
import MemberActionsModal from "./MemberActionsModal";
import { useRouter } from "next/navigation";
import BanUserModal from "./BanUserModal";
import useBanUser from "../hooks/useBanUser";

function MembersTable({ id }: { id: string }) {
  const { data, isLoading } = useFetchCommunityMembers(id);
  const [banUserId, setBanUserId] = useState(null);
  const router = useRouter();
  const { form, banBtnLoading, banUser, openBanModal, setOpenBanModal } =
    useBanUser(id, banUserId, setBanUserId);

  const {
    makeMode,
    makeModeLoading,
    openMakeModeModal,
    setOpenMakeModeModal,
    setSelectedUser,
    selectedUser,
  } = useMakeMode();
  const {
    removeMode,
    removeModeLoading,
    openRemoveModeModal,
    setOpenRemoveModeModal,
    setRemovedUserId,
    removedUserId,
  } = useRemoveMode();

  function handleMakeMode(record: any) {
    setOpenMakeModeModal(true);
    setSelectedUser(record?.id);
  }

  function handleRemoveMode(record: any) {
    setOpenRemoveModeModal(true);
    setRemovedUserId(record?.id);
  }
  const membersColumns = [
    {
      title: "Name",
      key: "name",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        return <Status text={role} />;
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (data: string) => {
        return <div className="text-gray-600">{getFormattedDate(data)}</div>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => {
        const items = [
          {
            key: "1",
            label: "View Profile",
            onClick: () => {
              router.push(`/user/profile/${record?.id}`);
            },
          },
          {
            key: "2",
            label:
              record?.role === "user" ? "Make Moderator" : "Remove Moderator",
            onClick: () => {
              record.role === "user"
                ? handleMakeMode(record)
                : handleRemoveMode(record);
            },
          },
          {
            key: "3",
            label: record?.isBanned ? "Unban User" : "Ban User",
            danger: !record?.isBanned,
            onClick: () => {
              setOpenBanModal(true);
              setBanUserId(record?.id);
            },
          },
        ];
        return <DotDropdown items={items} />;
      },
    },
  ];

  return (
    <Card className="mb-8 rounded-xl shadow-sm overflow-hidden border border-gray-100 p-0">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 p-5">
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
                className="text-blue-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <Heading text="Community Members" />
              <div className="text-sm text-gray-500">
                {data?.length || 0} {data?.length === 1 ? "member" : "members"}{" "}
                in this community
              </div>
            </div>
          </div>
          <Badge
            count={data?.length || 0}
            className="bg-blue-500"
            style={{ fontWeight: "500" }}
          />
        </div>
      </div>

      <div className="p-0">
        <CustomTable
          columns={membersColumns}
          data={data}
          loading={isLoading}
          className="mb-0"
          NoDataMessage="No members found in this community"
        />
      </div>

      <MemberActionsModal
        openModal={openMakeModeModal}
        setOpenModal={setOpenMakeModeModal}
        actionType="make"
        btnLoading={makeModeLoading}
        onConfirmAction={() => makeMode(id, selectedUser)}
        onCancel={() => setSelectedUser(null)}
      />
      <MemberActionsModal
        openModal={openRemoveModeModal}
        setOpenModal={setOpenRemoveModeModal}
        actionType="remove"
        btnLoading={removeModeLoading}
        onConfirmAction={() => removeMode(id, removedUserId)}
        onCancel={() => setRemovedUserId(null)}
      />
      <BanUserModal
        form={form}
        openModal={openBanModal}
        setOpenModal={setOpenBanModal}
        btnLoading={banBtnLoading}
        onConfirmAction={banUser}
        onCancel={() => setBanUserId(null)}
      />
    </Card>
  );
}

export default MembersTable;
