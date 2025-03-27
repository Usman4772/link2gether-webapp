import { hidePostAPI } from "@/featuers/Post/api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

function useHidePost(
  postId: string | number |null,
  communityId: string | number | undefined
) {
  const [openHidePostModal, setOpenHidePostModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: hidePost, isPending: hideBtnLoading } = useMutation({
    mutationFn: async () => {
      try {
        const response = await hidePostAPI(communityId, postId);
        if (response?.data?.success) {
          return response;
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      setOpenHidePostModal(false);
      queryClient.invalidateQueries({
        queryKey: ["community-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["community-posts"],
      });
      queryClient.invalidateQueries({queryKey:["reported-posts",communityId]})
    },
    onError: (error) => {
      handleAPIErrors(error);
    },
  });
  return { openHidePostModal, setOpenHidePostModal, hidePost, hideBtnLoading };
}

export default useHidePost;
