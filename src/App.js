import "./App.css";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FriendsPage from "./Pages/FriendsPage";
import Group from "./Pages/Group";
import Notifications from "./Pages/Notifications";
import { useGlobalContext } from "./context";
import { getAllUser } from "./Actions/friendActions";

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
  const { getLoadUserAccessToken } = useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  var userdata = {};
  var refresh = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getLoadUserAccessToken(refresh, userdata);
    getAllUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth.isAuthenticated]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
