import React, { useOptimistic, useState } from "react";
import { likePostAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { CommunityPostsProps } from "@/utils/backend/modules/auth/types/community.types";

function useLike(data: CommunityPostsProps) {
  const [likes, setLikes] = useState(data?.likes || 0);
  const [isLiked, setIsLiked] = useState(data?.isLiked || false);
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    isLiked || false
  );
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes || 0);
    
  async function like() {
    try {
      setOptimisticIsLiked(!optimisticIsLiked);
      if (optimisticIsLiked) {
        setOptimisticLikes(optimisticLikes - 1);
      } else {
        setOptimisticLikes(optimisticLikes + 1);
      }
      const response = await likePostAPI(data.id);
      if (response?.data?.success) {
        setIsLiked(response?.data?.data?.isLiked);
        setLikes(response?.data?.data?.likes);
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }
  return {
    optimisticIsLiked,
    optimisticLikes,
    like,
    isLiked,
    likes,
  };
}

export default useLike;
