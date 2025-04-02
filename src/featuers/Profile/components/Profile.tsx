"use client";
import React from "react";
import UserDetails from "./UserDetails";

import CustomButton from "@/components/Global/CustomButton";
import ProfileTabs from "./ProfileTabs";
import useFetchUser from "@/hooks/useFetchUser";
import Loading from "@/components/Global/Loading";

function Profile() {
  const { data, isLoading } = useFetchUser();
  if (isLoading) return <Loading />;
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-start">
      <UserDetails data={data} />
    </div>
  );
}

export default Profile;
