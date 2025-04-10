import React, { useEffect } from "react";
import "./PeopleTrust.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import BlockIcon from "@mui/icons-material/Block";
import Verified from "src/assets/Verified.svg";
import Block from "src/assets/block.svg";
import SOS from "src/assets/SOS.svg";

function PeopleTrust({ peopleTrustData }) {
  const heading = peopleTrustData && peopleTrustData["people-trust-heading"];
  const subHeading =
    peopleTrustData && peopleTrustData["people-trust-sub-heading"];
  const iconContainer =
    peopleTrustData &&
    peopleTrustData["people-trust-icon-text-container-wrapper"];

  const bgImage = peopleTrustData && peopleTrustData["background-image"];

  console.log("===============");
  console.log("BG image : ", bgImage);
  console.log("================");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Loop over the entries
      entries.forEach((entry) => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.classList.add("square-animation");
        }
      });
    });

    observer.observe(document.querySelector(".people-trust"));
  });
  return (
    <div
      className={`people-trust tw-bg-[url('${bgImage[0]?.additional_info?.link}')]`}
      id="peopleTrust"
    >
      <div className="people-trust-linear-gradient">
        <div className=" people-trust-outer-container">
          <div className=" people-trust-inner-container">
            <div className="tw-max-w-[50%] sw484:tw-max-w-[600px]">
              <h1 className="people-trust-heading">
                {heading && heading[0]?.HomePageContent_data}
              </h1>
            </div>
            <div className="tw-max-w-[100%] sw484:tw-max-w-[300px]">
              <h2 className="people-trust-sub-heading">
                {subHeading && subHeading[0]?.HomePageContent_data}
              </h2>
            </div>
            <div className="people-trust-icon-text-container-wrapper">
              {iconContainer &&
                iconContainer.length > 0 &&
                iconContainer.map((item, index) => (
                  <div className="people-trust-icon-text-container" key={index}>
                    <img
                      src={item?.additional_info?.icon || null}
                      className="people-trust-sos-icon"
                    />
                    <span className="people-trust-icon-text">
                      {item?.HomePageContent_data}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleTrust;
