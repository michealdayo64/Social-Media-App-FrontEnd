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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function HomePage() {
  const { handShowSettings, showSetting } = useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  //const dispatch = useDispatch();
  //var access = isAuth.access;
  

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
