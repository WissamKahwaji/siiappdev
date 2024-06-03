import { useEffect, useState } from "react";
import Post from "../../components/pages/post/Post";
import { useGetAllPostsQuery } from "../../apis/posts/queries";
import { SyncLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginToast from "../../components/const/LoginToast";
import Modal from "../../components/const/Modal";
import LoginModalContent from "../../components/const/LoginModalContent";
// import logo from "../../assets/logo_sii_new.png";
import logo_video from "../../assets/video_logo.mp4";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to manage splash screen
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

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3100);

    return () => clearTimeout(splashTimeout);
  }, [isAuthenticated, navigate]);

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
        <SyncLoader size={20} />
      </div>
    );
  } else if (isErrorPosts) {
    return <div>Error !!!</div>;
  }

  return (
    <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
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
          title="LogIn"
          size="md"
        >
          <LoginModalContent />
        </Modal>
      )}
    </div>
  );
};

export default Home;
