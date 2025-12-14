import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from './Card';

// Custom Previous Arrow
const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-5xl font-semibold pt-1 pb-3 px-6 rounded-full cursor-pointer hover:bg-black hover:bg-opacity-65 z-10"
      onClick={onClick}
    >
      &#8249;
    </div>
  );
};

// Custom Next Arrow
const CustomNextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-5xl font-semibold pt-1 pb-3 px-6 rounded-full cursor-pointer hover:bg-black hover:bg-opacity-65 z-10"
      onClick={onClick}
    >
      &#8250;
    </div>
  );
};

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    focusOnSelect: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Large screens (desktops)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slideshow my-2 w-full md:max-w-full lg:max-w-full xl:min-w-full">
      <Slider {...settings}>
        <div>
          <Card imsrc='./image/images (1).jpeg.jpg' title={"Stop Food Wastage"} />
        </div>
        {/* <div>
          <Card imsrc='././image/images.jpeg.jpg' title={"Do not waste Food"}/>
        </div> */}
        <div>
          <Card imsrc='./image/Surplus-Food-Redistribution-Splash.png' title={"Donate The Food"} />
        </div>
        <div>
          <Card imsrc='././image/images (2).jpeg.jpg' title={"Donate Us Will Provide to Ngo"} />
        </div>
        
      </Slider>
    </div>
  );
};

export default Carousel;
