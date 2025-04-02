"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { MdOutlineTravelExplore as Explore } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/useAppSelector";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";
import { cn } from "@/lib/utils";
import Header from "./Header";
import { usePathname } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import { LayoutDashboard, LogOut, Newspaper, PackagePlus } from "lucide-react";
import useFetchUser from "@/hooks/useFetchUser";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const { data, isLoading } = useFetchUser();
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (props: any) => (
        <LayoutDashboard
          className={cn("h-5 w-5 flex-shrink-0", props.className)}
        />
      ),
    },
    {
      label: "Feed",
      href: "/feed",
      icon: (props: any) => (
        <Newspaper className={cn("h-5 w-5 flex-shrink-0", props.className)} />
      ),
    },
    {
      label: "Create a community",
      href: "#",
      onClick: () => {
        dispatch(setOpenCreateCommunityModal(true));
      },
      icon: (props: any) => (
        <PackagePlus className={cn("h-5 w-5 flex-shrink-0", props.className)} />
      ),
    },
    {
      label: "Explore",
      href: "/explore",
      icon: (props: any) => (
        <Explore className={cn("h-5 w-5 flex-shrink-0", props.className)} />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (props: any) => (
        <LogOut className={cn("h-5 w-5 flex-shrink-0", props.className)} />
      ),
      onClick: async () => {
        await logout();
      },
    },
  ];

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ width: open ? "300px" : "100px" }}
        animate={{ width: open ? "300px" : "100px" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={cn(
          "bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950",
          "border-r border-neutral-200/80 dark:border-neutral-800",
          "flex flex-col py-6 transition-all duration-300 relative",
          "shadow-[0_0_15px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
        )}
      >
        {/* Logo */}
        <div className="px-5 mb-8 flex items-center justify-between">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">LT</span>
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Link Together
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(!open)}
            className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-full transition-colors border border-neutral-200 dark:border-neutral-700 shadow-sm"
          >
            <IconChevronRight
              className={cn(
                "h-4 w-4 transition-transform text-neutral-600 dark:text-neutral-300",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow overflow-y-auto px-3 space-y-1">
          {links.map((link, idx) => {
            const isActive =
              link.href !== "#" && activeLink.startsWith(link.href);
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={link.href}
                  onClick={link.onClick}
                  className={cn(
                    "flex items-center p-3 rounded-xl mb-1 group",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-white dark:hover:bg-neutral-800/70",
                    "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white",
                    "border border-transparent hover:border-neutral-200/80 dark:hover:border-neutral-700/80",
                    "hover:shadow-sm",
                    // Active link styles
                    isActive &&
                      "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
                    isActive &&
                      "border-emerald-200/50 dark:border-emerald-800/30",
                    isActive &&
                      "text-emerald-700 dark:text-emerald-400 font-medium",
                    isActive && "shadow-sm"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-lg mr-3",
                      "bg-white dark:bg-neutral-800 shadow-sm",
                      "border border-neutral-200/80 dark:border-neutral-700",
                      isActive &&
                        "bg-gradient-to-br from-emerald-500 to-teal-600 border-0",
                      open ? "" : "mx-auto"
                    )}
                  >
                    <link.icon
                      className={cn(
                        "transition-colors",
                        "text-neutral-500 dark:text-neutral-400",
                        isActive && "text-white"
                      )}
                    />
                  </div>
                  <AnimatePresence>
                    {open && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="px-3 mt-4">
          <Link
            href="/user/profile"
            className={cn(
              "flex items-center p-3 rounded-xl",
              "bg-white dark:bg-neutral-800/30",
              "border border-neutral-200/80 dark:border-neutral-700/80",
              "hover:shadow-md shadow-sm",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <div className="relative">
              <Image
                src={data?.profileImage || "/default-user.jpeg"}
                className="h-10 w-10 rounded-lg object-cover border-2 border-white dark:border-neutral-700 shadow-sm"
                width={50}
                height={50}
                alt="Avatar"
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3"
                >
                  <p className="text-sm font-medium text-neutral-800 dark:text-white">
                    {data?.username || "User"}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    View profile
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <div className="flex-grow overflow-y-auto bg-neutral-50 dark:bg-neutral-900 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
