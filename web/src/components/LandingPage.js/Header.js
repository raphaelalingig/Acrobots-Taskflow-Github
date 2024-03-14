import React from "react";
import logopicture from "../../assets/taskflowlogo.png";
const Header = () => {
  return (
    <div className="header">
      <div className="navigation mr-10 mt-2 ">
        <div className="logo ml-10">
          <img src={logopicture}></img>
        </div>
        <div className="navigations-links flex">
          <h2 className="mr-10">Services</h2>
          <h2 className="mr-10">Feedback</h2>
          <h2>Contact Us</h2>
        </div>
        <div
          className="login"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Log in
        </div>
      </div>
    </div>
  );
};

export default Header;
