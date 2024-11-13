import React from "react";
import "./Home.css";
import HBike from "./HBike.png";
import lockImg from "./lock.png";
import alarmImg from "./alarm.png";
import locateImg from "./locate.png";

export default function Home() {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');

    // Set the href attribute to the image URL (use a root-relative path)
    link.href = `${process.env.PUBLIC_URL}/website-example.zip`; // Ensure the file is in the public directory
    link.download = 'website-example.zip'; // Specify the filename for the downloaded file

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [bikeImgStyle, setBikeImgStyle] = useState({});

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   const newXPosition = scrollPosition * 1.5; // adjust the speed of the movement
  //   const newYPosition = scrollPosition * 1; // adjust the speed of the movement
  //   setBikeImgStyle({transform: `translate(${newXPosition}px, ${newYPosition}px)` });
    
  // }, [scrollPosition]);
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
        <img id="hBike" src={HBike} alt="bike" /*style={bikeImgStyle}*//>
      </div>
      <div className="dlPad">
        <div className="dlButtonCon">
        <button type="button" id="btnDL" onClick={handleDownload}>
        <p>WANT TO RESERVE?</p>
        <p>DOWNLOAD THE APP</p>
        </button>
        </div>
      </div>
    </div>
  );
}
