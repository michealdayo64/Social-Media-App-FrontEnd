import "./App.css";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { loadUserAccessToken } from "../src/redux_folder/authSlice";
import { useEffect } from "react";
import FriendsPage from "./Pages/FriendsPage";
import Group from "./Pages/Group";
import Notifications from "./Pages/Notifications";

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

  useEffect(() => {
    const refresh = JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("token")
    );
    if (refresh) {
      const getLoadUserAccessToken = async () => {
        const url = "http://127.0.0.1:8000/account/token/refresh/";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ refresh: refresh?.refresh }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          dispatch(loadUserAccessToken(data));
        }
      };
      getLoadUserAccessToken();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth.isAuthenticated]);

  /*useEffect(() => {
    const getLoadUser = async () =>{
      const url = "http://127.0.0.1:8000/account/user_api/"
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuth.access}`,
        },
      })
    }
  }, []);*/

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
