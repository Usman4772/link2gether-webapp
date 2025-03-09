import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRulesAPI, updateCommunityAPI } from "../api/api";
import toast from "react-hot-toast";
import {
  handleAntDFormErrors,
  handleAPIErrors,
  handleFormErrors,
} from "@/utils/frontend/handleErrors";
import { useState } from "react";

function useUpdateCommunity({
  setError=()=>{},
  id,
  setOpenModal = () => {},
  form,
  reset = () => {},
}: {
  setError?: any;
  id: string | number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  form?: any;
  reset?: () => void;
}) {
  const [coverLoading, setCoverLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [visibilityBtnLoading, setVisibilityBtnLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateCommunityData,
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        reset();
        queryClient.invalidateQueries({ queryKey: ["community-details"] });
        queryClient.invalidateQueries({ queryKey: ["community-posts"] });
        setOpenModal(false);
      }
    },
    onError: (error) => {
      handleAPIErrors(error);
      handleFormErrors(error, setError);
    },
  });

  const { mutateAsync: addNewRules, isPending: rulesLoading } = useMutation({
    mutationFn: addRules,
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        reset();
        queryClient.invalidateQueries({ queryKey: ["community-details"] });
        queryClient.invalidateQueries({ queryKey: ["community-posts"] });
        setOpenModal(false);
      }
    },
    onError: (error) => {
      handleAntDFormErrors(error, form);
    },
  });

  async function updateCommunityData(payload: any) {
    const response = await updateCommunityAPI(payload, id);
    return response;
  }

  async function updateAvatar(data: any) {
    setAvatarLoading(true);
    const formData = new FormData();
    const avatar = data[0]?.originFileObj;
    formData.append("avatar", avatar);
    try {
      return await mutateAsync(formData);
    } finally {
      setAvatarLoading(false);
    }
  }

  async function updateCover(data: any) {
    setCoverLoading(true);
    const formData = new FormData();
    const cover = data[0]?.originFileObj;
    formData.append("cover", cover);
    try {
      return await mutateAsync(formData);
    } finally {
      setCoverLoading(false);
    }
  }

  async function changeVisibility(data: any) {
    setVisibilityBtnLoading(true);
    const payload = new FormData();
    payload.append(
      "visibility",
      data?.visibility === "public" ? "private" : "public"
    );
    try {
      return await mutateAsync(payload);
    } finally {
      setVisibilityBtnLoading(false);
    }
  }

  async function addRules(payload: any) {
  
    const response = await addRulesAPI(payload, id);
    return response;
  }

  return {
    updateCommunity: mutateAsync,
    updateAvatar,
    updateCover,
    changeVisibility,
    addNewRules,
    rulesLoading,
    visibilityBtnLoading,
    isPending,
    avatarLoading,
    coverLoading,
    error,
  };
}

export default useUpdateCommunity;
