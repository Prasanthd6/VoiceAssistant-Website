import React from "react";
import "./Slide.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slide = ({ children }) => {
  return (
    <div className="custom-slide">
      <div className="custom-slide-container">
        <Carousel
          showArrows={true}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          centerMode
          centerSlidePercentage={25} // 25% * 4 = 100%
          className="custom-carousel"
        >
          {children}
        </Carousel>
      </div>
    </div>
  );
};

export default Slide;
