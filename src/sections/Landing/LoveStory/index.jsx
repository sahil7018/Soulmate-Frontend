import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./LoveStory.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

function LoveStory({ loveStoryData }) {
  return (
    <div className="love-story-main-container">
      <div className="love-story-container">
        {window.innerWidth > 648 ? (
          loveStoryData?.text &&
          loveStoryData?.text.length > 0 &&
          loveStoryData?.text.map((item, index) => (
            <div className="love-story-icon-container" key={index}>
              <div className="border-Icon">
                <div className="borderLine"></div>
                <FavoriteIcon
                  sx={{ fontSize: 32, color: "#ED1B24", marginInline: 0 }}
                />
                <div className="borderLine"></div>
              </div>
              <h1 className="love-story-para tw-font-playfairDisplay">
                {item?.HomePageContent_data}
              </h1>
              <div className="border-Icon">
                <div className="borderLine"></div>
                <FavoriteIcon
                  sx={{ fontSize: 32, color: "#ED1B24", marginInline: 0 }}
                />
                <div className="borderLine"></div>
              </div>
            </div>
          ))
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            className="love-story-swiper"
            spaceBetween={30}
            autoplay
            loop
          >
            {loveStoryData?.text &&
              loveStoryData?.text.length > 0 &&
              loveStoryData?.text.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="love-story-icon-container">
                    <div className="border-Icon">
                      <div className="borderLine"></div>
                      <FavoriteIcon
                        sx={{ fontSize: 32, color: "#ED1B24", marginInline: 0 }}
                      />
                      <div className="borderLine"></div>
                    </div>
                    <h1 className="love-story-para tw-font-playfairDisplay">
                      {item?.HomePageContent_data}
                    </h1>
                    <div className="border-Icon">
                      <div className="borderLine"></div>
                      <FavoriteIcon
                        sx={{ fontSize: 32, color: "#ED1B24", marginInline: 0 }}
                      />
                      <div className="borderLine"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default LoveStory;
