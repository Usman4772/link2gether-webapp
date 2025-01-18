"use client";
import { ExpandableCards } from "@/components/Global/ExpandableCards";
import MaskButton from "@/components/Global/MaskButton";
import SubHeading from "@/components/Global/SubHeading";
import useGetRecommended from "../hooks/useGetRecommended";
import useJoinCommunities from "../hooks/useJoinCommunities";
import SearchBar from "./SearchBar";
import Loading from "@/components/Global/Loading";

function Communities() {
  const { data, pageLoading, setText } = useGetRecommended();
  const { joinCommunities, btnLoading, joined, addCommunity } =
    useJoinCommunities();
  if (pageLoading) return <Loading />;
  return (
    <div className="w-screen min-h-screen bg-[#F7F8FA] flex items-start justify-center pl-36 pr-96 py-12 ">
      <div className="flex items-start justify-start flex-col min-h-[20%]  w-full  gap-2 px-4 ">
        <div className="w-full  flex justify-between items-center">
          <SubHeading
            text="Add Community"
            className="
        !mx-0 py-0 "
          />
          <MaskButton
            text="Continue"
            onClick={() => {
              joinCommunities(joined);
            }}
            loading={btnLoading}
          />
        </div>
        <SearchBar setText={setText} />
        <ExpandableCards
          cards={data}
          okText="Join"
          onClick={addCommunity}
          joined={joined}
        />
      </div>
    </div>
  );
}

export default Communities;
