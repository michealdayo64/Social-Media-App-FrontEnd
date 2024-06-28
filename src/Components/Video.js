import React from 'react'
import { IoVideocam } from "react-icons/io5";
import "./Styles/video.css"
import { useGlobalContext } from "../context";

function Video() {
    const { showVideo } = useGlobalContext();
  return (
    <div className={showVideo ? "container" : "container remove-container"}>
      <div className="container-child">
        <IoVideocam className="one-icon" />
        <span className="add-video">Add Video</span>
        <span className="drag-drop">Or drag and drop</span>
      </div>
    </div>
  )
}

export default Video