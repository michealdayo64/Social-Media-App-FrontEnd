import React from "react";
import "../Components/Styles/modal.css";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { BiWorld } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";

function Modal() {
  const { isModalOpen, closeModal } = useGlobalContext();
  const authState = useSelector((state) => state.auth);
  const userData = authState.user;
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="header-post">
          <h3>modal content</h3>
          <button className="close-modal-btn" onClick={closeModal}>
            <FaTimes></FaTimes>
          </button>
        </div>
        <hr></hr>
        <div className="profile-post">
          <img src={userData?.profile_pic} alt="profile" />
          <div className="name-visibi">
            <span>{userData?.name}</span>
            <button>
              <BiWorld />
              <span>Public</span>
              <IoMdArrowDropdown />
            </button>
          </div>
        </div>
        <div className="post">
          <textarea />
        </div>
      </div>
    </div>
  );
}

export default Modal;
