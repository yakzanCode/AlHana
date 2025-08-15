// Carousel.jsx
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ children }) => {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth === null) return null;

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
    slidesToShow:
      windowWidth >= 1200
        ? 4
        : windowWidth >= 770
        ? 3
        : windowWidth >= 670
        ? 2
        : 1,
    centerMode: windowWidth < 670,
    centerPadding:
      windowWidth < 576 ? "60px" : windowWidth < 670 ? "80px" : "0px",
  };

  return (
    <div className="container-fluid px-0 py-1 my-4">
      <Slider {...settings} ref={sliderRef}>
        {children &&
          React.Children.map(children, (child, index) => (
            <div key={index} style={{ marginRight: "10px" }}>
              {child}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
