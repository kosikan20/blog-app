import { configureStore } from "@reduxjs/toolkit";
import userIDSlice from "../features/userIDSlice";

const store = configureStore({
  reducer: {
    userID: userIDSlice,
  },
});

export default store;
