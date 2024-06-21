import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
  name: "friend",
  initialState: {
    users: null,
    friend_request: 0,
    total_friends: 0,
    msg: null,
  },
  reducers: {
    loadAllUsers: (state, action) => {
      return {
        ...state,
        users: action.payload.msg,
      };
    },
    loadTotalFriendRequest: (state, action) => {
      return {
        ...state,
        total_friend_request: action.payload.msg,
      };
    },
    loadTotalFriends: (state, action) => {
      return {
        ...state,
        total_friends: action.payload.msg,
      };
    },
    send_request: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        users: action.payload.data,
      };
    },
    accept_request: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        users: action.payload.data,
      };
    },
    decline_request: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        users: action.payload.data,
      };
    },
    cancel_request: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        users: action.payload.data,
      };
    },
    remove_friend: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        users: action.payload.data,
      };
    },
  },
});

export const {
  loadAllUsers,
  loadTotalFriendRequest,
  loadTotalFriends,
  send_request,
  accept_request,
  decline_request,
  cancel_request,
  remove_friend,
} = friendSlice.actions;

export default friendSlice.reducer;
