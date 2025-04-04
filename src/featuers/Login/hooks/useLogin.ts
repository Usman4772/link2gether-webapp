import { LoginProps } from "@/utils/backend/modules/auth/types/types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginAPI } from "../apis/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useLogin(setError: UseFormSetError<any>) {
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  async function handleLogin(values: LoginProps) {
    try {
      setBtnLoading(true);
      const response = await LoginAPI(values);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setCookie("token", response?.data?.data?.token);
        setCookie("onboardingStatus", response?.data?.data?.onboardingStatus);
        router.push("/");
      }
    } catch (error: any) {
      handleAPIErrors(error);
    } finally {
      setBtnLoading(false);
    }
  }

  return {
    handleLogin,
    btnLoading,
  };
}

export default useLogin;
