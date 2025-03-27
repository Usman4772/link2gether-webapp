import axios from "@/utils/config/axios";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";

function useFetchUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  async function fetchUser() {
    try {
      const response = await axios.get("/user/profile");
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

export default useFetchUser;
