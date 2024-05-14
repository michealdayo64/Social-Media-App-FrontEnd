import React, { useState } from "react";
import "../Components/Styles/loginpage.css";
import { Link, Navigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { signIn, setIsLoading } from "../features/counter/authSlice";
import { useSelector, useDispatch } from "react-redux";

function LoginPage() {
  const loginMessage = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
  const [getEmailInput, setEmailInput] = useState("");
  const [getPasswordInput, setPasswordInput] = useState("");

  const handlePassBtn = (e) => {
    e.preventDefault();
    setViewPassword(!viewPassword);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    const emailInput = e.target.value.trim();
    if (emailInput.length > 0) {
      setEmailInput(emailInput);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const passwordInput = e.target.value.trim();
    if (passwordInput.length > 0) {
      setPasswordInput(passwordInput);
    }
  };

  const submitLoginButton = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading());
    const url = "http://127.0.0.1:8000/account/login_api/";
    const response = await fetch(url, {
      body: JSON.stringify({
        email: getEmailInput,
        password: getPasswordInput,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch(signIn(data));
    setEmailInput("");
    setPasswordInput("");
  };

  if (loginMessage.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="log-container">
      <div className="log-content">
        <h2>Log In</h2>
        <span>
          Are you new here?{" "}
          <Link to="/register" className="sign">
            Sign Up here
          </Link>
        </span>
        <form onSubmit={submitLoginButton}>
          <input
            type="email"
            placeholder="@ Email address"
            onChange={handleChangeEmail}
          />
          <div className="pass-set">
            {viewPassword ? (
              <FaEyeSlash className="pass-eye" onClick={handlePassBtn} />
            ) : (
              <IoEyeSharp className="pass-eye" onClick={handlePassBtn} />
            )}
            <input
              type={viewPassword ? "text" : "password"}
              placeholder="Password (18+ Character)"
              onChange={handleChangePassword}
            />
          </div>
          <br />
          <div className="signin">
            <button>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
