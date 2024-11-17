import React, { useState } from "react";
import "./Home.css";
import HBike from "./HBike.png";
import lockImg from "./lock.png";
import alarmImg from "./alarm.png";
import locateImg from "./locate.png";

export default function Home() {
  // Loading state to manage spinner visibility
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle download and show loading spinner
  const handleDownload = () => {
    // Start loading state
    setIsLoading(true);

    // Simulate download action
    setTimeout(() => {
      // Create a temporary link element
      const link = document.createElement('a');

      // Set the href attribute to the file URL (root-relative path)
      link.href = `${process.env.PUBLIC_URL}/website-example.zip`; // Ensure the file is in the public directory
      link.download = 'website-example.zip'; // Specify the filename

      // Append the link to the document body (required for Firefox)
      document.body.appendChild(link);

      // Programmatically click the link to start the download
      link.click();

      // Remove the link after the download starts
      document.body.removeChild(link);

      // End loading state after download is triggered
      setIsLoading(false);
    }, 1500); // Simulate a 1.5s delay for the "download" action
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
          <button type="button" id="btnDL" onClick={handleDownload} disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div> // Show loading spinner
            ) : (
              <>
                <p>WANT TO RESERVE?</p>
                <p>DOWNLOAD THE APP</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
