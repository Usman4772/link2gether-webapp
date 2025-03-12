import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { banUserAPI } from "../api/api";
import { BanUserProps } from "@/utils/backend/modules/auth/types/community.types";
import toast from "react-hot-toast";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";


interface BanUser{
    payload: BanUserProps,
    communityId: string | number;
    userId: string | number;
}

interface Props{
    setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

function useBanUser({setOpenModal=()=>{}}:Props) {
  const queryClient = useQueryClient();
const [banBtnLoading, setBanBtnLoading] = useState(false);

  async function banUser(payload: BanUserProps,  communityId:any,
      userId: number | string) {
    try {
      setBanBtnLoading(true);
      const response = await banUserAPI(payload, communityId,userId);
      if (response?.data?.success) {
        toast.success(response.data.message);
        setOpenModal(false);
        queryClient.invalidateQueries({ queryKey: "community-details" });
        queryClient.invalidateQueries({ queryKey: "community-posts" });
      }
    } catch (error) {
      handleAPIErrors(error)
    } finally {
      setBanBtnLoading(false)
}
  }

  return {
     banUser,
    banBtnLoading,

  };
}

export default useBanUser;
