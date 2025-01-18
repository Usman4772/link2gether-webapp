import {
  CommunitiesDataType,
  RecommendedCommunityType,
} from "@/utils/backend/modules/auth/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  recommendedCommunities: RecommendedCommunityType[];
} = {
  recommendedCommunities: [],
};

const CommunitiesSlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addRecommendedCommunities: (state, action) => {
      const data: CommunitiesDataType[] = action.payload;
      const response = data?.map((data) => {
        return {
          id: data?.id,
          community_name: data?.community_name,
          membersCount: data?.memberCount,
          displayPic: data?.displayPic,
          content: data?.description,
        };
      });
      state.recommendedCommunities = response;
    },
  },
});

export const { addRecommendedCommunities } = CommunitiesSlice.actions;
export default CommunitiesSlice.reducer;
