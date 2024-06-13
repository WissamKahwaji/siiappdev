import { useState } from "react";

interface FolderCardProps {
  image: string;
  name: string;
  onClick?(): void;
}

const FolderCard = ({ image, name, onClick }: FolderCardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div
      className={`relative overflow-hidden  pt-[100%] cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div className="absolute inset-0 object-contain w-full h-full">
        <div
          className={`bg-gray-800 bg-opacity-60 h-full w-full absolute inset-0 z-10 flex items-center justify-center text-white ${
            showOverlay ? "" : "hidden"
          }`}
        ></div>
        <img src={image} alt="folder Icon" className="w-full object-contain" />
        <div className="absolute bottom-0 flex items-center justify-center left-0 w-full bg-secondary bg-opacity-75 text-navBackground font-semibold text-center p-2 text-[8px]  md:text-base">
          {/* <img
                      src={folderIcon}
                      alt=""
                      className="md:w-7 md:h-7 md:mr-2 w-5 h-5 mr-1"
                    /> */}
          <p className="line-clamp-2">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
