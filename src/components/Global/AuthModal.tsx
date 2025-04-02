"use client";

import type React from "react";
import { Lock, LogIn, UserPlus, X } from "lucide-react";
import CustomModal from "./CustomModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector";
import { setOpenLoginModal } from "@/redux/Slices/user.slice";
import { useRouter } from "next/navigation";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { openLoginModal } = useAppSelector((state: any) => state?.user);
  return (
    <CustomModal
      setOpenModal={() => {}}
      openModal={openLoginModal}
      dispatchEvent={true}
      onCancel={() => {
        dispatch(setOpenLoginModal(false));
      }}
      body={<AuthModalBody />}
    />
  );
}

interface AuthModalProps {
  action?: "like" | "comment" | "general";
  onClose?: () => void;
}

function AuthModalBody({ action = "general" }: AuthModalProps) {
  const router = useRouter();

  // Action-specific messages
  const getActionMessage = () => {
    switch (action) {
      case "like":
        return "like this post";
      case "comment":
        return "leave a comment";
      default:
        return "perform this action";
    }
  };

  return (
    <div className="p-6 text-center">
      <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-gradient-to-br from-[#7bf1a8] to-[#1a936f] shadow-lg shadow-green-200">
        <Lock className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Join Link Together
      </h3>

      <p className="text-gray-600 mb-6">
        You need to be logged in to {getActionMessage()}. Join Link Together to
        interact with posts and connect with others.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#7bf1a8] to-[#1a936f] text-white font-medium flex items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Log in
        </button>

        <button
          onClick={() => {
            router.push("/register");
          }}
          className="w-full py-3 px-4 rounded-lg border border-[#1a936f] text-[#1a936f] font-medium flex items-center justify-center hover:bg-[#1a936f]/5 hover:-translate-y-0.5 transition-all duration-200"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Create an account
        </button>
      </div>
    </div>
  );
}
