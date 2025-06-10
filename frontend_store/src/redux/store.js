import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // 👈 import your slice

const store = configureStore({
  reducer: {
    user: userReducer, // 👈 add reducer to store
  },
});

export default store;
