import CourseCard from "./CourseCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const CoursesSection = () => {
  const navigate = useNavigate();
  const responsive = {
    xxl: {
      breakpoint: { max: 5000, min: 1536 },
      items: 6,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 5,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
    },
    md: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 640, min: 0 },
      items: 1.5,
    },
  };

  return (
    <div className="mt-5 mx-4 md:mx-16">
      <h2 className="font-header font-bold text-xl md:text-2xl text-navBackground">
        A broad selection of courses
      </h2>
      <p className="mt-2 text-base md:text-lg font-header text-navBackground font-semibold">
        Choose from over 210,000 online video courses with new additions
        published every month
      </p>
      <div className="mt-10 flex flex-wrap gap-4 text-base md:text-xl font-semibold text-gray-500 cursor-pointer">
        <h3 className="hover:text-black">Python</h3>
        <h3 className="hover:text-black">Excel</h3>
        <h3 className="hover:text-black">Web Development</h3>
        <h3 className="hover:text-black text-black">JavaScript</h3>
        <h3 className="hover:text-black">Data Science</h3>
        <h3 className="hover:text-black">AWS Certificate</h3>
        <h3 className="hover:text-black">Drawing</h3>
      </div>
      <div className="mt-3 text-left w-full border border-gray-300 p-4 md:p-7 font-header">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Grow your software development skills with JavaScript
        </h2>
        <p className="text-sm md:text-base">
          JavaScript is a text-based computer programming language used to make
          dynamic web pages. A must-learn for aspiring web developers or
          programmers, JavaScript can be used for features like image carousels,
          displaying countdowns and timers, and playing media on a webpage. With
          JavaScript online classes, you can learn to how develop your
          applications.
        </p>
        <button
          className="mt-3 font-semibold px-3 py-2 md:px-4 md:py-3 bg-navBackground text-secondary rounded-md"
          onClick={() => navigate("/courses/category")}
        >
          Explore JavaScript
        </button>
        <div className="mt-3">
          <Carousel
            removeArrowOnDeviceType={["xs"]}
            responsive={responsive}
            className="w-full"
          >
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-56 px-2">
                <CourseCard />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="my-20 flex flex-col w-full">
        <p className="text-xl md:text-2xl font-semibold text-navBackground">
          Most Popular Courses
        </p>
        <div className="mt-3 w-full">
          <Carousel
            removeArrowOnDeviceType={["xs"]}
            responsive={responsive}
            className="w-full"
          >
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-56 px-2">
                <CourseCard />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
