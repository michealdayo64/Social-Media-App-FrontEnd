import { createSlice } from "@reduxjs/toolkit";

export const PrivateChatSlice = createSlice({
  name: "private_chat",
  initialState: {
    chatFriends: null,
  },

  reducers: {
    loadPrivateChatFriends: (state, action) => {
      return {
        ...state,
        chatFriends: action.payload.m_and_f,
      };
    },
  },
});

export const {
  loadPrivateChatFriends
} = PrivateChatSlice.actions

export default PrivateChatSlice.reducer
