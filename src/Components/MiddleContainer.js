import React from "react";
import "../Components/Styles/middlecontainer.css";
//import profileImg from "./assets/avatar.png";
import { useGlobalContext } from "../context";
import { FaImage, FaVideo, FaXbox } from "react-icons/fa";
import { useSelector } from "react-redux";

function MiddleContainer() {
  const { openModal } = useGlobalContext();
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
          <div className="stream">
            <FaVideo />
            <span>Video Stream</span>
          </div>
          <div>
            <FaImage />
            <span>Img/Video</span>
          </div>
          <div>
            <FaXbox />
            <span>Emoji</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleContainer;
