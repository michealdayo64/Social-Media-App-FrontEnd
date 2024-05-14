import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    loginSuccess: null,
    loginFail: null,
    logoutSuccess: null,
    signupSuccess: null,
    isLoading: false,
    signupFail: null,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    signUp: (state, action) => {
      return {
        ...state,
        signupSuccess: action.payload.msg,
        isAuthenticated: false,
        isLoading: false,
      };
    },
    setIsLoading: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    signIn: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        loginSuccess: payload.msg,
        isLoading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { signUp, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
