import React from "react";
import { IoMdCamera } from "react-icons/io";
import "./Styles/photo.css"
import { useGlobalContext } from "../context";

function Photo() {
    const { showPhoto } = useGlobalContext();
  return (
    <div className={showPhoto ? "container" : "container remove-container"}>
      <div className="container-child">
        <IoMdCamera className="one-icon" />
        <span className="add-photo">Add Photos</span>
        <span className="drag-drop">Or drag and drop</span>
      </div>
    </div>
  );
}

export default Photo;
