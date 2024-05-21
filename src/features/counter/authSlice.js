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
    signUpFailed:(state, action) =>{
      return{
        ...state,
        signupFail: action.payload.msg,
        isLoading: false,
        isAuthenticated: false,
      }
    },
    setIsLoading: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    signIn: (state, action) => {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        loginSuccess: action.payload.msg,
        isLoading: false,
      };
    },
    signInFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginFail: action.payload.msg,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { signUp, setIsLoading, signIn, signInFailed, signUpFailed } = authSlice.actions;

export default authSlice.reducer;
