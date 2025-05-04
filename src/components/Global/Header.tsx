"use client"

import {MessageCircle, Bell, Home, ChevronRight} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import useFetchUser from "@/hooks/useFetchUser";
import NotificationsDrawer from "@/featuers/Profile/components/NotificatoinsDrawer";
import {useFetchNotifications} from "@/featuers/Profile/hooks/useFetchNotifications";

function Header() {
    const router = useRouter();
    const {data} = useFetchUser();
    const {notifications, openNotifications, setOpenNotifications, setOptimisticNotifications,optimisticNotifications} = useFetchNotifications(data?.id)


    return (
        <header
            className="px-6 py-4 rounded-tl-2xl border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 w-full flex items-center justify-between shadow-sm">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                <Link
                    href="/dashboard"
                    className="flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    <Home className="h-4 w-4 mr-1"/>
                    <span>Home</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-neutral-400 dark:text-neutral-600"/>
                <span className="text-neutral-800 dark:text-neutral-200 font-medium">
          Dashboard
        </span>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">

            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
                <button
                    className={cn(
                        "relative p-2 rounded-full transition-all",
                        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        "text-neutral-600 dark:text-neutral-400",
                        "hover:text-emerald-600 dark:hover:text-emerald-400",
                        "border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                    )}
                    onClick={() => router.push("/chats")}
                >
                    <MessageCircle className="h-5 w-5"/>
                    <span className="absolute top-0 right-0 h-2 w-2 bg-emerald-500 rounded-full"></span>
                </button>

                <button
                    className={cn(
                        "relative p-2 rounded-full transition-all",
                        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        "text-neutral-600 dark:text-neutral-400",
                        "hover:text-emerald-600 dark:hover:text-emerald-400",
                        "border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                    )}
                    onClick={() => setOpenNotifications(true)}
                >
                    <Bell className="h-5 w-5"/>
                    <span className="absolute top-0 right-0 h-2 w-2 bg-emerald-500 rounded-full"></span>
                </button>
            </div>
            <NotificationsDrawer openDrawer={openNotifications} optimisticNotifications={optimisticNotifications}
                                 setOpenDrawer={setOpenNotifications} setOptimisticNotifications={setOptimisticNotifications}/>
        </header>
    );
}

export default Header;
