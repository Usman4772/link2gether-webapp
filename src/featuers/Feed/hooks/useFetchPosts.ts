import { useQuery } from "@tanstack/react-query";
import { fetchAllPostsAPI } from "../api/api";
import {useState} from "react"
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { CommunityPostsProps } from "@/utils/backend/modules/auth/types/community.types";
function useFetchPosts() {
  const { data, error, isLoading, refetch } = useQuery<CommunityPostsProps[] | []>({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
    initialData: [],
  });
const [loading,setLoading]=useState(true)
  async function getAllPosts() {
    try {
      setLoading(true)
      const response = await fetchAllPostsAPI();
      if (response.data?.success) {
        return response?.data?.data;
      }
      return response?.data?.data;
    } catch (error: any) {
      handleAPIErrors(error);
      throw new Error(error?.response?.data);
    }finally{
      setLoading(false)
    }
  }
  return { data: data || [], error, isLoading:loading, refetch };
}

export default useFetchPosts;
