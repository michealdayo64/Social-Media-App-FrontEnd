import React from "react";
import "../Components/Styles/rightcontainer.css";
//import profileImg from "./assets/avatar.png";
import newsImage from "./assets/new-img.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { getSendRequest, getAccesptRequest, getDeclineRequest, getCancelRequest, getRemoveFriend } from "../Actions/friendActions";
import { send_request, accept_request, decline_request, cancel_request, remove_friend } from "../redux_folder/friendSlice";
//import { Link } from "react-router-dom";

function RightContainer() {
  const all = useSelector((state) => state.friend);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const allUsers = all.users;
  var access = authState.access;

  const send_request_func = async (id) => {
    const response = await getSendRequest(access, id);
    const data = await response.json();
    dispatch(send_request(data));
  };

  const accept_request_func = async (id) => {
    const response = await getAccesptRequest(access, id);
    const data = await response.json();
    dispatch(accept_request(data));
  };

  const decline_request_func = async (id) => {
    const response = await getDeclineRequest(access, id);
    const data = await response.json();
    dispatch(decline_request(data));
  };


  const cancel_request_func = async (id) => {
    const response = await getCancelRequest(access, id);
    const data = await response.json();
    dispatch(cancel_request(data));
  };


  const remove_friend_func = async (id) => {
    const response = await getRemoveFriend(access, id);
    const data = await response.json();
    dispatch(remove_friend(data));
  };

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
                    <img src={allU.pic} alt="profile" />
                    <div className="who-list">
                      <span className="name-pro">{allU.name}</span>
                      <span>@{allU.username}</span>
                    </div>
                  </div>
                  <div className="request-container">
                    {allU.is_friend === true ? (
                      <span className="request">UnFriend</span>
                    ) : allU.request_sent === 0 ? (
                      <div>
                        <span className="request" onClick={accept_request_func(allU.pending_friend_request_id)}>Accept</span>
                        <span className="request">Decline</span>
                      </div>
                    ) : allU.request_sent === 1 ? (
                      <span className="request" onClick={() => cancel_request_func(allU.pending_friend_request_id)}>Cancel</span>
                    ) : (
                      <span
                        className="request"
                        onClick={() => send_request_func(allU.pk)}
                      >
                        Send Request
                      </span>
                    )}
                  </div>
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
