import { postSchema } from "@/utils/backend/validation-schema/post.schema";
import { handleFormErrors } from "@/utils/frontend/handleErrors";
import { UploadFile } from "antd";
import React, { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createCommunityAPI, createPostAPI } from "../api/api";

function useCreatePost({
    setError,
    id,
    form,
  setOpenModal=()=>{},
}: {
  setError: UseFormSetError<any>;
        form: any;
        id:string | number,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);

  async function createPost(values: z.infer<typeof postSchema>) {
    {
      try {
        setBtnLoading(true);
        const formData = new FormData();
        const media = fileList[0]?.originFileObj;
        formData.append("description", values?.description);
        formData.append("media", media || "");

        const response = await createPostAPI(formData,id);
        if (response?.data?.success) {
            toast.success(response?.data?.message);
            setOpenModal(false)
          form.reset();
          setFileList([]);
        }
      } catch (error: any) {
        handleFormErrors(error, setError);
      } finally {
        setBtnLoading(false);
      }
    }
  }

  return {
    createPost,
    fileList,
    setFileList,
    btnLoading,
  };
}

export default useCreatePost;
