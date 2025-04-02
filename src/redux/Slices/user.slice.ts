import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "user",
  profileImage: null,
  openLoginModal: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, profileImage } = action.payload;
      state.id = id;
      state.username = username;
      state.profileImage = profileImage;
    },
    resetUser: (state) => {
      state.id = null;
      state.username = "user";
      state.profileImage = null;
    },
    setOpenLoginModal: (state, action) => {
      state.openLoginModal = action.payload;
    },
  },
});

export const { setUser, resetUser, setOpenLoginModal } = userSlice.actions;
export default userSlice.reducer;
