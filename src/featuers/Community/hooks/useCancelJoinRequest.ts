import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelJoinRequestAPI } from "../api/api";
import toast from "react-hot-toast";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useCancelJoinRequest(id:string|number) {
    const queryClient = useQueryClient()
  

  const { mutateAsync ,isPending,error} = useMutation({
      mutationFn: () => cancelJoinRequest(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['community-details']})
            toast.success(response?.message)
      },
      onError: (error) => {
        handleAPIErrors(error)
      }
  });
    async function cancelJoinRequest(id:string|number){ 
        const response = await cancelJoinRequestAPI(id)
        if (response?.data?.success) {
            return response?.data
        }

    }

    return {
      cancelJoinRequest: mutateAsync,
      cancelRequestBtnLoading: isPending,
      error,
    };

}

export default useCancelJoinRequest