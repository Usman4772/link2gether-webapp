import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getJoinRequestsAPI, getMembersAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useFetchCommunityMembers(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["community-members", id],
    queryFn: getMembers,
  });

  async function getMembers() {
    try {
      const response = await getMembersAPI(id);
      if (response?.data?.success) {
        return response?.data?.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  return { data, isLoading };
}

export default useFetchCommunityMembers;
