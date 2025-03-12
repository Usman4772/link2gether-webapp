import { useQuery } from "@tanstack/react-query";
import { postDetailAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useFetchPostDetails(id: number | string) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
  });

  async function fetchPostDetails(id: number | string) {
    try {
      const response = await postDetailAPI(id);
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      handleAPIErrors(error);
      throw error;
    }
  }

  return { data, isLoading };
}

export default useFetchPostDetails;
