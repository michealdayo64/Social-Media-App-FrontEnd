import { createSlice } from "@reduxjs/toolkit";

export const socialSlice = createSlice({
  name: "social",
  initialState: {
    allpost: null,
    allcomment: null,
    msg_post: null,
    msg_comment: null,
    userLikePost: null,
    userlikeMsg: null
  },
  reducers: {
    loadAllPost: (state, action) => {
      return {
        ...state,
        allpost: action.payload.post_list,
        msg_post: action.payload.msg,
      };
    },
    loadCommentById: (state, action) => {
      return {
        ...state,
        allcomment: action.payload.comment_list,
        msg_comment: action.payload.msg,
      };
    },
    loadUserLikePostId: (state, action) =>{
      return{
        ...state,
        userLikePost: action.payload.like_count,
        userlikeMsg: action.payload.msg
      }
    }
  },
});

export const { loadAllPost, loadCommentById, loadUserLikePostId } = socialSlice.actions;

export default socialSlice.reducer;
