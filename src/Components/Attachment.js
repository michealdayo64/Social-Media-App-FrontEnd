import React from "react";
import { IoDocumentAttach } from "react-icons/io5";
import "./Styles/attachment.css";
import { useGlobalContext } from "../context";

function Attachment() {
  const { showAttachment } = useGlobalContext();
  return (
    <div
      className={showAttachment ? "container" : "container remove-container"}
    >
      <div className="container-child">
        <IoDocumentAttach className="one-icon" />
        <span className="add-attachment">Add Attachment</span>
        <span className="drag-drop">Or drag and drop</span>
      </div>
    </div>
  );
}

export default Attachment;
