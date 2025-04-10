import React, { useEffect } from "react";
import "./Hero.css";

function Hero({ heroSection }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = document.getElementById("heroVid");
    if (video) {
      video.muted = true;
      video.play().catch((error) => console.error("Video play failed:", error));
    }

    // Enable scrolling after animation is complete
    const timeout = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3500); // Match animation delay + duration

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="heroSection">
      <video
        src={heroSection?.HomePageContent_data}
        className="heroVideo"
        id="heroVid"
        autoPlay
        playsInline
        muted
        loop
      />
      <div className="tw-max-w-[100%] sw1024:tw-max-w-[50%]">
        <h1 className="hero-text">
          “{heroSection?.header[0]?.HomePageContent_data}”
        </h1>
      </div>
    </div>
  );
}

export default Hero;
