import { createSlice } from "@reduxjs/toolkit";

const userIDSlice = createSlice({
  name: "userID",
  initialState: {
    userID: "",
  },
  reducers: {
    deleteUserID: (state, action) => {
      state.userID = "";
    },
    addUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export default userIDSlice.reducer;
export const { addUserID, deleteUserID } = userIDSlice.actions;
