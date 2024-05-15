import React from "react";
interface CourseCardHorizontal {
  image: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  lectures: number;
  hours: number;
  level: string;
  price: number;
  originalPrice: number;
  bestseller: boolean;
}
const CourseCardHorizontal: React.FC<CourseCardHorizontal> = ({
  image,
  title,
  instructor,
  rating,
  reviews,
  hours,
  lectures,
  level,
  price,
  originalPrice,
  bestseller,
}) => {
  return (
    <div className="bg-white shadow-md rounded-sm overflow-hidden flex flex-col md:flex-row mb-2 border border-gray-300">
      <img className="w-full md:w-1/4 object-cover" src={image} alt={title} />
      <div className="p-4 flex-1">
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">by {instructor}</p>
        <div className="flex items-center mt-2">
          <span className="text-secondary font-bold">⭐ {rating}</span>
          <span className="ml-2 text-gray-400 text-sm">
            ({reviews} reviews)
          </span>
        </div>
        <div className="text-gray-600 mt-2 text-sm">
          <span>{hours} total hours</span> • <span>{lectures} lectures</span> •{" "}
          <span>{level}</span>
        </div>
        {bestseller && (
          <span className="inline-block bg-secondary text-black text-xs px-2 py-1 font-bold mt-2">
            Best seller
          </span>
        )}
        <div className="mt-4 flex items-center">
          <span className="text-xl md:text-2xl font-bold">${price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through ml-2">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
