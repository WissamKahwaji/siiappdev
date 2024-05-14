import { useState } from "react";
import ProfilePost from "./ProfilePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faTable,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";

const posts = [
  {
    imageUrl:
      "https://blog.hootsuite.com/wp-content/uploads/2022/06/best-time-to-post-on-instagram.png",
  },
  {
    imageUrl:
      "https://blog.hootsuite.com/wp-content/uploads/2022/10/social-media-strategy-556x556.png",
  },
  {
    imageUrl:
      "https://www.socialpilot.co/wp-content/uploads/2022/02/Best-Times-to-Post-on-Social-Media-in-2022.jpg",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_rggXGcRVLU_tg1PK84DXpRHXse640MPOkg&usqp=CAU",
  },
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Piktogramm_Post.svg",
  },
];

const ProfilePosts = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="md:mx-40 w-full md:w-auto">
      {/* <ul className="flex flex-row p-2 text-sm items-center justify-center border-t text-primary md:h-16 h-2 lg:hidden">
        <li className="flex-1 text-center">
          <strong className="text-black block"></strong>
        </li>
      </ul> */}
      <div className=" grid grid-cols-4 grid-flow-row  font-semibold text-2xl  border-t uppercase text-secondary tracking-widest md:h-16 h-8 lg:text-xs mt-4">
        <a
          href="#"
          className={`${
            activeTab === "posts"
              ? "text-secondary border-t-2 border-secondary pt-2 md:pt-0"
              : "text-black"
          }  flex justify-center items-center w-full h-full md:mr-16 mr-8 cursor-pointer `}
          onClick={() => handleTabClick("posts")}
        >
          <div
            className={`bg-secondary p-2  justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon icon={faTable} className="text-black" />
            <span className=" lg:inline-block ml-2 text-black text-xs">
              Posts
            </span>
          </div>
        </a>
        <a
          href="#"
          className={`${
            activeTab === "videos"
              ? "text-secondary border-t-2 border-secondary pt-2 md:pt-0"
              : "text-black"
          } flex justify-center items-center w-full  h-full md:mr-16 mr-8 cursor-pointer   ml-2`}
          onClick={() => handleTabClick("videos")}
        >
          <div
            className={`bg-secondary p-2  justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon icon={faVideo} className="text-black" />
            <span className=" lg:inline-block ml-2 text-black text-xs">
              Videos
            </span>
          </div>
        </a>
        <a
          href="#"
          className={`${
            activeTab === "saves"
              ? "text-secondary border-t-2 border-secondary pt-2 md:pt-0"
              : "text-black"
          } flex justify-center items-center w-full  h-full mr-8 cursor-pointer   ml-2`}
          onClick={() => handleTabClick("saves")}
        >
          <div
            className={`bg-secondary p-2  justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon icon={faBookmark} className="text-black" />
            <span className="  lg:inline-block ml-2 text-black text-xs">
              Saves
            </span>
          </div>
        </a>
        <a
          href="#"
          className={`${
            activeTab === "likes"
              ? "text-secondary border-t-2 border-secondary pt-2 md:pt-0"
              : "text-black"
          } flex justify-center items-center w-full  h-full mr-8 cursor-pointer`}
          onClick={() => handleTabClick("likes")}
        >
          <div
            className={`bg-secondary  p-2  justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="text-black" />
            <span className=" lg:inline-block ml-2 text-black text-xs">
              Likes
            </span>
          </div>
        </a>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-3 gap-2 lg:gap-1 py-10">
        {activeTab === "posts" &&
          posts.map((post, index) => (
            <ProfilePost key={index} imageUrl={post.imageUrl} />
          ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
