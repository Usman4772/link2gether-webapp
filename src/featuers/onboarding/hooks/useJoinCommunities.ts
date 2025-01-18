import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { joinCommunitiesAPI } from "../apis/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useJoinCommunities() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [joined, setJoined] = useState<string[]>([]);
  const router = useRouter();
  async function joinCommunities(data: string[]) {
    try {
      setBtnLoading(true);
      const response = await joinCommunitiesAPI(data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        router.push("/");
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setBtnLoading(false);
    }
  }

  function addCommunity(id: string) {
    if (joined.includes(id)) {
      setJoined((prev) => {
        return prev.filter((item) => item !== id);
      });
      return;
    }
    setJoined((prev) => {
      return [...prev, id];
    });
  }
  return { joinCommunities, btnLoading, joined, addCommunity };
}

export default useJoinCommunities;
