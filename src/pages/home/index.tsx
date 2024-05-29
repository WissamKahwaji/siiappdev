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

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  }, [isAuthenticated, navigate]);

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
