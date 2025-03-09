import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllCommentsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useFetchPostComments(postId: string | number) {
  const {data:comments,isLoading:commentsLoading} = useQuery({
    queryKey: ["postComments", postId],
    queryFn: async () => {
      try {
        const response = await getAllCommentsAPI(postId);
        if (response?.data?.success) {
          return response.data.data;
        }
      } catch (error) {
        handleAPIErrors(error);
        return error;
      }
    },
  });
    return {comments,commentsLoading};
}

export default useFetchPostComments;
