import {handleAPIErrors} from "@/utils/frontend/handleErrors";
import {deleteNotificationAPI} from "../api/api";
import toast from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";
import React from "react";


interface Props{
    setOptimisticNotifications:React.Dispatch<React.SetStateAction<any>>
}

export function useDeleteNotifications() {
    const queryClient = useQueryClient()

    async function deleteNotifications(notificationId:string) {
        try {


            const response = await deleteNotificationAPI(notificationId)
            if (response?.data?.success) {
                toast.success(response?.data.message);
                await queryClient.invalidateQueries({queryKey: ["notifications"]})

            }
        } catch (e) {
            handleAPIErrors(e)
        }
    }



return {
        deleteNotifications
}

}