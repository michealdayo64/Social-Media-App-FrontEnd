import { useDispatch, useSelector } from "react-redux";
import { loadAllUsers } from "../redux_folder/friendSlice";

const auth = useSelector((state) => state.auth);
var access = auth.access;
//var access = JSON.parse(localStorage.getItem("access"));
const dispatch = useDispatch();
const BASE_URL = "http://127.0.0.1:8000";

export const getAllUser = async () => {
  const url = `${BASE_URL}/friend/get_all_user/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  const data = await response.json();
  if (response.status === 200) {
    dispatch(loadAllUsers(data));
  }
};
