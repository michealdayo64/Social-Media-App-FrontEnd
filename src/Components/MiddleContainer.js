import React, { useEffect } from "react";
import "../Components/Styles/middlecontainer.css";
import { useGlobalContext } from "../context";
import { FaImage, FaVideo, FaXbox } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AllPost from "./AllPost";
import { allPost, userLikeId, userRepostId } from "../Actions/socialActions";
import {
  loadAllPost,
  loadRepostId,
  loadUserLikePostId,
} from "../redux_folder/socialSlice";

function MiddleContainer() {
  const { openModal, openModalWithPhoto, openModalWithVideo } =
    useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  const social = useSelector((state) => state.social);
  const dispatch = useDispatch();
  const userData = isAuth.user;
  const access = isAuth.access;
  const socialData = social.allpost;

  const getallPostFunc = async () => {
    const response = await allPost(access);
    const data = await response.json();
    dispatch(loadAllPost(data));
    console.log("hello")
  };

  /*useEffect(() => {
    getallPostFunc();
  }, []);*/

  const likePostBtn = async (id) => {
    const response = await userLikeId(access, id);
    const data = await response.json();
    console.log(data);
    dispatch(loadUserLikePostId(data));
    getallPostFunc();
  };

  const userRepostBtn = async (id) => {
    const response = await userRepostId(access, id);
    const data = await response.json();
    console.log(data);
    dispatch(loadRepostId(data));
    getallPostFunc();
  };

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
        <AllPost socialData={socialData} likePostBtn={likePostBtn} userRepostBtn={userRepostBtn} />
      </div>
    </div>
  );
}

export default MiddleContainer;
