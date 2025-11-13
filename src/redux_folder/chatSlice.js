import { createSlice } from "@reduxjs/toolkit";

export const PrivateChatSlice = createSlice({
  name: "private_chat",
  initialState: {
    chatFriends: null,
    messages: null,
  },

  reducers: {
    loadPrivateChatFriends: (state, action) => {
      return {
        ...state,
        chatFriends: action.payload.m_and_f,
      };
    },
    loadPrivateChatFriendMessages: (state, action) => {
      console.log("Reducer called with messages:", action.payload.messages);
      return {
        ...state,
        messages: action.payload.messages,
      };
    }
  },
});

export const {
  loadPrivateChatFriends,
  loadPrivateChatFriendMessages,
} = PrivateChatSlice.actions

export default PrivateChatSlice.reducer
