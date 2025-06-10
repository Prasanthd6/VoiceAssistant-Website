import React from "react";
import "./Slide.css";
import Slider from "infinite-react-carousel";

const Slide = ({ children, slidesToShow = 4, arrowsScroll = 4 }) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;