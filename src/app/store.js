import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux_folder/authSlice";
import friendSlice from "../redux_folder/friendSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    friend: friendSlice
  },
});
