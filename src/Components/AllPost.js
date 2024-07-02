import React from "react";
import "./Styles/allpost.css";
import pic from "./assets/avatar.png";
import { SlOptions } from "react-icons/sl";
import { GiSelfLove } from "react-icons/gi";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import Moment from 'react-moment';
//import { useDispatch, useSelector } from "react-redux";

function AllPost({ socialData }) {

  function getExtension(filename) {
    console.log(filename?.split(/[#?]/)[0].split(".").pop().trim());
    return filename?.split(/[#?]/)[0].split(".").pop().trim();
  }
  return (
    <div className="allpost-container">
      {socialData &&
        socialData.map((soc) => {
          return (
            <div className="inside-container" key={soc.pk}>
              <div className="top">
                <div className="left-img-text">
                  <img src={soc.user.profile_image} alt="" />
                  <div className="top-text">
                    <span className="text-t">{soc.user.username}</span>
                    <span className="text-b"><Moment format="D MMM YYYY">{soc.date_post}</Moment></span>
                  </div>
                </div>
                <SlOptions className="option" />
              </div>
              <div className="allpost-text">
                <p>{soc.user_post}</p>
                {getExtension(soc.file) === "MP4" ||
                getExtension(soc.file) === "mp4" ? (
                  <video controls>
                    <source src={soc.file} type="video/mp4" />
                  </video>
                ) : soc.file === null ? (
                  ""
                ) : (
                  <img src={soc.file} alt="pict" />
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
              <br></br>
            </div>
           
          );
        })}
    </div>
  );
}

export default AllPost;
