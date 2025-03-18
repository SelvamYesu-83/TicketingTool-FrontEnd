import React from "react";
import share from "../../assets/share.png";
import Question from "../../assets/question-circle.png";
import Sttings from "../../assets/settings.png";
import "../../style/header/headerright.css"; // Import the CSS file

const HeaderRight = () => {
  return (
    <nav className="header">
      {/* Right Side: Icons */}
      <div className="icons">
        <button className="icon-btn">
          <img src={share} alt="Share" className="img" />
        </button>
        <button className="icon-btn">
          <img src={Question} alt="question" className="img" />
        </button>
        <button className="icon-btn">
          <img src={Sttings} alt="settings" className="img" />
        </button>
        <button className="profile-btn">S</button>
      </div>
    </nav>
  );
};

export default HeaderRight;
