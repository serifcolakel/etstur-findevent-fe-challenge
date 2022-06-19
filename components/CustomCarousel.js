import React from "react";
import Slider from "react-slick";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
export default function CustomCarousel({ data }) {
  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <MdOutlineNavigateNext
        className="w-8 h-8 text-blue-600 bg-white rounded-lg absolute top-[35%] -right-2 cursor-pointer"
        onClick={onClick}
      />
    );
  }

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <MdOutlineNavigateBefore
        className="w-8 h-8 text-blue-600 bg-white rounded-lg absolute top-[35%] -left-2 z-50  cursor-pointer"
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div>
      <Slider {...settings}>
        {data.map((url, idx) => (
          <img
            key={idx}
            src={url || "https://via.placeholder.com/300x200"}
            alt="Find Event"
            className="w-full h-32 object-cover px-2"
          />
        ))}
      </Slider>
    </div>
  );
}
