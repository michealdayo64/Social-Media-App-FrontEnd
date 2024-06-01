import "./App.css";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { loadUserAccessToken, loadUser } from "../src/redux_folder/authSlice";
import { useEffect } from "react";
import FriendsPage from "./Pages/FriendsPage";
import Group from "./Pages/Group";
import Notifications from "./Pages/Notifications";
import { jwtDecode } from "jwt-decode";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <RegisterPage />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <LoginPage />
      </div>
    ),
  },
  {
    path: "/friends",
    element: (
      <div>
        <FriendsPage />
      </div>
    ),
  },
  {
    path: "/group",
    element: (
      <div>
        <Group />
      </div>
    ),
  },
  {
    path: "/notifications",
    element: (
      <div>
        <Notifications />
      </div>
    ),
  },
]);

function App() {
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  var userdata = {}
  var refreshdata = isAuth.token
  console.log(refreshdata)

  useEffect(() => {
    const refresh =
      typeof window !== "undefined" && window.localStorage.getItem("token");
    console.log(refresh);
    if (refresh) {
      const getLoadUserAccessToken = async () => {
        const url = "http://127.0.0.1:8000/account/token/refresh/";
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ refresh: refreshdata }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data.access);
        if (response.status === 200) {
          dispatch(loadUserAccessToken(data));
          userdata["userdata"] = jwtDecode(data.access);
          console.log(userdata)
          dispatch(loadUser(userdata));
        }
      };
      getLoadUserAccessToken();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth.isAuthenticated]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
