import React, { useState } from "react";
import axios from "@/utils/config/axios";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
function useLogout() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  async function logout() {
    setLogoutLoading(true);
    try {
      const response = await axios.get("/auth/logout");
      if (response?.data?.success) {
        deleteCookie("token");
        deleteCookie("onboardingStatus");
        router.push("/login");
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setLogoutLoading(false);
    }
  }
  return { logout, logoutLoading };
}

export default useLogout;
