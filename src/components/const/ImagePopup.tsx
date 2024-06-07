import React, { useState } from "react";

interface ImagePopupProps {
  src: string;
  alt: string;
  smallClassName?: string;
  largeClassName?: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  src,
  alt,
  smallClassName = "",
  largeClassName = "",
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer ${smallClassName}`}
        onClick={handleImageClick}
      />

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative">
            <img
              src={src}
              alt={alt}
              className={`object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 ${largeClassName}`}
            />
            <button
              className="absolute top-2 right-2 text-white bg-secondary rounded-full p-2 "
              onClick={closePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePopup;
