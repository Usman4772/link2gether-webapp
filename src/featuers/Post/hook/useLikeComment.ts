import React, { useOptimistic, useState } from "react";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { CommentProps } from "../components/Comment";
import { likeCommentAPI } from "../api/api";

function useLikeComment(data: CommentProps,postId:string|number) {
  const [likes, setLikes] = useState(data?.likes || 0);
  const [isLiked, setIsLiked] = useState(data.isLiked || false);
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    isLiked || false
  );
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes || 0);
    
  async function likeComment() {
    try {
      setOptimisticIsLiked(!optimisticIsLiked);
      if (optimisticIsLiked) {
        setOptimisticLikes(optimisticLikes - 1);
      } else {
        setOptimisticLikes(optimisticLikes + 1);
      }
      const response = await likeCommentAPI(postId,data.id);
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
    likeComment,
    isLiked,
    likes,
  };
}

export default useLikeComment;
