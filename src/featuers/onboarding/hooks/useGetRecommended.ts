import { getRecommendedCommunities } from "@/utils/backend/modules/auth/services/user.services.";
import { useEffect, useState } from "react";
import { getRecommendedCommunitiesAPI } from "../apis/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useGetRecommended() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommended = async () => {
    try {
      setLoading(true);
      const response = await getRecommendedCommunitiesAPI();
      if (response?.data?.success) {
        const data = response?.data?.data.map((data: any) => {
          return {
            id: data?._id,
            community_name: data?.community_name,
            membersCount: data?.memberCount,
            displayPic: data?.displayPic,
            content: data?.description,
          };
        });
        setData(data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommended();
  }, []);
  return {
    data,
    loading,
  };
}

export default useGetRecommended;
