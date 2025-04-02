import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { rejectRequestAPI } from "../api/api";

function useRejectRequest() {
  const [rejectBtnLoading, setRejectBtnLoading] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const queryClient = useQueryClient();
  async function rejectRequest(communityId: any, userId: any) {
    try {
      setRejectBtnLoading(true);
      const response = await rejectRequestAPI(communityId, userId);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setUserId(null);
        setOpenRejectModal(false);
        queryClient.invalidateQueries({
          queryKey: ["join-requests", communityId],
        });
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setRejectBtnLoading(false);
    }
  }

  return {
    rejectBtnLoading,
    rejectRequest,
    rejectedUserId:userId,
    setRejectedUserId:setUserId,
    openRejectModal,
    setOpenRejectModal,
  };
}

export default useRejectRequest;
