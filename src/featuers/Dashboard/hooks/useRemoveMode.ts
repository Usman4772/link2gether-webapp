import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { makeModeratorAPI, removeModeratorAPI } from "../api/api";
import toast from "react-hot-toast";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useRemoveMode() {
  const [openRemoveModeModal, setOpenRemoveModeModal] = useState(false);
  const [removeModeLoading, setRemoveModeLoading] = useState(false);
  const [removedUserId, setRemovedUserId] = useState<any>(null);
  const queryClient = useQueryClient();
  async function removeMode(communityId: any, userId: any) {
    try {
      setRemoveModeLoading(true);
      const response = await removeModeratorAPI(communityId, userId);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenRemoveModeModal(false);
        setRemovedUserId(null);
        queryClient.invalidateQueries({
          queryKey: ["community-members", communityId],
        });
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setRemoveModeLoading(false);
    }
  }

  return {
      removeMode,
      removeModeLoading,
      removedUserId,
      setRemovedUserId,
      openRemoveModeModal,
      setOpenRemoveModeModal,
    };
        
}

export default useRemoveMode;
