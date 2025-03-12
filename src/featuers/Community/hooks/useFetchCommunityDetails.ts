import { useQuery } from "@tanstack/react-query";
import { fetchCommunityDetailsAPI, getCommunityPostsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useState } from "react";
import { CommunityDetailPageProps } from "@/utils/backend/modules/auth/types/community.types";

function useFetchCommunityDetails(id: string | number) {
  const [notFound, setNotFound] = useState(null);
  const { data, error, isLoading, refetch } = useQuery<CommunityDetailPageProps>({
    queryKey: ["community-details"],
    queryFn: () => fetchCommunityDetails(id),
  });

  const {data:posts,isLoading:postsLoading } = useQuery({
    queryKey: ["community-posts"],
    queryFn: () => fetchCommunityPosts(id),
  })

  async function fetchCommunityDetails(id: string | number) {
    try {
      setNotFound(null);
      const response = await fetchCommunityDetailsAPI(id);
      if (response?.data?.success) {
        return response.data.data;
      } else {
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


  async function fetchCommunityPosts(id: string | number) {
    try {
      const response = await getCommunityPostsAPI(id);
      if (response?.data?.success) {
        return response.data.data;
      } else {
        return []
      }
    } catch (error: any) {
      handleAPIErrors(error);
    }
    
  }
  return {
    data,
    error,
    isLoading,
    posts,
    postsLoading,
    notFound,
    refetchDetails: refetch,
  };
}

export default useFetchCommunityDetails;
