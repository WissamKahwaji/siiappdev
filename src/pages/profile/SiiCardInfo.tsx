import { useState } from "react";
import card from "../../assets/sii_card_back.png";
import yellowCardBack from "../../assets/sii_card_front.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useGetUserSiiCardQuery } from "../../apis/sii_card/queries";
import { SyncLoader } from "react-spinners";

const SiiCardInfo = () => {
  const { data: cardInfo, isLoading, isError } = useGetUserSiiCardQuery();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSwapClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isError) return <div>Error loading data...</div>;

  return (
    <div className="flex flex-col justify-center items-center font-header w-full h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-400 flex flex-col items-start justify-start md:max-w-fit max-w-full w-full">
        <h2 className="text-2xl mb-8">Sii Card Info</h2>

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
            onClick={handleSwapClick}
            className="absolute top-0 left-9 transform -translate-x-1/2 m-3 bg-white rounded-full w-14 p-2 shadow-md z-10 flex justify-center items-center "
          >
            <FontAwesomeIcon icon={faRightLeft} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div>
            <p className="text-sm">Full Name</p>
            <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20">
              {cardInfo?.fullName}
            </div>
          </div>
          <div>
            <p className="text-sm">User Name</p>
            <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20">
              {cardInfo?.userName}
            </div>
          </div>
          <div>
            <p className="text-sm">Your Email</p>
            <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20">
              {cardInfo?.email}
            </div>
          </div>
          <div>
            <p className="text-sm">Mobile Number</p>
            <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20">
              {cardInfo?.mobileNumber}
            </div>
          </div>
          <div>
            <p className="text-sm">Card Number</p>
            <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20">
              {cardInfo?._id}
            </div>
          </div>
          <div>
            <p className="text-sm">Qr Code Link</p>
            <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20">
              {cardInfo?.qrCode ??
                `https://www.siiapp.com/${cardInfo?.fullName}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiiCardInfo;
