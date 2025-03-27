import { useQuery } from "@tanstack/react-query";
import { getTopActiveCommunitiesAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useGetActiveCommunities() {
  const { data, isLoading } = useQuery({
    queryKey: ["top_communities"],
    queryFn: getTopCommunities,
  });

  async function getTopCommunities() {
    try {
      const response = await getTopActiveCommunitiesAPI();
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  return {
    data,
 isLoading,
  };
}

export default useGetActiveCommunities;
