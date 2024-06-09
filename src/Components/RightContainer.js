import React from "react";
import "../Components/Styles/rightcontainer.css";
//import profileImg from "./assets/avatar.png";
import newsImage from "./assets/new-img.jpeg";
import { useSelector } from "react-redux";

function RightContainer() {
  const all = useSelector((state) => state.friend);
  const allUsers = all.users;

  return (
    <div className="right-container">
      <div className="right-content">
        <h2>Friends To Add</h2>
        {allUsers &&
          allUsers.map((allU) => {
            return (
              <div key={allU.pk}>
                <div className="who-to-follow">
                  <div className="who-profile">
                    <img src={allU.profile_image} alt="profile" />
                    <div className="who-list">
                      <span className="name-pro">Scarlet Flod</span>
                      <span>@{allU.username}</span>
                    </div>
                  </div>
                  <p>Send Request</p>
                </div>
              </div>
            );
          })}
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
