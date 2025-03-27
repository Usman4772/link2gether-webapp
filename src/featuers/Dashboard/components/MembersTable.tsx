import CustomTable from "@/components/Global/CustomTable";
import DotDropdown from "@/components/Global/DotDropdown";
import Heading from "@/components/Global/Heading";
import Status from "@/components/Global/Status";
import { getFormattedDate } from "@/utils/frontend/helpers/globals";
import { Badge, Card } from "antd";
import React, { useState } from "react";
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
  const { form,banBtnLoading, banUser, openBanModal, setOpenBanModal } = useBanUser(
    id,
    banUserId,
    setBanUserId
  );

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
        return <div>{getFormattedDate(data)}</div>;
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
            label: "Ban User",
            danger: true,
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
    <Card className="mb-8 shadow-sm p-3">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Community Members" />
      </div>
      <CustomTable
        columns={membersColumns}
        data={data}
        loading={isLoading}
        className="mb-4"
      />
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
