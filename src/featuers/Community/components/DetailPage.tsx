"use client";
import Post from "@/featuers/Feed/components/Post";
import useFetchCommunityDetails from "../hooks/useFetchCommunityDetails";
import DetailPageHeader from "./DetailPageHeader";
import DetailSidebar from "./DetailSidebar";
import Loading from "@/components/Global/Loading";
import NotFound from "@/components/Global/NotFound";
import type { CommunityPostsProps } from "@/utils/backend/modules/auth/types/community.types";
import NoPostsFound from "@/featuers/Post/components/NoPostsFound";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function DetailPage({ id }: { id: number | string }) {
  const { posts, data, isLoading, notFound, postsLoading } =
    useFetchCommunityDetails(id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center">
        <NotFound text={notFound} />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl min-h-full flex flex-col items-center justify-start py-6 px-4 sm:px-6">
        {/* Header with animation */}
        {mounted && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DetailPageHeader id={id} data={data} />
          </motion.div>
        )}

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row justify-between w-full gap-6 relative py-6">
          {/* Posts column */}
          <motion.div
            className="w-full lg:w-[65%] h-auto flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {postsLoading ? (
              <div className="w-full flex justify-center py-12">
                <Loading />
              </div>
            ) : posts && posts?.length > 0 ? (
              posts?.map((post: CommunityPostsProps, index: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Post
                    data={post}
                    className="w-full"
                    isAdmin={data?.isAdmin}
                    isMode={data?.isMode}
                    communityDetails={{
                      id: data?.id,
                      community_name: data?.community_name,
                      avatar: data?.avatar,
                      createdBy: data?.createdBy?.id,
                    }}
                    communityId={id}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <NoPostsFound communityName={data?.community_name} />
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="w-[35%] sticky top-6 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <DetailSidebar data={data} id={id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
