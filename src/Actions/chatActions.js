const BASE_URL = "http://127.0.0.1:8000";

export const getLoadPrivateChatFriends = async (access) => {
  const url = `${BASE_URL}/message/get-friends-chat-list/`;
  const response = await fetch(url, {
    body: null,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};
