import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { banUserAPI } from "../api/api";
import { Form } from "antd";

function useBanUser(communityId: any, userId: any, setBanUserId: any) {
    const [form]=Form.useForm();
  const [banBtnLoading, setBanBtnLoading] = useState(false);
  const [openBanModal, setOpenBanModal] = useState(false);
  const queryClient = useQueryClient();
  async function banUser(
    data: { reason: string; duration: string }
  ) {
    try {
      setBanBtnLoading(true);
      const response = await banUserAPI(communityId, userId, data);
        if (response?.data?.success) {
          form.resetFields()
        toast.success(response?.data?.message);
        setOpenBanModal(false);
        setBanUserId(null);
        queryClient.invalidateQueries({
          queryKey: ["community-members", communityId],
        });
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setBanBtnLoading(false);
    }
  }

    return {
      form,
    banUser,
    banBtnLoading,
    openBanModal,
    setOpenBanModal,
  };
}

export default useBanUser;
