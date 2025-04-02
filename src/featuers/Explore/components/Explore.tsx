"use client";

import Loading from "@/components/Global/Loading";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useExploreCommunities from "../hooks/useExploreCommunities";
import { CommunityCard } from "./CommunityCard";
import NoCommunityPage from "./NoCommunityPage";
import NoSearchResults from "./NoSearchResults";
import { twMerge } from "tailwind-merge";

export interface CommunityCardProps {
  community_name: string;
  avatar: string;
  _id: string;
  onClick?: () => void;
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchValue = useDebounce(searchQuery);
  const { data, loading } = useExploreCommunities(debouncedSearchValue);
  const router = useRouter();

  const handleCommunityClick = (id: string) => {
    router.push(`/community/${id}`);
  };

  if (loading) return <Loading />;
  if (data.recommended.length == 0 && data.trending.length == 0 && !searchQuery)
    return (
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for communities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 bg-gray-100 border-none rounded-xl"
          />
        </div>
        <NoCommunityPage />
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-3xl">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for communities"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 bg-gray-100 border-none rounded-xl"
        />
      </div>

      {!searchQuery ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Trending Communities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data?.trending.map((community: CommunityCardProps) => (
                <CommunityCard
                  _id={community?._id}
                  key={community?._id}
                  community_name={community?.community_name}
                  avatar={community?.avatar}
                  onClick={() => handleCommunityClick(community?._id)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Recommended Communities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data?.recommended.map((community: CommunityCardProps) => (
                <CommunityCard
                  key={community?._id}
                  community_name={community?.community_name}
                  avatar={community?.avatar}
                  _id={community?._id}
                  onClick={() => handleCommunityClick(community?._id)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div
            className={twMerge(
              "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full ",
              data?.all_communities.length == 0
                ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                : ""
            )}
          >
            {data?.all_communities.length > 0 ? (
              data?.all_communities?.map((community: CommunityCardProps) => (
                <CommunityCard
                  _id={community?._id}
                  key={community?._id}
                  community_name={community?.community_name}
                  avatar={community?.avatar}
                  onClick={() => handleCommunityClick(community?._id)}
                />
              ))
            ) : (
              <NoSearchResults searchTerm={searchQuery} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
