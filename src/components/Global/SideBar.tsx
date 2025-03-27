"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  IconBrandTabler,
  IconMenu2,
  IconSettings,
  IconArrowLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/useAppSelector";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";
import { cn } from "@/lib/utils";
import Header from "./Header";
import { usePathname } from "next/navigation";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const dispatch = useAppDispatch();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (props: any) => (
        <IconBrandTabler
          className={cn("h-5 w-5 flex-shrink-0", props.className)}
        />
      ),
    },
    {
      label: "Feed",
      href: "/feed",
      icon: (props: any) => (
        <IconBrandTabler
          className={cn("h-5 w-5 flex-shrink-0", props.className)}
        />
      ),
    },
    {
      label: "Create a community",
      href: "#",
      onClick: () => {
        dispatch(setOpenCreateCommunityModal(true));
      },
      icon: (props: any) => (
        <GoPlus className={cn("h-5 w-5 flex-shrink-0", props.className)} />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (props: any) => (
        <IconSettings
          className={cn("h-5 w-5 flex-shrink-0", props.className)}
        />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (props: any) => (
        <IconArrowLeft
          className={cn("h-5 w-5 flex-shrink-0", props.className)}
        />
      ),
    },
  ];

  useEffect(() => {
    console.log('pathname', pathname);
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ width: open ? "250px" : "80px" }}
        animate={{ width: open ? "250px" : "80px" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={cn(
          "bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700",
          "flex flex-col py-6 transition-all duration-300 relative"
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
                <div className="h-6 w-7 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm" />
                <span className="text-lg font-semibold dark:text-white">
                 Link To Gether
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(!open)}
            className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-full transition-colors"
          >
            <IconChevronRight
              className={cn(
                "h-5 w-5 transition-transform",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow overflow-y-auto px-3">
          {links.map((link, idx) => {
            const isActive = link.href !== "#" && activeLink.startsWith(link.href);
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  onClick={link.onClick}
                  className={cn(
                    "flex items-center p-3 rounded-lg mb-2 group",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white",
                    // Active link styles
                    isActive && "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                    isActive && "font-semibold"
                  )}
                >
                  <link.icon
                    className={cn(
                      "mr-3 transition-colors group-hover:text-black dark:group-hover:text-white",
                      open ? "" : "mx-auto",
                      // Active link icon color
                      isActive && "text-green-600 dark:text-green-400"
                    )}
                  />
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
            href="#"
            className={cn(
              "flex items-center p-3 rounded-lg",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <Image
              src="/art.jpg"
              className="h-8 w-8 rounded-full mr-3"
              width={50}
              height={50}
              alt="Avatar"
            />
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <p className="text-sm font-medium dark:text-white">
                    Manu Arora
                  </p>
                  <p className="text-xs text-neutral-500">Administrator</p>
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