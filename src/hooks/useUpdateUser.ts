import axios from "@/utils/config/axios";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadFile } from "antd";
import toast from "react-hot-toast";

interface UpdateUserDetails {
  username?: string;
  email?: string;
  profileImage?:any ;
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserDetails,
      onSuccess: (response: any) => {
          if (response?.data?.success) {
              toast.success(response?.data?.message);
              queryClient.invalidateQueries({ queryKey: ["user"] });
          }
    },
   
  });

  async function updateUserDetails({
    username,
    email,
    profileImage,
  }: UpdateUserDetails) {
    try {
      const formData = new FormData();
      if (username) {
        formData.append("username", username);
      }
      if (email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!regex.test(email)) {
            toast.error("Please enter a valid email address");
          return
        }
        formData.append("email", email);
      }
        if (profileImage) {
       const image= profileImage[0]?.originFileObj;
        formData.append("profileImage", image);
      }
        const response = await axios.put("/user/profile/update", formData);
      return response;
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  return {
    updateUser: mutateAsync,
    loading: isPending,
  };
}

export default useUpdateUser;
