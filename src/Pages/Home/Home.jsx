import React, { useState } from "react";
import "./Home.css";
import HBike from "./HBike.png";
import lockImg from "./lock.png";
import alarmImg from "./alarm.png";
import locateImg from "./locate.png";
import { IoMdDownload } from "react-icons/io";

export default function Home() {
  // State for triggering animation
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to handle download and animation
  const handleDownload = () => {
    // Trigger pulse animation
    setIsAnimating(true);

    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = 'https://github.com/RbL2024/RBMSAndroid/releases/download/RBMS/rbms.apk';
    link.download = 'rbms.apk'; // Specify the filename

    // Append the link to the document body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to start the download
    link.click();

    // Remove the link after the download starts
    document.body.removeChild(link);

    // Reset animation state after animation duration
    setTimeout(() => setIsAnimating(false), 1000); // Reset after pulse animation ends
  };

  return (
    <div id="homePage">
      <div className="homeTitle">
        <p>RBMS</p>
        <p>EXPLORE WITH EASE AND ENJOY YOUR RIDE</p>
        <a href="#tutorialPage" id="LM" className="button">
          Learn More
        </a>
      </div>
      <div className="features">
        <div className="feat">
          <h1 className="fTitle">SMART LOCK</h1>
          <span>
            <img className="fImg" src={lockImg} alt="fimg" id="lock" />
          </span>
          <p className="fDesc">SAFE AND SECURE</p>
        </div>
        <div className="feat">
          <h1 className="fTitle">SOUND ALARM</h1>
          <span>
            <img className="fImg" src={alarmImg} alt="fimg" id="alarm" />
          </span>
          <p className="fDesc">ALERT AND AWARE</p>
        </div>
        <div className="feat">
          <h1 className="fTitle">GPS TRACKER</h1>
          <span>
            <img className="fImg" src={locateImg} alt="fimg" id="locate" />
          </span>
          <p className="fDesc">RIDE SECURED</p>
        </div>
      </div>
      <div className="hbike">
        <img id="hBike" src={HBike} alt="bike" />
      </div>
      <div className="dlPad">
        <div className="dlButtonCon">
          <button type="button" id="btnDL" onClick={handleDownload}>
            <p>WANT TO RESERVE?</p>
            <p>
              DOWNLOAD THE APP
              <div className="downloadIconWrapper">
                <IoMdDownload 
                  className={`downloadIcon ${isAnimating ? "pulseColor" : ""}`} 
                />
              </div>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
