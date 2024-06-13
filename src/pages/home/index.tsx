import { useEffect, useState } from "react";
import Post from "../../components/pages/post/Post";
import { useGetAllPostsQuery } from "../../apis/posts/queries";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoginToast from "../../components/const/LoginToast";
import Modal from "../../components/const/Modal";
import LoginModalContent from "../../components/const/LoginModalContent";
// import logo from "../../assets/logo_sii_new.png";
import logo_video from "../../assets/video_logo.mp4";
import { useTranslation } from "react-i18next";
import { useGetUserSearchQuery } from "../../apis/account/queries";
import { AiOutlineSearch } from "react-icons/ai";
import LoadingComponent from "../../components/const/LoadingComponent";

const Home = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to manage splash screen
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
  };

  const { data: suggestions, refetch } = useGetUserSearchQuery(searchQuery);
  const {
    data: postsInfo,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetAllPostsQuery();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(
        <LoginToast
          onClose={() => {
            setIsModalOpen(true);
          }}
        />,
        { toastId: "auth" }
      );
    }
    const video = document.getElementById("logoVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.log("Auto-play was prevented, trying to play manually", error);
      });
    }
    if (searchQuery.length > 2 && searchQuery !== "") {
      refetch();
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3100);

    return () => clearTimeout(splashTimeout);
  }, [isAuthenticated, navigate, refetch, searchQuery]);

  if (showSplash) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <img
          src={logo}
          alt="Splash Screen"
          className="w-1/2 h-1/2 object-contain"
        /> */}
        <video
          id="logoVideo"
          autoPlay
          muted
          loop
          playsInline
          className="w-3/4 h-3/4 md:w-1/2 md:h-1/2 object-contain"
        >
          <source src={logo_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (isLoadingPosts) {
    return (
      <div className="text-center flex flex-col justify-center items-center h-screen">
        <LoadingComponent />
      </div>
    );
  } else if (isErrorPosts) {
    return <div>Error !!!</div>;
  }

  return (
    <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
      <div className="md:hidden flex flex-col items-center w-full bg-navBackground rounded p-2 relative mb-5">
        <div className="flex w-full">
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border-none bg-navBackground text-white outline-none font-body px-2 text-lg flex-grow"
          />
          <button
            onClick={handleSearch}
            className="bg-secondary text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineSearch className="text-navBackground" />
          </button>
        </div>
        {showSuggestions && suggestions && (
          <div className="absolute overflow-y-scroll max-h-[200px] top-full left-0 w-full font-body bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
            {suggestions.users.map((user, index) => (
              <Link key={index} to={`/${user.userName}`} reloadDocument>
                <div
                  className="p-2 hover:bg-gray-200 cursor-pointer   border border-b-secondary flex flex-row justify-start items-center gap-x-2"
                  onClick={() => {
                    setShowSuggestions(false);
                    setSearchQuery("");
                  }}
                >
                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-8 h-auto rounded-lg border-2 border-secondary shadow-md shadow-secondary/50"
                  />
                  <p>{user.fullName}</p>
                </div>
              </Link>
            ))}
            {suggestions.posts.map((post, index) => (
              <Link
                key={index}
                to={`/${post.owner.userName}/${post._id}`}
                reloadDocument
              >
                <div
                  className="p-2 hover:bg-gray-200 cursor-pointer line-clamp-2 border border-b-secondary"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                >
                  {post.caption}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {postsInfo && postsInfo.length > 0 ? (
        postsInfo.map((post, index) => (
          <Post key={index} post={post} currentUserId={currentUserId ?? ""} />
        ))
      ) : (
        <div>There are no posts yet !!!</div>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title={t("login")}
          size="md"
        >
          <LoginModalContent />
        </Modal>
      )}
    </div>
  );
};

export default Home;
