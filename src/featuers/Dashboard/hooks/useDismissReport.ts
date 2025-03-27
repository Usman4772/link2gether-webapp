import React, { useState } from "react";
import { dismissReportAPI } from "../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import toast from "react-hot-toast";

function useDismissReport() {
  const [dismissBtnLoading, setDismissBtnLoading] = useState(false);
  const [openDismissModal, setOpenDismissModal] = useState(false);
  const queryClient = useQueryClient();

  async function dismissReportRequest(communityId: any, postId: any) {
    try {
      setDismissBtnLoading(true);
      const response = await dismissReportAPI(communityId, postId);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenDismissModal(false);
        queryClient.invalidateQueries({
          queryKey: ["reported-posts", communityId],
        });
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setDismissBtnLoading(false);
    }
  }

  return {
    dismissBtnLoading,
    openDismissModal,
    setOpenDismissModal,
    dismiss: dismissReportRequest,
  };
}

export default useDismissReport;
