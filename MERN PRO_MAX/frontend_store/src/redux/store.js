// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';

// // Example reducer (create your own slice or reducer)
// const rootReducer = (state = {}, action) => {
//   return state;
// };

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // 👈 import your slice

const store = configureStore({
  reducer: {
    user: userReducer, // 👈 add reducer to store
  },
});

export default store;
