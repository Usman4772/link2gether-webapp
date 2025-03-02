"use client";
import { UploadFile } from "antd";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { RegisterAPI } from "../apis/api";

function useRegister(formSchema: any, setError: UseFormSetError<any>) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
console.log(formData,'formdata')
    try {
      setBtnLoading(true);
      const response = await RegisterAPI(formData);
      console.log(response,'res')
      if (response.data?.success) {
        toast.success(response?.data?.message);
        setCookie("token", response?.data?.data?.token);
        router.push("/onboarding/categories");
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
