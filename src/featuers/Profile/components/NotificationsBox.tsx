import Notification from "@/featuers/Profile/components/Notification";
import {NotificationProps} from "@/featuers/Profile/hooks/useFetchNotifications";
import {useDeleteNotifications} from "@/featuers/Profile/hooks/useDeleteNotifications";
import React from "react";

export default function NotificationsBox({optimisticNotifications,setOptimisticNotifications}:{optimisticNotifications:any,setOptimisticNotifications:React.Dispatch<React.SetStateAction<any>>}) {
    const {deleteNotifications}=useDeleteNotifications({setOptimisticNotifications})
    return (
        <div className={"w-full flex flex-col gap-1 max-h-full overflow-y-auto scrollbar-hide"}>
            {optimisticNotifications && optimisticNotifications?.length>0 ?
                optimisticNotifications.map((notification:NotificationProps) => <Notification data={notification} deleteNotifications={deleteNotifications}/>)
                :<div>No Notifications</div>}

        </div>
    )
}


export function NotificationsTitle() {
    return (
        <div>Notifications</div>
    )
}

