import { faInfoCircle, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { responsive } from "../../constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CourseCard from "../../components/pages/courses/CourseCard";
import CourseCardHorizontal from "../../components/pages/courses/CourseCardHorizontal";

const CoursesPage = () => {
  const courses = [
    {
      image: "https://i.ytimg.com/vi/o1IaduQICO0/maxresdefault.jpg", // Replace with actual image URL
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      instructor: "Jonas Schmedtmann",
      rating: 4.7,
      reviews: 205547,
      hours: 68.5,
      lectures: 321,
      level: "All Levels",
      price: 14.99,
      originalPrice: 109.99,
      bestseller: true,
    },
    {
      image: "https://i.ytimg.com/vi/o1IaduQICO0/maxresdefault.jpg", // Replace with actual image URL
      title: "JavaScript: Understanding the Weird Parts",
      instructor: "Anthony Alicea",
      rating: 4.7,
      reviews: 48003,
      hours: 12,
      lectures: 89,
      level: "All Levels",
      price: 12.99,
      originalPrice: 74.99,
      bestseller: false,
    },
  ];
  return (
    <div className="font-header mx-4 md:mx-10 flex flex-col items-start justify-start pt-6 md:pt-10">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-navBackground">
        JavaScript Courses
      </h2>
      <p className="mt-3 text-gray-600 text-lg font-semibold">
        JavaScript relates to{" "}
        <span className="text-secondary font-bold">
          DevelopmentIT & Software
        </span>
      </p>
      <div className="flex items-center space-x-1 text-sm mt-1">
        <FontAwesomeIcon icon={faPeopleGroup} />
        <p>16,333,738 learners</p>
      </div>
      <h2 className="mt-7 text-xl md:text-2xl font-semibold text-navBackground">
        Courses to get you started
      </h2>
      <div className="mt-10  w-full border-b  border-gray-200 flex flex-row md:space-x-10 space-x-4 font-serif">
        <div className="border-b-2 border-secondary">
          <p className="font-bold md:text-lg text-sm text-secondary">
            Most Popular
          </p>
        </div>
        <div>
          <p className="font-bold md:text-lg text-sm text-gray-600">New</p>
        </div>
        <div>
          <p className="font-bold md:text-lg text-sm text-gray-600">
            Bignner Favorites
          </p>
        </div>
      </div>
      <div className="mt-3 flex w-full">
        <Carousel
          removeArrowOnDeviceType={"xs"}
          responsive={responsive}
          className="w-full"
        >
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
          <div className="w-56">
            <CourseCard />
          </div>
        </Carousel>
      </div>
      <div className="mt-20 felx flex-col w-full">
        <p className=" text-2xl font-semibold text-navBackground">
          Top courses in{" "}
          <span className="text-secondary font-bold">JavaScript</span>
        </p>
        <div className="mt-3 flex w-full">
          <Carousel
            removeArrowOnDeviceType={"xs"}
            responsive={responsive}
            className="w-full"
          >
            <div className="w-56">
              <CourseCard />
            </div>
            <div className="w-56">
              <CourseCard />
            </div>
            <div className="w-56">
              <CourseCard />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col mt-8 md:mt-16 ">
        <p className="text-xl md:text-2xl font-bold text-navBackground font-serif">
          All JavaScript courses
        </p>
        <p className="text-gray-800 mt-2 w-full md:w-3/5">
          Join more than 12 million learners and train up on JavaScript on
          Udemy. Choose from a wide range of top-rated JavaScript courses. From
          back-end development to app or website building, we’ve got you
          covered. Our real-world experts can lead you through hands-on projects
          to apply your skills.
        </p>
        <div className="flex items-center space-x-4 my-8 bg-navBackground text-secondary text-lg p-5 font-semibold">
          <FontAwesomeIcon icon={faInfoCircle} className="w-8 h-8" />
          <p> Not sure? All courses have a 30-day money-back guarantee</p>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row space-x-6">
            <div className="border border-gray-800 px-3 py-2 font-bold text-navBackground">
              Filter
            </div>
            <div className="border border-gray-800 px-3 py-2 font-bold text-navBackground">
              Sort By{" "}
            </div>
          </div>
          <p className="font-bold text-gray-600 text-lg">1,280 results</p>
        </div>
      </div>
      <div className="container mx-auto p-4">
        {courses.map((course, index) => (
          <CourseCardHorizontal key={index} {...course} />
        ))}
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default CoursesPage;
