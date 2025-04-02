import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { makeModeratorAPI } from "../api/api";
import toast from "react-hot-toast";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useMakeMode() {
  const [openMakeModeModal, setOpenMakeModeModal] = useState(false);
  const [makeModeLoading, setMakeModeLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const queryClient = useQueryClient();
  async function makeMode(communityId: any, userId: any) {
    try {
      setMakeModeLoading(true);
      const response = await makeModeratorAPI(communityId, userId);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenMakeModeModal(false);
        setSelectedUser(null);
        queryClient.invalidateQueries({
          queryKey: ["community-members", communityId],
        });
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setMakeModeLoading(false);
    }
  }

  return {
    makeMode,
    makeModeLoading,
    selectedUser,
    setSelectedUser,
    openMakeModeModal,
    setOpenMakeModeModal,
  };
}

export default useMakeMode;
