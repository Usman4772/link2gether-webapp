import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JoinCommunityAPI } from "../api/api";
import toast from "react-hot-toast";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useJoinCommunity(id: string | number) {
  const queryClient = useQueryClient();
  const { mutateAsync: join, isPending } = useMutation({
    mutationFn: () => joinCommunity(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["community-details"] });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      toast.success(response?.message);
    },
    onError: (error: any) => {
      handleAPIErrors(error);
    },
  });
  async function joinCommunity(id: string | number) {
    try {
      const response = await JoinCommunityAPI(id);
      if (response?.data?.success) {
        return response?.data;
      }
    } catch (error: any) {
      handleAPIErrors(error);
      throw error?.response?.data;
    }
  }

  return {
    join,
    isPending,
  };
}

export default useJoinCommunity;
