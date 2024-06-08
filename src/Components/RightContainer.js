import React from "react";
import "../Components/Styles/rightcontainer.css";
import profileImg from "./assets/avatar.png";
import newsImage from "./assets/new-img.jpeg"
import { UseSelector, useSelector } from "react-redux";


function RightContainer() {
  const all = useSelector((state) => state.friend)
  const allUsers = all.users
  console.log(allUsers)

  return (
    <div className="right-container">
      <div className="right-content">
        <h2>Friends To Add</h2>
        <div className="who-to-follow">
          <div className="who-profile">
            <img src={profileImg} alt="profile" />
            <div className="who-list">
              <span className="name-pro">Scarlet Flod</span>
              <span>@scallet</span>
            </div>
          </div>
          <p>Send Request</p>
        </div>

        <div className="who-to-follow">
          <div className="who-profile">
            <img src={profileImg} alt="profile" />
            <div className="who-list">
              <span className="name-pro">Scarlet Flod</span>
              <span>@scallet</span>
            </div>
          </div>
          <p>Send Request</p>
        </div>
        <div className="who-to-follow">
          <div className="who-profile">
            <img src={profileImg} alt="profile" />
            <div className="who-list">
              <span className="name-pro">Scarlet Flod</span>
              <span>@scallet</span>
            </div>
          </div>
          <p>Send Request</p>
        </div>

        <div className="who-to-follow">
          <div className="who-profile">
            <img src={profileImg} alt="profile" />
            <div className="who-list">
              <span className="name-pro">Scarlet Flod</span>
              <span>@scallet</span>
            </div>
          </div>
          <p>Send Request</p>
        </div>
      </div>
      <br></br>
      <div className="right-content">
        <h3>Today's News</h3>
        <div className="image-content">
          <img src={newsImage} alt="newsimage" />
          <div className="text-content">
            <span>Find questions you should amswer truthfully</span>
            <span>1h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightContainer;
