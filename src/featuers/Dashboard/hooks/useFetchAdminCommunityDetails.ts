import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAdminCommunityDetailsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useFetchAdminCommunityDetails(id: string) {
  const {data,isLoading} = useQuery({
      queryKey: ["adminCommunityDetails", id],
        queryFn: getAdminCommunityDetails,
  });

  async function getAdminCommunityDetails() {
    try {
      const response = await getAdminCommunityDetailsAPI(id);
      if (response?.data?.success) {
        return response?.data?.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
    }
    
    return { data, isLoading};
}

export default useFetchAdminCommunityDetails;
