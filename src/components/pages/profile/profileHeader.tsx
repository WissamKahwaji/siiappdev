import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLink,
  FaLinkedin,
  FaSnapchat,
} from "react-icons/fa";
import { FaThreads, FaX } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  faEdit,
  faGears,
  faQrcode,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import yellowCard from "../../../assets/yellow_card.png";
import yellowCardBack from "../../../assets/yellow_card_back.png";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

const ProfileHeader = () => {
  const socialMediaIcons = [
    { icon: <FaLink className="w-5 h-5" />, link: "" },
    { icon: <FaFacebook className="w-5 h-5" />, link: "" },
    { icon: <FaInstagram className="w-5 h-5" />, link: "" },
    { icon: <BsWhatsapp className="w-5 h-5" />, link: "" },
    { icon: <FaYoutube className="w-5 h-5" />, link: "" },
    { icon: <FaThreads className="w-5 h-5" />, link: "" },
    { icon: <FaX className="w-5 h-5" />, link: "" },
    { icon: <FaLinkedin className="w-5 h-5" />, link: "" },
    { icon: <FaSnapchat className="w-5 h-5" />, link: "" },
    { icon: <MdAdd className="w-8 h-8" />, link: "" },
  ];

  const [isFlipped, setIsFlipped] = useState(false);
  const handleSwapClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="flex flex-col md:justify-center md:items-center justify-start items-start px-3 w-full">
      <div className="flex flex-row space-x-1 md:space-x-8 md:justify-center">
        <img
          src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          alt="profile"
          className="md:hidden rounded-lg md:h-[150px] md:w-[150px] h-[100px] w-[100px]"
        />
        <div className="hidden md:flex md:flex-col">
          <img
            src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
            alt="profile"
            className="rounded-lg md:h-[150px] md:w-[150px] h-[100px] w-[100px]"
          />
          <div className="font-header mt-4 text-lg md:h-[135px] w-[140px] overflow-ellipsis">
            <p className="text-sm  font-semibold">wissam_98</p>
            <p className="text-base">
              this is bio <br />
              Software Engineer <br />
              Master Web Science
            </p>
          </div>
          <div className="hidden justify-end items-end md:flex">
            <div className="flex flex-row space-x-8 mt-3 capitalize">
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold">34</p>
                <p className="text-sm">posts</p>
              </div>
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold">50</p>
                <p className="text-sm">followings</p>
              </div>
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold">50</p>
                <p className="text-sm">followers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row md:space-x-10 h-fit md:items-center md:justify-between items-center  justify-between ">
            <p className="text-sm  font-semibold min-w-[190px]">wissam_98</p>
            {/* <p className="md:text-2xl text-sm font-header font-semibold min-w-[210px]">
              sii advertising & media company
            </p> */}

            <div className="flex flex-row md:space-x-5 space-x-2">
              <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                <FontAwesomeIcon icon={faEdit} className="" />
              </div>
              <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                <FontAwesomeIcon icon={faQrcode} className="" />
              </div>
              <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                <FontAwesomeIcon icon={faGears} className="" />
              </div>
            </div>
          </div>
          <div className="md:hidden justify-start items-start w-full mt-3">
            <div className="flex flex-row justify-between mt-3 capitalize mx-10">
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold">34</p>
                <p className="text-sm">posts</p>
              </div>
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold">50</p>
                <p className="text-sm">followings</p>
              </div>
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold">50</p>
                <p className="text-sm">followers</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex group perspective-1000  items-center justify-center my-2 md:w-[500px] md:h-[300px] w-full h-[150px]">
            <div className="relative w-full h-full">
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180 backface-hidden" : ""
                }`}
              >
                <img src={yellowCard} alt="" className="w-full h-full" />
              </div>
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "" : "rotate-y-180 backface-hidden"
                }`}
              >
                <img src={yellowCardBack} alt="" className="w-full h-full" />
              </div>
              <button
                onClick={handleSwapClick}
                className="absolute bottom-0 right-0 m-3 bg-white rounded-full p-2 shadow-md z-10"
              >
                <FontAwesomeIcon icon={faRightLeft} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden font-header mt-4 text-lg md:h-[135px] w-[140px] overflow-ellipsis">
        {/* <p className="text-sm  font-semibold">wissam_98</p> */}
        <p className="md:text-2xl text-lg   font-header font-semibold min-w-[270px]">
          sii advertising & media company
        </p>
        <p className="text-sm font-header text-secondary font-bold">
          Media Agency
        </p>
        <p className="text-base">
          this is bio <br />
          Software Engineer <br />
          Master Web Science
        </p>
      </div>

      <div className="md:hidden group perspective-1000 flex items-center justify-center my-2 md:w-[500px] md:h-[300px] w-full h-[210px]">
        <div className="relative w-full h-full mx-10 md:mx-0">
          <div
            className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180 backface-hidden" : ""
            }`}
          >
            <img src={yellowCard} alt="" className="w-full h-full" />
          </div>
          <div
            className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "" : "rotate-y-180 backface-hidden"
            }`}
          >
            <img src={yellowCardBack} alt="" className="w-full h-full" />
          </div>
          <button
            onClick={handleSwapClick}
            className="absolute bottom-0 right-0 m-3 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FontAwesomeIcon icon={faRightLeft} />
          </button>
        </div>
      </div>
      <div className="md:mt-10 mt-3 w-full">
        {/* <div className="flex md:space-x-20 space-x-4 justify-center items-center   ">
          {socialMediaIcons.map((item, index) => (
            <div
              key={index}
              className="rounded-lg md:w-12 md:h-12 w-12 h-12 bg-secondary flex justify-center items-center"
            >
              <div>{item.icon}</div>
            </div>
          ))}
        </div> */}
        <Swiper
          spaceBetween={4}
          slidesPerView={6}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
        >
          {socialMediaIcons.map((item, index) => (
            <SwiperSlide>
              <div
                key={index}
                className="rounded-lg md:w-12 md:h-12 w-12 h-12 bg-secondary flex justify-center items-center"
              >
                <div>{item.icon}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-col items-center">
  //     <div className="grid grid-flow-col grid-cols-2 gap-14">
  //       <img
  //         src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
  //         alt="profile"
  //         className="rounded-lg"
  //         width={150}
  //       />
  //       <div className="flex flex-col text-primary font-header">
  //         <div className="flex flex-row justify-between items-center">
  //           <p className="text-2xl font-header">wissam_98</p>
  //           <div className="flex flex-row space-x-5">
  //             <FontAwesomeIcon icon={faEdit} />
  //             <FontAwesomeIcon icon={faQrcode} />
  //             <FontAwesomeIcon icon={faGear} />
  //           </div>
  //         </div>
  //         <div className="flex flex-row space-x-5 mt-3 capitalize">
  //           <p className="text-primary">
  //             <span className="font-semibold">70</span> posts
  //           </p>
  //           <p className="text-primary">
  //             <span className="font-semibold">70</span> following
  //           </p>
  //           <p className="text-primary">
  //             <span className="font-semibold">70</span> followers
  //           </p>
  //         </div>
  //         <div className="flex flex-col mt-3">
  //           <p className="font-bold">Wissam Kahwaji</p>
  //           <p className="text-secondary font-semibold font-header text-sm">
  //             Software Engineer
  //           </p>
  //           <p className="">
  //             this is bio <br />
  //             Software Engineer <br />
  //             Master Web Science
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="group perspective-1000 flex items-center justify-center my-5 w-[500px] h-[300px]">
  //       <div className="relative w-full h-full">
  //         <div
  //           className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
  //             isFlipped ? "rotate-y-180 backface-hidden" : ""
  //           }`}
  //         >
  //           <img src={yellowCard} alt="" className="w-full h-full" />
  //         </div>
  //         <div
  //           className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
  //             isFlipped ? "" : "rotate-y-180 backface-hidden"
  //           }`}
  //         >
  //           <img src={yellowCardBack} alt="" className="w-full h-full" />
  //         </div>
  //         <button
  //           onClick={handleSwapClick}
  //           className="absolute top-0 left-0 m-3 bg-white rounded-full p-2 shadow-md z-10"
  //         >
  //           <FontAwesomeIcon icon={faRightLeft} />
  //         </button>
  //       </div>
  //     </div>
  //     {/* Stories Section */}
  //     <div className="mt-10">
  //       <div className="flex space-x-20">
  //         {socialMediaIcons.map((item, index) => (
  //           <div
  //             key={index}
  //             className="rounded-lg w-12 h-12 bg-secondary flex justify-center items-center"
  //           >
  //             <div>{item.icon}</div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ProfileHeader;
