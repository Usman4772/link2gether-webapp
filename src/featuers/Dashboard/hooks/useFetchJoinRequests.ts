import { useQuery } from "@tanstack/react-query";
import React from "react";
import {  getJoinRequestsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";


function useFetchJoinRequests(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["join-requests", id],
    queryFn: getJoinRequests,
  });

  async function getJoinRequests() {
    try {
      const response = await getJoinRequestsAPI(id);
      if (response?.data?.success) {
        return response?.data?.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  return { data, isLoading };
}

export default useFetchJoinRequests;
