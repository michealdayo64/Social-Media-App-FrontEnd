import React from "react";
import "./Styles/allpost.css";
import pic from "./assets/avatar.png";
import { SlOptions } from "react-icons/sl";
import { GiSelfLove } from "react-icons/gi";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function AllPost({ socialData }) {
  const isImage = [".gif", ".jpeg", ".png", ".jpg"];
  const isVideo = [".mpg", ".mp2", ".mpeg", ".mpe", ".mpv"];
  return (
    <div className="allpost-container">
      {socialData &&
        socialData.map((soc) => {
          return (
            <div>
              <div className="inside-container" key={soc.pk}>
                <div className="top">
                  <div className="left-img-text">
                    <img src={soc.user.profile_image} alt="" />
                    <div className="top-text">
                      <span className="text-t">{soc.user.username}</span>
                      <span className="text-b">{soc.user.date_post}</span>
                    </div>
                  </div>
                  <SlOptions className="option" />
                </div>
                <div className="allpost-text">
                  <p>{soc.user_post}</p>
                  {soc.file ? (
                    <img src={soc.file} alt="pict" />
                  ) : (
                    <video width="200" height="300">
                      <source src={soc.file} type="video/mp4" />
                    </video>
                  )}
                </div>
                <hr />
                <div className="bottom">
                  <div className="bottom-like">
                    <GiSelfLove className="icon-color" />
                    <span className="like">0 Likes</span>
                  </div>
                  <div className="bottom-comment">
                    <div>
                      <TfiCommentAlt className="icon-color" />
                      <span className="comment">0 Commnets</span>
                    </div>
                    <div>
                      <BiRepost className="icon-color" />
                      <span className="repost">0 Repost</span>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
            </div>
          );
        })}
      <br />
    </div>
  );
}

export default AllPost;
