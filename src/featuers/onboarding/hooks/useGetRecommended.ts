import { getRecommendedCommunities } from "@/utils/backend/modules/auth/services/user.services.";
import { useEffect, useState } from "react";
import { getRecommendedCommunitiesAPI } from "../apis/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useRouter } from "next/navigation";

function useGetRecommended() {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();

  const getRecommended = async () => {
    try {
      setPageLoading(true);
      const response = await getRecommendedCommunitiesAPI();
      if (response?.data?.success) {
        const data = response?.data?.data.map((data: any) => {
          return {
            id: data?._id,
            community_name: data?.community_name,
            membersCount: data?.memberCount,
            avatar: data?.avatar,
            content: data?.description,
          };
        });
        setData(data);
      } else if (response?.data?.errors[0]?.onboardingStatus == "completed") {
        router.push("/");
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (text === "") {
      getRecommended();
      return;
    }
    const newData = data.filter((item: any) =>
      item?.community_name.toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  }, [text]);
  useEffect(() => {
    getRecommended();
  }, []);
  return {
    data,
    pageLoading,
    setText,
  };
}

export default useGetRecommended;
