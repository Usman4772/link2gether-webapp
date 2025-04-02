import httpInstance from "@/utils/config/axios";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import React, { useEffect, useState } from "react";

function useValidateToken() {
  const [isValid, setIsValid] = useState(false);
  async function validateToken() {
    try {
      const response = await httpInstance.get("/token/validate");
      if (response?.data?.success) {
        setIsValid(response?.data?.data?.isValid);
      }
    } catch (error) {
      handleAPIErrors(error);
    }
    }
    useEffect(() => {
        validateToken()
    },[])
  return { isValid };
}

export default useValidateToken;
