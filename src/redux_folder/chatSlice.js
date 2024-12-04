import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatFriends: null,
  },

  reducers: {
    loadChatFriends: (state, action) => {
      return {
        ...state,
        chatFriends: action.payload.m_and_f,
      };
    },
  },
});
