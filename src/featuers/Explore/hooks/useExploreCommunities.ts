import React, { useEffect, useState } from "react";
import { fetchExploreCommunitiesAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useExploreCommunities(searchQuery: string | number) {
  const [data, setData] = useState({
    trending: [],
      recommended: [],
    all_communities: [],
  });
  const [loading, setLoading] = useState(false);

  async function fetchExploreCommunities(searchQuery: string | number) {
    setLoading(true);
    try {
      const response = await fetchExploreCommunitiesAPI(searchQuery);
      if (response?.data?.success) {
        setData(response?.data?.data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchExploreCommunities(searchQuery);
  }, [searchQuery]);
  return {
    data,
    loading,
    fetchExploreCommunities,
  };
}

export default useExploreCommunities;
