import React from "react";
import "./Styles/alert.css";

function Alert({myalert}) {
  return (
    <div className="alert-container">
      <div className="alert-content">{myalert}</div>
    </div>
  );
}

export default Alert;
