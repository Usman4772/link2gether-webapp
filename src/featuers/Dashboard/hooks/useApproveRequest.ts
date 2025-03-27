import React, { useState } from "react";
import { approveRequestAPI } from "../api/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useApproveRequest() {
  const [approveBtnLoading, setApproveBtnLoading] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const queryClient = useQueryClient();
  async function approveRequest(communityId: any, userId: any) {
    try {
      setApproveBtnLoading(true)
      const response = await approveRequestAPI(communityId, userId);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenApproveModal(false);
        setUserId(null);
        queryClient.invalidateQueries({
          queryKey: ["join-requests", communityId],
        });
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setApproveBtnLoading(false);
    }
  }

  return {
    approveRequest,
    approveBtnLoading,
    userId,
    setUserId,
    openApproveModal,
    setOpenApproveModal,
  };
}

export default useApproveRequest;
