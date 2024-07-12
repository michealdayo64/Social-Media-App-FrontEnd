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
  const divRefContainer = useRef();
  const authState = useSelector((state) => state.auth);
  const socialState = useSelector((state) => state.social);
  const log_user = socialState.logginUser;
  const userData = authState.user;

  function getExtension(filename) {
    return filename?.split(/[#?]/)[0].split(".").pop().trim();
  }

  const createComment = (id) => {
    //e.preventDefault();
    const commentidBtn = [...document.querySelectorAll("#commentIdBtn")];
    commentidBtn.forEach((mm) => {
      var b = mm.getAttribute("data-id");
      if (b === `${id}`) {
        console.log(`${id}`);
        var comment_textId = document.querySelector(`#commenttextid_${id}`);
        comment_textId?.classList.add("comment-text2");
        var comment_listId = document.querySelector(`#commentlistid_${id}`);
        comment_listId?.classList.add("comment-list2");
      }
    });
  };

  return (
    <div>
      {socialData &&
        socialData.map((soc) => {
          //console.log(soc.user_like_post)
          //const element = React.createRef()
          //divRefContainer.current[soc.pk] = element
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
                    <div
                      onClick={() => createComment(pk)}
                      id="commentIdBtn"
                      data-id={pk}
                    >
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
                <div className="comment-text1" id={`commenttextid_${pk}`}>
                  <img src={userData?.profile_pic} alt="prof-pic" />

                  <form method="post" onSubmit={null}>
                    <input type="text" placeholder="Add a comment..." />
                  </form>
                </div>
                {comments &&
                  comments.map((com) => {
                    return (
                      <div className="comment-list1" id={`commentlistid_${pk}`} key={com.pk}>
                        <div className="comment-list-top">
                          <img src={com.user?.profile_image} alt="proc-img" />
                          <div className="comment-card">
                            <div className="card-header">
                              <a>{com.user?.username}</a>
                              <span>
                                4h <a>...</a>
                              </span>
                            </div>
                            <div className="card-body">
                              <p>{com.comment}</p>
                            </div>
                          </div>
                        </div>
                        <div className="like-reply">
                          <a>Like</a> <span>|</span> <a>Reply</a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      <br />
    </div>
  );
}

export default AllPost;
