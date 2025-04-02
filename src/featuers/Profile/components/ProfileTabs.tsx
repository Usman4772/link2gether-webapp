import { Tabs } from "antd";
import useFetchProfileTabs from "../hooks/useFetchProfileTabs";
import NoCommunitiesCreated from "./NoCommunitiesCreated";
import NoJoinedCommunities from "./NoJoinedCommunities";
import NoSavedItems from "./NoSavedItems";
import Loading from "@/components/Global/Loading";
import SavedPost from "./SavedPost";
import Community from "./Community";
const { TabPane } = Tabs;

function ProfileTabs() {
  const {
    savedPosts,
    joinedCommunities,
    userCommunities,
    loading,
    activeTab,
    setActiveTab,
    refetchSaved,
  } = useFetchProfileTabs();
  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      className="user-profile-tabs"
    >
      <TabPane tab="Saved Posts" key="saved-posts">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4">
            {savedPosts && savedPosts?.length > 0 ? (
              savedPosts.map((item: any) => (
                <SavedPost
                  data={item}
                  className="w-full"
                  refetch={refetchSaved}
                />
              ))
            ) : (
              <NoSavedItems />
            )}
          </div>
        )}
      </TabPane>

      <TabPane tab="Your Communities" key="your-communities">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {userCommunities && userCommunities?.length > 0 ? (
              userCommunities.map((item: any) => (
                <Community data={item} key={item?._id} />
              ))
            ) : (
              <NoCommunitiesCreated />
            )}
          </div>
        )}
      </TabPane>

      <TabPane tab="Joined Communities" key="joined-communities">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {joinedCommunities && joinedCommunities?.length > 0 ? (
              joinedCommunities.map((item: any) => (
                <Community data={item} key={item?._id} />
              ))
            ) : (
              <NoJoinedCommunities />
            )}
          </div>
        )}
        .
      </TabPane>
    </Tabs>
  );
}

export default ProfileTabs;
