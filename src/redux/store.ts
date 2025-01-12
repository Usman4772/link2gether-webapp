import { configureStore } from "@reduxjs/toolkit";
import communitiesReducer from "./Slices/communitySlice";

export const store = configureStore({
  reducer: {
    community: communitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
