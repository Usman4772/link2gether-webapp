import { UploadFile } from "antd";
import React, { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createCommunityAPI } from "../api/api";
import { handleFormErrors } from "@/utils/frontend/handleErrors";
import { communitySchema } from "@/utils/backend/validation-schema/community.schema";
import { useAppDispatch } from "@/hooks/useAppSelector";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";

function useCreateCommunity({
  setError,
  form,
}: {
  setError: UseFormSetError<any>;
  form: any;
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function createCommunity(values: z.infer<typeof communitySchema>) {
    try {
      setBtnLoading(true);
      const formData = new FormData();
      const avatar = fileList[0]?.originFileObj;
      formData.append("community_name", values?.community_name);
      formData.append("category", values?.category);
      formData.append("avatar", avatar || "");
      formData.append("visibility", values?.visibility);

      const response = await createCommunityAPI(formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setOpenCreateCommunityModal(false));
        form.reset();
        setFileList([]);
      }
    } catch (error: any) {
      handleFormErrors(error, setError);
    } finally {
      setBtnLoading(false);
    }
  }

  return {
    createCommunity,
    fileList,
    setFileList,
    btnLoading,
  };
}

export default useCreateCommunity;
