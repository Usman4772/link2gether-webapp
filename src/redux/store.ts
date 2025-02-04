import { configureStore } from "@reduxjs/toolkit";
import communitiesReducer from "./Slices/communitySlice";
import createCommunityReducer from "./Slices/create.community.slice";

export const store = configureStore({
  reducer: {
    community: communitiesReducer,
    createCommunity: createCommunityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
