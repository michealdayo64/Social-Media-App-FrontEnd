import React, { useEffect, useState } from "react";
import "../Components/Styles/registerpage.css";
import { Link, Navigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { signUp, setIsLoading } from "../features/counter/authSlice";
import { useSelector, useDispatch } from "react-redux";

function RegisterPage() {
  const registerMessage = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
  const [getEmailInput, setEmailInput] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [getUsernameInput, setUsernameInput] = useState("");
  const [getPasswordInput, setPasswordInput] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  // handle Password button
  const handlePassBtn = (e) => {
    e.preventDefault();
    setViewPassword(!viewPassword);
  };

  // handle Username Input
  const handleUsernameInput = (e) => {
    e.preventDefault();
    const usernameInput = e.target.value.trim();
    if (usernameInput != null) {
      setUsernameInput(usernameInput);
    }
  };

  // Handle Email Input
  const handleEmailInput = async (e) => {
    e.preventDefault();
    const emailInput = e.target.value.trim();
    setEmailInput(emailInput);
    const url = "http://127.0.0.1:8000/account/verify_email/";
    const response = await fetch(url, {
      body: JSON.stringify({ email: emailInput }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setEmailValid(data["msg"]);
    console.log(data);
  };

  // Handle Password Input
  const handlePasswordInput = (e) => {
    e.preventDefault();
    const passwordInput = e.target.value.trim();
    if (passwordInput != null) {
      setPasswordInput(passwordInput);
    }
  };

  // Handle Submit Button
  const submitBtn = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading())
    const url = "http://127.0.0.1:8000/account/register_api/";
    const response = await fetch(url, {
      body: JSON.stringify({
        username: getEmailInput,
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
    dispatch(signUp(data))
    setPasswordInput("");
    setEmailInput("");
    setUsernameInput("");
    setIsRegistered(true);
  };

  useEffect(() => {
    if (emailValid) {
      console.log(emailValid);
    }
  }, [emailValid]);

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  console.log(registerMessage.signupSuccess, registerMessage.isLoading)

  return (
    <div className="reg-container">
      <div className="reg-content">
        <h2>Sign Up</h2>
        <span>
          Already had an account?{" "}
          <Link to="/login" className="sign">
            Sign In here
          </Link>
        </span>
        <form onSubmit={submitBtn} action="/login">
          <input
            type="text"
            placeholder="Username"
            onChange={handleUsernameInput}
            value={getUsernameInput}
          />

          <input
            type="email"
            placeholder="@ Email address"
            onChange={handleEmailInput}
            value={getEmailInput}
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
              onChange={handlePasswordInput}
              value={getPasswordInput}
            />
          </div>
          <br />
          <span className="acc">{emailValid}</span>
          <div className="signin">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
