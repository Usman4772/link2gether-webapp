"use client";
import Post from "@/featuers/Feed/components/Post";
import useFetchCommunityDetails from "../hooks/useFetchCommunityDetails";
import DetailPageHeader from "./DetailPageHeader";
import DetailSidebar from "./DetailSidebar";
import Loading from "@/components/Global/Loading";
import NotFound from "@/components/Global/NotFound";

function DetailPage({ id }: { id: number | string }) {
  const { posts, data, isLoading, notFound,postsLoading } = useFetchCommunityDetails(id);
  if (isLoading) return <Loading />;
  if (notFound) return <NotFound text={notFound} />;
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] min-h-full flex flex-col  items-center justify-start py-2 ">
        <DetailPageHeader id={id} data={data} />
        <div className="flex justify-between w-full  relative py-4">
          <div className="w-[65%] h-auto flex flex-col gap-8">
            {posts && posts?.length > 0 ? (
              posts?.map((post:any) => <Post data={post} />)
            ) : (
              <NotFound text="No Posts Found for this community" />
            )}
          </div>
          <DetailSidebar data={data} id={id} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
