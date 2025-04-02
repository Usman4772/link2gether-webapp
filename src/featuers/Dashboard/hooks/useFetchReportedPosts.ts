import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";
import { getReportedPostsAPI } from "../api/api";

function useFetchReportedPosts(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["reported-posts", id],
    queryFn: getReportedPosts,
  });

  async function getReportedPosts() {
    try {
      const response = await getReportedPostsAPI(id);
      if (response?.data?.success) {
        return response?.data?.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  return { data, isLoading };
}

export default useFetchReportedPosts;
