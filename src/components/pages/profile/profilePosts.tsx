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
    <div className="mx-40">
      <ul className="flex flex-row p-2 text-sm items-center justify-center border-t text-primary h-16 lg:hidden">
        {/* Render tabs */}
        <li className="flex-1 text-center">
          <strong className="text-black block"></strong>
        </li>
      </ul>
      <div className="flex flex-row font-semibold text-2xl items-center justify-center border-t uppercase text-secondary tracking-widest h-16 lg:text-xs mt-4">
        {/* Tab navigation */}
        <a
          href="#"
          className={`${
            activeTab === "posts"
              ? "text-secondary border-t-2 border-secondary"
              : "text-black"
          }  flex justify-center items-center h-full mr-16 cursor-pointer `}
          onClick={() => handleTabClick("posts")}
        >
          <div
            className={`${
              activeTab === "posts" ? "bg-secondary" : "bg-black"
            }  h-6 w-6 justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon
              icon={faTable}
              className={`${
                activeTab === "posts" ? "text-black" : "text-secondary"
              }`}
            />
          </div>
          <span className="lg:inline-block ml-2">Posts</span>
        </a>
        <a
          href="#"
          className={`${
            activeTab === "videos"
              ? "text-secondary border-t-2 border-secondary"
              : "text-black"
          } flex justify-center items-center h-full mr-16 cursor-pointer `}
          onClick={() => handleTabClick("videos")}
        >
          <div
            className={`${
              activeTab === "videos" ? "bg-secondary" : "bg-black"
            }  h-6 w-6 justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon
              icon={faVideo}
              className={`${
                activeTab === "videos" ? "text-black" : "text-secondary"
              }`}
            />
          </div>
          <span className="lg:inline-block ml-2">Videos</span>
        </a>
        <a
          href="#"
          className={`${
            activeTab === "saves"
              ? "text-secondary border-t-2 border-secondary"
              : "text-black"
          } flex justify-center items-center h-full mr-16 cursor-pointer `}
          onClick={() => handleTabClick("saves")}
        >
          <div
            className={`${
              activeTab === "saves" ? "bg-secondary" : "bg-black"
            }  h-6 w-6 justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className={`${
                activeTab === "saves" ? "text-black" : "text-secondary"
              }`}
            />
          </div>
          <span className="lg:inline-block ml-2">Saves</span>
        </a>
        <a
          href="#"
          className={`${
            activeTab === "likes"
              ? "text-secondary border-t-2 border-secondary"
              : "text-black"
          } flex justify-center items-center h-full mr-16 cursor-pointer `}
          onClick={() => handleTabClick("likes")}
        >
          <div
            className={`${
              activeTab === "likes" ? "bg-secondary" : "bg-black"
            }  h-6 w-6 justify-center items-center flex rounded-sm`}
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`${
                activeTab === "likes" ? "text-black" : "text-secondary"
              }`}
            />
          </div>
          <span className="lg:inline-block ml-2">Likes</span>
        </a>
      </div>
      <div className="grid grid-cols-4 gap-1 lg:gap-1">
        {activeTab === "posts" &&
          posts.map((post, index) => (
            <ProfilePost key={index} imageUrl={post.imageUrl} />
          ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
