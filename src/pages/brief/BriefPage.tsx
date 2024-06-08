import { useEffect, useState } from "react";
import logo_video from "../../assets/video_logo.mp4";
import card from "../../assets/card_front_last.png";
import yellowCardBack from "../../assets/card_back_last.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const BriefPage = () => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSwapClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const video = document.getElementById("logoVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.log("Auto-play was prevented, trying to play manually", error);
      });
    }
  }, []);

  return (
    <div className="flex flex-col font-header">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10 md:mt-12 ">
        <video
          id="logoVideo"
          autoPlay
          playsInline
          muted
          loop
          className="object-contain w-full h-full"
        >
          <source src={logo_video} type="video/mp4" />
        </video>
        <div className="mt-5 md:mt-0">
          <p>{t("first_brief")}</p>
          <br />
          <p>{t("second_brief")}</p>
          <br />
          <p>{t("third_brief")}</p>
          <br />
          <p>{t("forth_brief")}</p>
        </div>
      </div>
      <div className="bg-seconBackground my-16 py-12 px-10 ">
        <p className=" text-center text-3xl font-serif mb-10 md:mb-20">
          {t("sii_card")}
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="md:mx-32">
            <div className="relative w-full justify-center flex h-[200px] md:h-[250px]  mb-10">
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180 backface-hidden" : ""
                }`}
              >
                <img src={card} alt="Card Back" className="w-full h-full" />
              </div>
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "" : "rotate-y-180 backface-hidden"
                }`}
              >
                <img
                  src={yellowCardBack}
                  alt="Card Front"
                  className="w-full h-full"
                />
              </div>
              <button
                type="button"
                onClick={handleSwapClick}
                className="absolute top-0 left-9 transform -translate-x-1/2 m-3 bg-white rounded-full w-14 p-2 shadow-md z-10 flex justify-center items-center "
              >
                <FontAwesomeIcon icon={faRightLeft} />
              </button>
            </div>
          </div>
          <div>
            <p>{t("sii_brief")}</p>
            <br />
            <p>{t("sii_brief_second")}</p>
            <br />
            <p>{t("sii_brief_third")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefPage;
