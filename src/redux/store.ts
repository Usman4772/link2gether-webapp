import { configureStore } from "@reduxjs/toolkit";
import communitiesReducer from "./Slices/communitySlice";
import createCommunityReducer from "./Slices/create.community.slice";
import userSliceReducer from "./Slices/user.slice";

export const store = configureStore({
  reducer: {
    community: communitiesReducer,
    createCommunity: createCommunityReducer,
    user: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
