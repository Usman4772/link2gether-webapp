import { setUser } from "@/redux/Slices/user.slice";
import axios from "@/utils/config/axios";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./useAppSelector";

function useFetchUser() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  async function fetchUser() {
    try {
      const response = await axios.get("/user/profile");
      if (response?.data?.success) {
        dispatch(setUser(response?.data?.data));
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
