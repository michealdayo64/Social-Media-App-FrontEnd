import React, { useEffect } from "react";
import "../Components/Styles/middlecontainer.css";
import { useGlobalContext } from "../context";
import { FaImage, FaVideo, FaXbox } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AllPost from "./AllPost";
import { allPost } from "../Actions/socialActions";
import { loadAllPost } from "../redux_folder/socialSlice";

function MiddleContainer() {
  const { openModal, openModalWithPhoto, openModalWithVideo } =
    useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  const social = useSelector((state) => state.social);
  const dispatch = useDispatch()
  const userData = isAuth.user;
  const access = isAuth.access;
  const socialData = social.allpost;

  useEffect(() => {
    const getallPostFunc = async () => {
      const response = await allPost(access);
      const data = await response.json();
      console.log(data);
      dispatch(loadAllPost(data))

    };

    getallPostFunc()
  }, []);

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
          <div className="stream" onClick={openModalWithVideo}>
            <FaVideo />
            <span>Video</span>
          </div>
          <div onClick={openModalWithPhoto}>
            <FaImage />
            <span>Image</span>
          </div>
          <div>
            <FaXbox />
            <span>Emoji</span>
          </div>
        </div>
      </div>
      <br />
      <div>
        <AllPost socialData={socialData} />
        
      </div>
    </div>
  );
}

export default MiddleContainer;
