import {useEffect, useState} from "react";
import {pusherClient} from "@/lib/pusher";
import {useQuery} from "@tanstack/react-query";
import {fetchNotificationsAPI} from "@/featuers/Profile/api/api";
import {handleAPIErrors} from "@/utils/frontend/handleErrors";


export interface NotificationProps {
    title: string,
    body: string,
    avatar: string | null,
    _id: string,
    createdAt: string,
    updatedAt: string,
    userId: string,
}

export function useFetchNotifications(userId: string) {
    const [notifications, setNotifications] = useState<NotificationProps[] | []>([]);
    const [openNotifications, setOpenNotifications] = useState(false);

    const {data, isLoading} = useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchOnMount: false, // Only fetch on initial mount
    })


    async function fetchNotifications() {
        try {
            const response = await fetchNotificationsAPI()
            if (response?.data?.success) {
                setNotifications(response?.data?.data);
                return response?.data?.data;
            }
            return []
        } catch (error) {
            handleAPIErrors(error)
        }


    }

    useEffect(() => {
        fetchNotifications()
    }, []);


    useEffect(() => {
        if (!userId) return;
        pusherClient.subscribe(userId)
        console.log('subscribing to ', userId)

        function handleIncomingNotification(data: any) {
            console.log('incoming notification', data)
            setNotifications(prevNotifications => {
                // @ts-ignore
                if (prevNotifications.includes(data?.data?._id)) return prevNotifications;
                return [
                    data?.data,
                    ...prevNotifications
                ]
            })
        }

        pusherClient.bind("incoming-notification", handleIncomingNotification)
        return () => {
            pusherClient.unsubscribe(userId);
            pusherClient.unbind("incoming-notification", handleIncomingNotification);
        };
    }, [userId]);

    return {
        notifications,
        openNotifications,
        isLoading,
        setNotifications,
        setOpenNotifications,
    }

}