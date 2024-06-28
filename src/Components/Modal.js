import React from "react";
import "../Components/Styles/modal.css";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { BiWorld } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdCamera } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { IoDocumentAttach } from "react-icons/io5";
import { MdSchedule } from "react-icons/md";
import { useSelector } from "react-redux";
import Photo from "./Photo";
import Video from "./Video";
import Attachment from "./Attachment";

function Modal() {
  const {
    isModalOpen,
    closeModal,
    displayPhoto,
    showPhoto,
    displayVideo,
    displayAttachment,
    showVideo,
    showAttachment,
  } = useGlobalContext();
  const authState = useSelector((state) => state.auth);
  const userData = authState.user;
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="top-post">
          <div className="header-post">
            <h3>Create a Post</h3>
            <button className="close-modal-btn" onClick={closeModal}>
              <FaTimes></FaTimes>
            </button>
          </div>
          <hr></hr>
          <div className="profile-post">
            <img src={userData?.profile_pic} alt="profile" />
            <div className="name-visibi">
              <span className="user">{userData?.name}</span>
              <button>
                <BiWorld className="world-arrow" />
                <span>Public</span>
                <IoMdArrowDropdown className="world-arrow" />
              </button>
            </div>
          </div>
          <div className="post">
            <textarea
              placeholder={`Share what's on your mind, ${userData?.name}...`}
            />
          </div>
          {
            showPhoto === true ? <Photo /> :  showVideo ? <Video /> : <Attachment />
          }
        </div>
        <div className="bottom-post">
          <div className="post-icons">
            <IoMdCamera
              className={showPhoto ? "icon-camera" : "all-icons"}
              onClick={displayPhoto}
            />
            <IoVideocam
              className={showVideo ? "icon-video" : "all-icons"}
              onClick={displayVideo}
            />
            <IoDocumentAttach
              className={showAttachment ? "icon-attachment" : "all-icons"}
              onClick={displayAttachment}
            />
          </div>
          <div className="post-post">
            <button className="schdule">
              <MdSchedule className="all-icons" />
              <IoMdArrowDropdown />
            </button>
            <button className="post-button">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
