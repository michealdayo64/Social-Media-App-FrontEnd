import React from "react";
import '../Components/Styles/homepage.css'
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import LeftContainer from "../Components/LeftContainer";
import RightContainer from "../Components/RightContainer";
import MiddleContainer from "../Components/MiddleContainer";
import Modal from "../Components/Modal";



function HomePage() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="home-container">
        <LeftContainer />
        <MiddleContainer />
        <RightContainer />
        <Modal />
      </div>
    </div>
  );
}

export default HomePage;
