import { useQuery } from "@tanstack/react-query";
import { getDashboardCommunitiesAPI, getKPIMetricsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useGetDashboardCommunities() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard_communities"],
    queryFn: getDashboardCommunities,
  });

  async function getDashboardCommunities() {
    try {
      const response = await getDashboardCommunitiesAPI();
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

export default useGetDashboardCommunities;
