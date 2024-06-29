const BASE_URL = "http://127.0.0.1:8000";

export const getAllUser = async (access) => {
  const url = `${BASE_URL}/friend/get_all_user/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getTotalFriends = async (access) => {
  const url = `${BASE_URL}/friend/friend_count/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getTotalFriendRequest = async (access) => {
  const url = `${BASE_URL}/friend/total_friend_request/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getSendRequest = async (access, id) => {
  const url = `${BASE_URL}/friend/send-friend-request-api/${id}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getAccesptRequest = async (access, id) => {
  const url = `${BASE_URL}/friend/accept-friend-request-api/${id}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getDeclineRequest = async (access, id) => {
  const url = `${BASE_URL}/friend/decline-friend-request-api/${id}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getCancelRequest = async (access, id) => {
  const url = `${BASE_URL}/friend/cancel-friend-request-api/${id}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const getRemoveFriend = async (access, id) => {
  const url = `${BASE_URL}/friend/remove-friend-api/${id}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};





