import React from "react";

interface CategoryImageProps {
  imgPath: string;
  text: string;
}

const CategoryImage: React.FC<CategoryImageProps> = item => {
  return (
    <div className="flex flex-col items-start justify-start">
      <img
        src={item.imgPath}
        alt=""
        className="md:h-80 md:w-72 h-52 w-52 rounded-md transform hover:scale-105 ease-in-out duration-300 hover:rotate-2"
      />
      <p className="text-gray-800 text-base font-bold">{item.text}</p>
    </div>
  );
};

export default CategoryImage;
