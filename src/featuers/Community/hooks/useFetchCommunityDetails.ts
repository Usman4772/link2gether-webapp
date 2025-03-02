import { useQuery } from "@tanstack/react-query";
import { fetchCommunityDetailsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useState } from "react";

function useFetchCommunityDetails(id: string | number) {
  const [posts, setPosts] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["community-details"],
    queryFn: () => fetchCommunityDetails(id),
  });

  async function fetchCommunityDetails(id: string | number) {
    try {
      setNotFound(null);
      const response = await fetchCommunityDetailsAPI(id);
      if (response?.data?.success) {
        setPosts(response?.data?.data?.posts);
        return response.data.data;
      } else {
        setPosts([]);
        return [];
      }
    } catch (error: any) {
      if (error.status == 404) {
        setNotFound(error?.response?.data?.message);
      }
      handleAPIErrors(error);
      return error?.response?.data;
    }
  }

  return {
    data,
    error,
    isLoading,
    posts,
    notFound,
    refetchDetails: refetch,
  };
}

export default useFetchCommunityDetails;
