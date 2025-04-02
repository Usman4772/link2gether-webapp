"use client";
import AuthModal from "@/components/Global/AuthModal";
import Loading from "@/components/Global/Loading";
import PublicHeader from "@/components/Global/PublicHeader";
import Post from "@/featuers/Feed/components/Post";
import CommentSection from "@/featuers/Post/components/CommentSection";
import useFetchPostDetails from "@/featuers/Post/hook/useFetchPostDetails";

function Page({ params }: any) {
  const { data, isLoading } = useFetchPostDetails(params.id);
  if (isLoading) return <Loading />;
  return (
    <>
      <PublicHeader/>
      <div className="flex flex-col gap-1 p-10 relative pt-20">
        <Post
          data={data}
          communityDetails={data?.community}
          className="w-full bg-gray-100"
          isPublicPage={true}
        />
        <CommentSection postId={params.id} isPublicPage={true} />
        <AuthModal/>
      </div>
    </>
  );
}

export default Page;
