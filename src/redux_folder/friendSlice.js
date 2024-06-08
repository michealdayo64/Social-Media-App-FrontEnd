import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
  name: "friend",
  initialState: {
    users: [],
    friend_request: 0,
    total_friends: 0,
  },
  reducers: {
    loadAllUsers: (state, action) => {
      return {
        ...state,
        users: action.payload.msg,
      };
    },
    loadFriendRequest: (state, action) => {
      return {
        state,
        friend_request: action.payload.msg,
      };
    },
    loadTotalFriends: (state, action) => {
      return {
        state,
        total_friends: action.payload.msg,
      };
    },
  },
});

export const { loadAllUsers, loadFriendRequest, loadTotalFriends } =
  friendSlice.actions;

export default friendSlice.reducer;