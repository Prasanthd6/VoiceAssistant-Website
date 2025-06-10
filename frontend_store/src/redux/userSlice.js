import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
     updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
  },
});

export const { loginSuccess, logout,updateUser } = userSlice.actions;
export default userSlice.reducer;
