"use client";

import Loading from "@/components/Global/Loading";
import ProfilePicture from "@/components/Global/ProfilePicture";
import type { UserProps } from "@/featuers/Dashboard/components/Header";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import useFetchUserDetails from "../hooks/useFetchUserDetails";
import SavedPost from "./SavedPost";
import NoSavedItems from "./NoSavedItems";
import UserPost from "./UserPost";
import CustomButton from "@/components/Global/CustomButton";
import { useRouter } from "next/navigation";

export default function UserDetails({ id }: { id: string }) {
  const { data, dataLoading, posts, postsLoading } = useFetchUserDetails(id);
  const router = useRouter();
  if (dataLoading) return <Loading />;
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <ProfilePicture
              className="w-full h-full object-cover"
              avatar={data?.profileImage!}
              onUpload={(param) => {}}
              isAdmin={false}
              defaultImage={"/default-user.jpeg"}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 group">
            <h2 className="text-2xl font-medium">{data?.username}</h2>
          </div>
          <div className="flex items-center gap-2 group">
            <p className="text-gray-500">{data?.email}</p>
          </div>
        </div>
        <CustomButton
          variant={"ghost"}
          text="Message"
          onClick={() => router.push(`/chat/${data?.id}`)}
        />
      </div>
      <Tabs activeKey={"posts"} className="user-profile-tabs">
        <TabPane tab="Posts" key="posts">
          {false ? (
            <Loading />
          ) : (
            <div className="flex flex-col gap-4">
              {posts && posts?.length > 0 ? (
                posts.map((item: any) => (
                  <UserPost data={item} className="w-full" key={item?.id} />
                ))
              ) : (
                <NoSavedItems
                  title="No Posts"
                  subTitle="This user has not posted anything."
                />
              )}
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}
