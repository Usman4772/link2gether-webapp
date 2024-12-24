"use client";
import useToast from "@/hooks/useToast";
import { CommunityCategory } from "@/utils/enums/enums";
import { UploadFile } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

function useRegister(formSchema: any, setError: UseFormSetError<any>) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const toast = useToast();
  const router = useRouter();

  async function handleRegister(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const profileImage = fileList[0]?.originFileObj;
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirm_password", values.confirm_password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    } else {
      formData.append("profileImage", "");
    }

    try {
      setBtnLoading(true);
      const response = await axios.post("/api/auth/register", formData);
      if (response.data?.success) {
        toast.success(response?.data?.message);
        router.push("/categories");
      }
    } catch (error: any) {
      handleFormErrors(error?.response?.data?.errors);
    } finally {
      setBtnLoading(false);
    }
  }

  function handleFormErrors(errors: any) {
    errors.forEach((err: any) => {
      const [field, message]: any = Object.entries(err)[0];
      setError(field, {
        type: "server",
        message: message,
      });
    });
  }
  return {
    handleRegister,
    fileList,
    setFileList,
    btnLoading,
  };
}

export default useRegister;
