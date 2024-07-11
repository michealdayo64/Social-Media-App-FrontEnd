import React, { useEffect, useRef } from "react";
import "./Styles/allpost.css";
import { SlOptions } from "react-icons/sl";
import { GiSelfLove } from "react-icons/gi";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

function AllPost({ socialData, likePostBtn, userRepostBtn }) {
  const divRefContainer = useRef()
  function getExtension(filename) {
    return filename?.split(/[#?]/)[0].split(".").pop().trim();
  }

  const social = useSelector((state) => state.social);
  const log_user = social.logginUser;

  const createComment = () =>{
    //console.log(divRefContainer.current.getAttribute("data-id"))
  }

  useEffect(() =>{
    console.log(divRefContainer.current)
  })

  return (
    <div>
      {socialData &&
        socialData.map((soc) => {
          //console.log(soc.user_like_post)
          const element = React.createRef()
          divRefContainer.current[soc.pk] = element
          const {
            pk,
            user,
            date_post,
            user_post,
            file,
            user_like_post,
            comments,
            repost_users,
          } = soc;

          return (
            <div className="allpost-container" key={pk}>
              <div className="inside-container">
                <div className="top">
                  <div className="left-img-text">
                    <img src={user.profile_image} alt="" />
                    <div className="top-text">
                      <span className="text-t">{user.username}</span>
                      <span className="text-b">
                        <Moment format="D MMM YYYY">{date_post}</Moment>
                      </span>
                    </div>
                  </div>
                  <SlOptions className="option" />
                </div>
                <div className="allpost-text">
                  <p>{user_post}</p>
                  {getExtension(file) === "MP4" ||
                  getExtension(file) === "mp4" ? (
                    <video controls>
                      <source src={file} type="video/mp4" />
                    </video>
                  ) : file === null ? (
                    ""
                  ) : (
                    <img src={file} alt="pict" />
                  )}
                </div>
                <hr />
                <div className="bottom">
                  <div className="bottom-like" onClick={() => likePostBtn(pk)}>
                    {user_like_post.includes(log_user) ? (
                      <BiSolidDislike className="icon-color" />
                    ) : (
                      <BiSolidLike className="icon-color" />
                    )}

                    <span className="like">
                      {`${soc.user_like_post.length === 1}`
                        ? `${user_like_post.length} Like`
                        : `${user_like_post.length} Likes`}
                    </span>
                  </div>
                  <div className="bottom-comment">
                    <div ref={element} onClick={createComment} id="commentIdBtn" data-id={pk}>
                      <TfiCommentAlt className="icon-color" />
                      <span className="comment">
                        {comments.length} Commnets
                      </span>
                    </div>
                    <div className="repost" onClick={() => userRepostBtn(pk)}>
                      <BiRepost className="icon-color" />
                      <span className="repost">
                        {repost_users.length} Repost
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <br />
    </div>
  );
}

export default AllPost;
