import React, { useEffect, useRef } from "react";
import "./Tutorial.css";

export default function Tutorial() {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the YouTube Iframe Player API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize the player when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("ytPlayer", {
        events: {
          onReady: () => console.log("YouTube Player is ready!"),
        },
      });
    };
  }, []);

  const handleSeek = (seconds) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seconds, true); // Skip to the desired time
    }
  };

  return (
    <div id="tutorialPage">
      <div className="ytVid">
        <div id="ytPlayerWrapper">
          <iframe
            id="ytPlayer"
            src="https://www.youtube.com/embed/o7euy4WngC8?enablejsapi=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="steps">
        <p className="step-title">MOBILE APPLICATION TUTORIAL STEP BY STEP</p>
        <div className="step-body">
          <div className="step-tuts">
            <span className="stepNum">STEP 1: </span>
            <span className="stepDesc">
              DOWNLOAD THE APPLICATION IN HOMEPAGE.{" "}
              <button
                onClick={() => handleSeek(2)}
                className="video-link"
              >
                0:02
              </button>
            </span>
          </div>
          <div className="step-tuts">
            <span className="stepNum">STEP 2: </span>
            <span className="stepDesc">
            CREATE AN ACCOUNT AND FILL OUT THE NEEDED INFORMATION.{" "}
              <button
                onClick={() => handleSeek(24)}
                className="video-link"
              >
                0:24
              </button>
            </span>
          </div>
          <div className="step-tuts">
            <span className="stepNum">STEP 3: </span>
            <span className="stepDesc">
              AFTER CREATING AN ACCOUNT SIGN IN YOUR ACCOUNT.{" "}
              <button
                onClick={() => handleSeek(55)}
                className="video-link"
              >
                0:55
              </button>
            </span>
          </div>
          <div className="step-tuts">
            <span className="stepNum">STEP 4: </span>
            <span className="stepDesc">
            CLICK THE RENT ICON.{" "}
            <button
                onClick={() => handleSeek(62)}
                className="video-link"
              >
                1:02
              </button>
            </span>
          </div>
          <div className="step-tuts">
            <span className="stepNum">STEP 5: </span>
            <span className="stepDesc">
              CHOOSE YOUR BIKE AND RESERVE NOW!{" "}
              <button
                onClick={() => handleSeek(65)}
                className="video-link"
              >
                1:05
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
