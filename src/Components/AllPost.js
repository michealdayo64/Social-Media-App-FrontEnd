import React from "react";
import "./Styles/allpost.css";
import pic from "./assets/avatar.png";
import { SlOptions } from "react-icons/sl";
import { GiSelfLove } from "react-icons/gi";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";

function AllPost() {
  return (
    <div className="allpost-container">
      <div className="inside-container">
        <div className="top">
          <div className="left-img-text">
            <img src={pic} alt="" />
            <div className="top-text">
              <span className="text-t">Dave Mark</span>
              <span className="text-b">March 24</span>
            </div>
          </div>
          <SlOptions className="option" />
        </div>
        <div className="allpost-text">
          <p>
            bdvvvxhvsxvxvshxvhsvxhxvhsssssxxugxssbsussusysssssssss
            sbdvvvxhvsxvxvshxvhsvxhxvhsssssxxugxssbsussusyssssssssssb
            dvvvxhvsxvxvshxvhsvxhxvhsssssxxugxssbsussusyssssssssssbdvvvx
            hvsxvxvshxvhsvxhxvhsssssxxugxssbsussusyssssssssssbdvvvxhvsxvxvsh
            xvhsvxhxvhsssssxxugxssbsussusyssssssssss
          </p>
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
    </div>
  );
}

export default AllPost;
