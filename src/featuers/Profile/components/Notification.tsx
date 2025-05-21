"use client"

import {useRef} from "react"
import {Trash2, Bell} from "lucide-react"
import {Avatar, Tooltip, Badge} from "antd"
import type {NotificationProps} from "@/featuers/Profile/hooks/useFetchNotifications"

interface Props {
    data: NotificationProps
    deleteNotifications?: (notificationId: string) => void
}

export default function Notification({
                                         data, deleteNotifications = () => {
    }
                                     }: Props) {
    const formRef = useRef<HTMLFormElement>(null)


    const formatTime = (timestamp: string) => {
        if (!timestamp) return ""
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.round(diffMs / 60000)
        const diffHours = Math.round(diffMs / 3600000)
        const diffDays = Math.round(diffMs / 86400000)

        if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
        return date.toLocaleDateString()
    }

    return (
        <div
            className={`w-full py-4 px-4 flex items-start gap-4 rounded-lg border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md 
               "bg-white hover:bg-gray-50"
            `}
        >
            <Badge color="#1a936f" offset={[-2, 2]}>
                <Avatar
                    size={48}
                    src={data?.avatar}
                    icon={!data?.avatar && <Bell className="text-[#1a936f]"/>}
                    className="flex-shrink-0 border-2 border-gray-100"
                />
            </Badge>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className="text-base font-medium text-gray-800 mb-1 line-clamp-1">{data?.title || "Notification"}</h4>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{formatTime(data?.createdAt)}</span>
                </div>

                <p className="text-sm text-gray-600  mb-1">{data?.body || "You have a new notification"}</p>
            </div>

            <form
                action={() => {
                    deleteNotifications(data?._id)
                }}
                ref={formRef}
                className="ml-2 flex-shrink-0"
            >
                <Tooltip title="Delete notification">
                    <button
                        type="button"
                        onClick={() => formRef.current?.requestSubmit()}
                        className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="w-[1.2rem] h-[1.2rem]"/>
                    </button>
                </Tooltip>
            </form>
        </div>
    )
}
