"use client"

import type React from "react"
import { BellOff } from "lucide-react"
import Notification from "@/featuers/Profile/components/Notification"
import type { NotificationProps } from "@/featuers/Profile/hooks/useFetchNotifications"
import { useDeleteNotifications } from "@/featuers/Profile/hooks/useDeleteNotifications"
import CustomButton from "@/components/Global/CustomButton";

export default function NotificationsBox({
                                             notifications,
                                             setNotifications,
                                         }: {
    notifications: any
    setNotifications: React.Dispatch<React.SetStateAction<any>>
}) {
    const { deleteNotifications } = useDeleteNotifications()

    return (
        <div className="w-full flex flex-col gap-2 max-h-[70vh] overflow-y-auto scrollbar-hide rounded-lg">
            {notifications && notifications?.length > 0 ? (
                notifications.map((notification: NotificationProps) => (
                    <Notification key={notification?._id} data={notification} deleteNotifications={deleteNotifications} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#e6f7f1] flex items-center justify-center mb-4">
                        <BellOff className="h-8 w-8 text-[#1a936f] opacity-70" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications</h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                        You don't have any notifications at the moment. We'll notify you when something important happens.
                    </p>
                </div>
            )}
        </div>
    )
}

export function NotificationsTitle({notifications}:{notifications:NotificationProps[]}) {
    const {deleteNotifications}=useDeleteNotifications()
    return (
        <div className="flex items-center justify-between gap-2 py-3 px-1 border-b border-gray-100 mb-2">
            <h2 className="font-semibold text-gray-800">Notifications</h2>

            {notifications.length>0 && <CustomButton onClick={()=>deleteNotifications("all")} text={"Clear All"} variant={"primary"} size={"sm"}/>}
        </div>
    )
}
