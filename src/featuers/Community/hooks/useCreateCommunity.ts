import { UploadFile } from "antd";
import React, { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createCommunityAPI } from "../api/api";
import {
  handleAntDFormErrors,
  handleAPIErrors,
  handleFormErrors,
} from "@/utils/frontend/handleErrors";
import { communitySchema } from "@/utils/backend/validation-schema/community.schema";
import { useAppDispatch } from "@/hooks/useAppSelector";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";
import {isVulgar} from "@/utils/frontend/helpers/globals";

function useCreateCommunity({ form }: { form: any }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function createCommunity(values: z.infer<typeof communitySchema>) {
    if(isVulgar(values?.community_name)) return toast.error("Community name must be appropriate and does not include any bad words.")
    try {
      setBtnLoading(true);
      const formData = new FormData();
      const avatar = fileList[0]?.originFileObj;
      formData.append("community_name", values?.community_name);
      formData.append("category", values?.category);
      if (avatar) formData.append("avatar", avatar);
      formData.append("visibility", values?.visibility);

      const response = await createCommunityAPI(formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setOpenCreateCommunityModal(false));
        form.resetFields();
        setFileList([]);
      }
    } catch (error: any) {
      handleAPIErrors(error);
      //todo change this to form errors.
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
