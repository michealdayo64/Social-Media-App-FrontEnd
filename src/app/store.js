import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux_folder/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
