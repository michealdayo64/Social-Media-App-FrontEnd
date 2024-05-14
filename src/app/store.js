import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authSlice from "../features/counter/authSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
  },
});
