import { faCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdArrowDropUp } from "react-icons/md";

const CourseDetails = () => {
  const [showFullBrief, setShowFullBrief] = useState(false);
  const toggleBrief = () => {
    setShowFullBrief(!showFullBrief);
  };

  const description = `If you're an office worker, student, administrator, or just want to become more productive with your computer, programming will allow you write code that can automate tedious tasks. This course follows the popular (and free!) book, Automate the Boring Stuff with Python.
Automate the Boring Stuff with Python was written for people who want to get up to speed writing small programs that do practical tasks as soon as possible. You don't need to know sorting algorithms or object-oriented programming, so this course skips all the computer science and concentrates on writing code that gets stuff done.
This course is for complete beginners and covers the popular Python programming language. You'll learn basic concepts as well as:
  
  Web scraping
  Parsing PDFs and Excel spreadsheets
  Automating the keyboard and mouse
  Sending emails and texts
  And several other practical topics
  By the end of this course, you'll be able to write code that not only dramatically increases your productivity, but also be able to list this fun and creative skill on your resume.`;

  const requirments = [
    "No programming experience is required.",
    "Downloading and installing Python is covered at the start of the course.",
    "Basic computer skills: surfing websites, running programs, saving and opening documents, etc.",
  ];

  const learningPoints = [
    "Automate tasks on their computer by writing simple Python programs.",
    `Write programs that can do text pattern recognition with "regular expressions".`,
    "Programmatically generate and update Excel spreadsheets.",
    "Parse PDFs and Word documents.",
    "Crawl web sites and pull information from online sources",
    "Write programs that send out email notifications.",
  ];
  return (
    <div className="mx-4 my-5 font-header flex flex-col items-start justify-start ">
      <h2 className="text-navBackground font-bold text-2xl font-header">
        Automate the Boring Stuff with Python Programming
      </h2>
      <p className="text-gray-700 text-lg my-2">
        A practical programming course for office workers, academics, and
        administrators who want to improve their productivity.
      </p>
      <div className="flex items-center mt-2">
        <span className="text-secondary font-bold">⭐ 4</span>
        <span className="ml-2 text-gray-700 text-sm">(112,750 reviews)</span>
        <span className="text-gray-600 text-sm ml-2">1,124,693 students</span>
      </div>
      <p className="text-gray-800 font-header text-base">
        created by{" "}
        <span className="font-semibold text-blue-600 underline mt-1">
          Afsad kah
        </span>
      </p>
      <div className="text-gray-600 mt-2 text-sm">
        <span>50 total hours</span> • <span>15 lectures</span> •{" "}
        <span>All Levels</span>
      </div>
      <div className="my-5 p-4 rounded-sm border border-gray-600">
        <p className="font-serif text-2xl text-navBackground font-bold">
          What you'll learn
        </p>
        <div className="grid grid-cols-2 gap-x-4 text-sm">
          {learningPoints.map((item, index) => (
            <div key={index} className="flex items-start justify-start mt-5">
              {/* <FontAwesomeIcon icon={faCheck} className="text-secondary" /> */}
              <FaCheck className="text-secondary w-4 h-4" />
              <p className="text-gray-700 ml-4">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-2xl font-bold font-serif text-black mb-4">
          Course content
        </h1>
        <div className=" overflow-hidden  border border-gray-400 rounded-md flex flex-col w-[880px]">
          <div className="flex justify-between items-center p-3 bg-gray-200 border border-gray-300">
            <div className="font-bold flex space-x-2">
              <div>Module 1 - </div>
              <div>Introduction</div>
            </div>
            <MdArrowDropUp className="w-7 h-7" />
          </div>
          <div className="flex flex-col space-y-6 px-3 py-5">
            <div className=" text-xl flex  justify-between items-center">
              <div className="flex space-x-2">
                <FontAwesomeIcon icon={faLock} />
                <p className="text-sm text-gray-500 font-header">
                  Introduction to course content
                </p>
              </div>
              <p className="text-sm text-gray-500">4:41m</p>
            </div>
            <div className=" text-xl flex  justify-between items-center">
              <div className="flex space-x-2">
                <FontAwesomeIcon icon={faLock} />
                <p className="text-sm text-gray-500 font-header">
                  Introduction to course content
                </p>
              </div>
              <p className="text-sm text-gray-500">4:41m</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold font-serif text-black mb-4">
          Requirements
        </h1>
        {requirments.map(item => (
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faCircle}
              className="w-2 h-2 text-gray-800"
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h1 className="text-2xl font-bold font-serif text-black mb-4">
          Description
        </h1>
        <div className="text-gray-700 whitespace-pre-wrap text-sm font-serif">
          {showFullBrief ? description : description.slice(0, 600)}
          {description && description.length! > 100 && (
            <span
              className="cursor-pointer text-blue-600"
              onClick={toggleBrief}
            >
              {showFullBrief ? " Show Less" : " Show More"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
