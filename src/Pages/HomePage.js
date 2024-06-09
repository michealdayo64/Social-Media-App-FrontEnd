//import React, { useEffect, useState, useRef } from "react";
import "../Components/Styles/homepage.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import LeftContainer from "../Components/LeftContainer";
import RightContainer from "../Components/RightContainer";
import MiddleContainer from "../Components/MiddleContainer";
import Modal from "../Components/Modal";
import SettingsMenu from "../Components/SettingsMenu";
import { useGlobalContext } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { loadAllUsers } from "../redux_folder/friendSlice";
import { useEffect } from "react";

function HomePage() {
  const { handShowSettings, showSetting } = useGlobalContext();
  const auth = useSelector((state) => state.auth);
  var access = auth.access
  //var access = JSON.parse(localStorage.getItem("access"));
  const dispatch = useDispatch();

  useEffect(() => {
    //var access = JSON.parse(localStorage.getItem("access"));
    const url = "http://127.0.0.1:8000/friend/get_all_user/";
    const getAllUser = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(loadAllUsers(data));
      }
    };
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={showSetting ? handShowSettings : null}>
      <Navbar />
      <SettingsMenu />
      <Sidebar />
      <div className="home-container">
        <LeftContainer />
        <MiddleContainer />
        <RightContainer />
        <Modal />
      </div>
    </div>
  );
}

export default HomePage;
