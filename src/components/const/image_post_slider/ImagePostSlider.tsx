import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imagePostSlider.css";
import { BiCarousel } from "react-icons/bi";

// import {
//   MdOutlineKeyboardArrowLeft,
//   MdOutlineKeyboardArrowRight,
// } from "react-icons/md";

// interface ArrowProps {
//   className?: string;
//   style?: CSSProperties | undefined;
//   onClick?: () => void;
// }

// const NextArrow = (props: ArrowProps) => {
//   const { style, onClick } = props;
//   return (
//     <div
//       className={`custom-arrow bg-secondary rounded cursor-pointer`}
//       style={{
//         ...style,
//         display: "block",
//         color: "black",
//         right: "10px",
//         top: "50%",
//         transform: "translateY(-50%)",
//       }}
//       onClick={onClick}
//     >
//       <MdOutlineKeyboardArrowRight size={18} />
//     </div>
//   );
// };

// const PrevArrow = (props: ArrowProps) => {
//   const { style, onClick } = props;
//   return (
//     <div
//       className={`custom-arrow bg-secondary rounded cursor-pointer`}
//       style={{
//         ...style,
//         display: "block",
//         color: "black",
//         left: "10px",
//         top: "50%",
//         transform: "translateY(-50%)",
//       }}
//       onClick={onClick}
//     >
//       <MdOutlineKeyboardArrowLeft size={18} />
//     </div>
//   );
// };

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  rtl: false,
  // nextArrow: <NextArrow className="custom-arrow" />,
  // prevArrow: <PrevArrow className="custom-arrow" />,
};

interface ImageSliderProps {
  children?: React.ReactNode;
  onImageChange?: (index: number) => void; // Callback function to notify parent of image change
}

const ImagePostSlider = ({ children, onImageChange }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageChange = (index: number) => {
    console.log(currentSlide);
    setCurrentSlide(index);
    if (onImageChange) {
      onImageChange(index);
    }
  };

  return (
    <div className="relative">
      <Slider {...sliderSettings} afterChange={handleImageChange}>
        {children}
      </Slider>
      <div className="absolute top-2 right-4">
        <BiCarousel className="text-secondary w-6 h-6" />
      </div>
    </div>
  );
};

export default ImagePostSlider;
