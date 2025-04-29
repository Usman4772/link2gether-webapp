import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { leaveCommunityAPI } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useLeaveCommunity(id: string | number) {
  const queryClient = useQueryClient();
  const {
    mutateAsync: leave,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => leaveCommunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-details"] });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      toast.success("Left community successfully");
    },
      onError: (error) => {
      handleAPIErrors(error);
    },
  });

  async function leaveCommunity(id: string | number) {
    const response = await leaveCommunityAPI(id);
    return response.data;
  }
  return { leave, leaveBtnLoading: isPending, leaveError: error };
}

export default useLeaveCommunity;
