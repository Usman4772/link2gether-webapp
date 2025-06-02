import { LoginProps } from "@/utils/backend/modules/auth/types/types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoginAPI } from "../apis/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useLogin() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [remember,setRemember]=useState(false)
  const router = useRouter();
  async function handleLogin(values: LoginProps) {
    try {
      setBtnLoading(true);
      values.remember=remember
      console.log(values,'values')
      const response = await LoginAPI(values);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setRemember(false)
        const maxAge=response?.data?.data?.remember? 7 * 24 * 60 * 60 : 24 * 60 * 60;
        setCookie("token", response?.data?.data?.token,{maxAge:maxAge,secure:true});
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
    remember,
    setRemember,
    btnLoading,
  };
}

export default useLogin;
