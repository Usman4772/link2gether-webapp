import useToast from "@/hooks/useToast";
import { LoginProps } from "@/utils/backend/modules/auth/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";

function useLogin(setError: UseFormSetError<any>) {
  const [btnLoading, setBtnLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  async function handleLogin(values: LoginProps) {
    try {
      setBtnLoading(true);
      const response = await axios.post("/api/auth/login", values);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        router.push("/");
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
    handleLogin,
    btnLoading,
  };
}

export default useLogin;
