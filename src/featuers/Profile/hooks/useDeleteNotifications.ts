import {handleAPIErrors} from "@/utils/frontend/handleErrors";
import {deleteNotificationAPI} from "../api/api";
import toast from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";
import React from "react";

export function useDeleteNotifications({setOptimisticNotifications}:{setOptimisticNotifications:React.Dispatch<React.SetStateAction<any>>}) {
    const queryClient = useQueryClient()

    async function deleteNotifications(notificationId:string) {
        try {
            //remove notification optimistically here.
            setOptimisticNotifications((prev:any) =>{
                if(notificationId=="all"){
                    return []
                }
                return prev.filter((notification:any) => {
                    console.log(notification?._id,notificationId)
                    console.log(notification?._id==notificationId,'equal?')
                    return (
                        notification?._id !== notificationId
                    )
                })
            } )

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