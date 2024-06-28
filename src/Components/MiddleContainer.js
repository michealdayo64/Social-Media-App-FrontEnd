import React from "react";
import "../Components/Styles/middlecontainer.css";
import { useGlobalContext } from "../context";
import { FaImage, FaVideo, FaXbox } from "react-icons/fa";
import { useSelector } from "react-redux";
import AllPost from "./AllPost";

function MiddleContainer() {
  const { openModal, openModalWithPhoto, openModalWithVideo } =
    useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  const userData = isAuth.user;

  return (
    
      <div className="middle-container">
        <div className="post-content">
          <div className="img-input">
            <img src={userData?.profile_pic} alt="avatar-img" />

            <button onClick={openModal}>What's on your mind?</button>
          </div>
          <br></br>
          <hr></hr>
          <div className="img-video">
            <div className="stream" onClick={openModalWithVideo}>
              <FaVideo />
              <span>Video</span>
            </div>
            <div onClick={openModalWithPhoto}>
              <FaImage />
              <span>Image</span>
            </div>
            <div>
              <FaXbox />
              <span>Emoji</span>
            </div>
          </div>
        </div>
        <br />
        <div>
          <AllPost />
        </div>
      </div>
      
      
  
  );
}

export default MiddleContainer;
