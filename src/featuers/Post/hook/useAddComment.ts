import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { addCommentAPI } from "../api/api";

function useAddComment(postId: string | number) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const { mutateAsync: addComment, isPending } = useMutation({
    mutationFn: handleAddComment,
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
        setContent("");
      }
    },
    onError: (error) => {
      handleAPIErrors(error);
    },
  });

  async function handleAddComment() {
    const response = await addCommentAPI(postId, content);
    return response;
  }
  return { content, setContent, addComment, btnLoading: isPending };
}

export default useAddComment;
