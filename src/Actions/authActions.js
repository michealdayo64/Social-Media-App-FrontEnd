const BASE_URL = "http://127.0.0.1:8000";

export const loginAction = async (getEmailInput, getPasswordInput) => {
  const url = `${BASE_URL}/account/login_api/`;
  const response = await fetch(url, {
    body: JSON.stringify({
      email: getEmailInput,
      password: getPasswordInput,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
