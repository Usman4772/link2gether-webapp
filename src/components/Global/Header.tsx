"use client"

import { MessageCircle, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useFetchUser from "@/hooks/useFetchUser"
import NotificationsDrawer from "@/featuers/Profile/components/NotificatoinsDrawer"
import { useFetchNotifications } from "@/featuers/Profile/hooks/useFetchNotifications"
import BreadCrumbs from "@/components/Global/Breadcrumbs"
import  SearchOverlay  from "@/components/Global/SearchOverlay"

function Header() {
    const router = useRouter()
    const { data } = useFetchUser()
    const { openNotifications, setOpenNotifications, notifications, setNotifications } = useFetchNotifications(data?.id)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <>
            <header className="px-6 py-4 rounded-tl-2xl border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 w-full flex items-center justify-between shadow-sm">
                {/* Breadcrumbs */}
                <BreadCrumbs />

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-8">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all",
                            "bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                            "hover:border-[#1a936f] dark:hover:border-[#1a936f]",
                            "text-neutral-500 dark:text-neutral-400",
                            "hover:text-[#1a936f] dark:hover:text-[#1a936f]",
                            "focus:outline-none focus:ring-2 focus:ring-[#1a936f]/20",
                        )}
                    >
                        <Search className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm text-left flex-1">Search communities, posts, users...</span>
                        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300 rounded border border-neutral-300 dark:border-neutral-500">
                            ⌘K
                        </kbd>
                    </button>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                    <button
                        className={cn(
                            "relative p-2 rounded-full transition-all",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                            "text-neutral-600 dark:text-neutral-400",
                            "hover:text-emerald-600 dark:hover:text-emerald-400",
                            "border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700",
                        )}
                        onClick={() => router.push("/chats")}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-emerald-500 rounded-full"></span>
                    </button>

                    <button
                        className={cn(
                            "relative p-2 rounded-full transition-all",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                            "text-neutral-600 dark:text-neutral-400",
                            "hover:text-emerald-600 dark:hover:text-emerald-400",
                            "border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700",
                        )}
                        onClick={() => setOpenNotifications(true)}
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center text-sm h-4 w-4 p-3 text-white bg-emerald-500 rounded-full">
              {notifications?.length}
            </span>
                    </button>
                </div>

                <NotificationsDrawer
                    openDrawer={openNotifications}
                    notifications={notifications}
                    setOpenDrawer={setOpenNotifications}
                    setNotifications={setNotifications}
                />
            </header>

            {/* Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    )
}

export default Header
