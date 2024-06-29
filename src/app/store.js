import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux_folder/authSlice";
import friendSlice from "../redux_folder/friendSlice";
import socialSlice from "../redux_folder/socialSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    friend: friendSlice,
    social: socialSlice
  },
});
