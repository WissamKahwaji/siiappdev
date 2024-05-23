import img1 from "../../../assets/img1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CourseCard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start space-y-2 p-2 md:p-4 mb-2 bg-white shadow-md rounded-lg font-header md:w-[240px] cursor-pointer hover:rotate-2 hover:scale-105 ease-in-out transform duration-300"
      onClick={() => {
        navigate("/courses/course-preview");
      }}
    >
      <img
        src={img1}
        alt="Course"
        className="h-32 md:h-40 w-full rounded-t-lg object-cover"
      />
      <div className="p-2">
        <p className="font-bold text-black text-sm md:text-md">
          Title of Course
        </p>
        <p className="text-xs text-gray-700">Ahmed Ahmed</p>
        <div className="flex items-center space-x-1 mt-1">
          <h3 className="text-orange-800 text-xs font-semibold">4.3</h3>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="text-secondary w-3 md:w-4"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="text-secondary w-3 md:w-4"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="text-secondary w-3 md:w-4"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="text-secondary w-3 md:w-4"
            />
          </div>
          <p className="text-xs text-gray-400">(205,547)</p>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <h3 className="text-navBackground text-sm md:text-md font-bold">
            $22.99
          </h3>
          <h3 className="text-gray-500 text-sm md:text-md line-through">
            $44.99
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
