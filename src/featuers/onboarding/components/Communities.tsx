"use client";
import { ExpandableCards } from "@/components/Global/ExpandableCards";
import { useAppSelector } from "@/hooks/useAppSelector";
import React, { useState } from "react";
import useGetRecommended from "../hooks/useGetRecommended";
import SearchBar from "./SearchBar";
import SubHeading from "@/components/Global/SubHeading";
import { RecommendedCommunityType } from "@/utils/backend/modules/auth/types/types";

function Communities() {
  const { data, loading } = useGetRecommended();
  const [joined, setJoined] = useState<string[]>([]);
  if (loading) return <div>Loading...</div>;
  function handleJoinCommunity(id: string) {
    if (joined.includes(id)) {
      setJoined((prev) => {
        return prev.filter((item) => item !== id);
      });
      return;
    }
    setJoined((prev) => {
      return [...prev, id];
    });
  }

  return (
    <div className="w-screen min-h-screen bg-[#F7F8FA] flex items-center justify-center pl-36 pr-96 py-12">
      <div className="flex items-center justify-center flex-col min-h-[20%] w-full  gap-4 px-4">
        <SubHeading text="Add Community" />
        <SearchBar />
        <ExpandableCards
          cards={data}
          okText="Join"
          onClick={handleJoinCommunity}
          joined={joined}
        />
      </div>
    </div>
  );
}

export default Communities;
