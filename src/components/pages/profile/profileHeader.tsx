import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaYoutube, FaLink } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import {
  faEdit,
  faGear,
  faQrcode,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import yellowCard from "../../../assets/yellow_card.png";
import yellowCardBack from "../../../assets/yellow_card_back.png";
import { useState } from "react";

const ProfileHeader = () => {
  const socialMediaIcons = [
    { icon: <FaLink className="w-5 h-5" />, link: "" },
    { icon: <FaFacebook className="w-5 h-5" />, link: "" },
    { icon: <FaInstagram className="w-5 h-5" />, link: "" },
    { icon: <BsWhatsapp className="w-5 h-5" />, link: "" },
    { icon: <FaYoutube className="w-5 h-5" />, link: "" },
    { icon: <FaThreads className="w-5 h-5" />, link: "" },
  ];

  const [isFlipped, setIsFlipped] = useState(false);
  const handleSwapClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-flow-col grid-cols-2 gap-14">
        <img
          src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          alt="profile"
          className="rounded-full"
          width={150}
        />
        <div className="flex flex-col text-primary font-header">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-header">wissam_98</p>
            <div className="flex flex-row space-x-5">
              <FontAwesomeIcon icon={faEdit} />
              <FontAwesomeIcon icon={faQrcode} />
              <FontAwesomeIcon icon={faGear} />
            </div>
          </div>
          <div className="flex flex-row space-x-5 mt-3 capitalize">
            <p className="text-primary">
              <span className="font-semibold">70</span> posts
            </p>
            <p className="text-primary">
              <span className="font-semibold">70</span> following
            </p>
            <p className="text-primary">
              <span className="font-semibold">70</span> followers
            </p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="font-bold">Wissam Kahwaji</p>
            <p className="">
              this is bio <br />
              Software Engineer <br />
              Master Web Science
            </p>
          </div>
        </div>
      </div>
      <div className="group perspective-1000 flex items-center justify-center my-5 w-[500px] h-[300px]">
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
            className="absolute top-0 left-0 m-3 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FontAwesomeIcon icon={faRightLeft} />
          </button>
        </div>
      </div>
      {/* Stories Section */}
      <div className="mt-10">
        <div className="flex space-x-20">
          {socialMediaIcons.map((item, index) => (
            <div
              key={index}
              className="rounded-lg w-12 h-12 bg-secondary flex justify-center items-center"
            >
              <div>{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
