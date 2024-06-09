import React from "react";
import "../Components/Styles/leftcontainer.css";
//import profileImg from "./assets/avatar.png";
import { RiHomeWifiLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { BsPersonVideo2 } from "react-icons/bs";
//import { GiHiking } from "react-icons/gi";
import { IoMdPhotos } from "react-icons/io";
import { FaRegMap } from "react-icons/fa6";
import { useSelector } from "react-redux";

function LeftContainer() {
  const isAuth = useSelector((state) => state.auth);
  const userData = isAuth.user;

  return (
    <div className="left-container">
      <div className="profile-container">
        <div className="profile-img">
          <img src={userData?.profile_pic} alt="profile" />
        </div>
        <div className="profile-data">
          <span>{userData?.name}</span>
          <span>@{userData?.username}</span>
        </div>
        <div className="follow">
          <div>
            <span>4.6k</span>
            <p>Friends</p>
          </div>
          <div>
            <span>4.6k</span>
            <p>Friend Requests</p>
          </div>
          <div>
            <span>4.6k</span>
            <p>Events</p>
          </div>
        </div>
      </div>
      <div className="other-container">
        <div className="list-container">
          <div className="aa">
            <div className="list-icon">
              <RiHomeWifiLine className="left-icons" />
              <span>Feed</span>
            </div>
            <span>hello</span>
          </div>

          <div className="aa">
            <div className="list-icon">
              <FaUserFriends className="left-icons" />
              <span>Friends</span>
            </div>
          </div>
          <div className="aa">
            <div className="list-icon">
              <BsPersonVideo2 className="left-icons" />
              <span>Video</span>
            </div>
          </div>
          <div className="aa">
            <div className="list-icon">
              <IoMdPhotos className="left-icons" />
              <span>Photo</span>
            </div>
          </div>
          <div className="aa">
            <div className="list-icon">
              <FaRegMap className="left-icons" />
              <span>Map</span>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}

export default LeftContainer;
