import { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faFile,
  faTable,
  faThumbsUp,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { PostModel } from "../../../apis/posts/type";
import Modal from "../../const/Modal";
import { useNavigate, useParams } from "react-router-dom";
import PostDetails from "../post/PostDetails";

import {
  useGetUserLikedPostsQuery,
  useGetUserSavedPostsQuery,
} from "../../../apis/account/queries";
import {
  useGetUserDocsPostsQuery,
  useGetUserPostsQuery,
  useGetUserVideosPostsQuery,
} from "../../../apis/posts/queries";
import { SyncLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";

interface ProfilePostsProps {
  userId: string;
}

const ProfilePosts = (props: ProfilePostsProps) => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const { postId } = useParams<{ postId?: string }>();

  const {
    data: postsInfo,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetUserPostsQuery("image", props.userId);

  const { data: likedPosts, isLoading, isError } = useGetUserLikedPostsQuery();

  const {
    data: savedPosts,
    isLoading: isLoadingSavedPosts,
    isError: isErrorSavedPosts,
  } = useGetUserSavedPostsQuery();

  const {
    data: vidoePostsInfo,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useGetUserVideosPostsQuery(props.userId);
  const {
    data: docsPostsInfo,
    isLoading: isLoadingDocs,
    isError: isErrorDocs,
  } = useGetUserDocsPostsQuery(props.userId);

  const handlePostClick = (post: PostModel) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    navigate(`/${post.owner.userName}/${post._id}`, { replace: true });
  };

  const handleCloseModal = (post: PostModel) => {
    setIsModalOpen(false);
    navigate(`/${post.owner.userName}`);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (postId) {
      const post = postsInfo && postsInfo.find(p => p._id === postId);
      if (post) {
        setSelectedPost(post);
        setIsModalOpen(true);
      }
    }
  }, [postId, postsInfo]);

  const tabs = isAuthenticated
    ? props.userId === currentUserId
      ? [
          { tab: "posts", icon: faTable, label: "Posts" },
          { tab: "video", icon: faVideo, label: "Videos" },
          { tab: "docs", icon: faFile, label: "Docs" },
          { tab: "saves", icon: faBookmark, label: "Saves" },
          { tab: "likes", icon: faThumbsUp, label: "Likes" },
        ]
      : [
          { tab: "posts", icon: faTable, label: "Posts" },
          { tab: "video", icon: faVideo, label: "Videos" },
          { tab: "docs", icon: faFile, label: "Docs" },
        ]
    : [
        { tab: "posts", icon: faTable, label: "Posts" },
        { tab: "video", icon: faVideo, label: "Videos" },
        { tab: "docs", icon: faFile, label: "Docs" },
      ];

  if (isLoadingPosts) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isErrorPosts) {
    return <div>Error loading posts.</div>;
  }
  return (
    <div className="md:mx-40 w-full md:w-auto">
      <div
        className={`grid ${
          isAuthenticated && props.userId === currentUserId
            ? "grid-cols-5"
            : "grid-cols-3"
        } grid-flow-row font-semibold text-2xl border-t uppercase text-secondary tracking-widest md:h-16 h-8 lg:text-xs mt-4`}
      >
        {tabs.map(({ tab, icon, label }) => (
          <div
            key={tab}
            className={`${
              activeTab === tab
                ? "text-secondary border-t-2 border-secondary pt-2 md:pt-0"
                : "text-black"
            } flex justify-center items-center w-full h-full md:mr-16 mr-8 cursor-pointer`}
            onClick={() => handleTabClick(tab)}
          >
            <div className="p-1 md:p-2 justify-center items-center flex rounded-sm">
              <FontAwesomeIcon
                icon={icon}
                className="text-black w-4 h-4 md:w-6 md:h-6"
              />
              <span className="hidden lg:inline-block ml-2 text-black md:text-xs text-[10px]">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`grid ${
          activeTab === "video"
            ? "md:grid-cols-5 grid-cols-3"
            : "md:grid-cols-4 grid-cols-3"
        } gap-1 lg:gap-1 py-3 md:py-5`}
      >
        {activeTab === "posts" &&
          postsInfo &&
          postsInfo.map((post, index) => (
            <div key={index} onClick={() => handlePostClick(post)}>
              <ProfilePost isVideo={false} post={post} />
            </div>
          ))}
        {activeTab === "video" &&
          !isLoadingVideos &&
          !isErrorVideos &&
          vidoePostsInfo?.map((post: PostModel, index: number) => (
            <div key={index} onClick={() => handlePostClick(post)}>
              <ProfilePost isVideo={true} post={post} />
            </div>
          ))}
        {activeTab === "video" && isLoadingVideos && <p>Loading...</p>}
        {activeTab === "video" && isErrorVideos && (
          <p>Error loading video posts.</p>
        )}
        {activeTab === "docs" &&
          !isLoadingDocs &&
          !isErrorDocs &&
          docsPostsInfo?.map((post: PostModel, index: number) => (
            <div key={index} onClick={() => handlePostClick(post)}>
              <ProfilePost isVideo={false} post={post} />
            </div>
          ))}
        {activeTab === "docs" && isLoadingDocs && <p>Loading...</p>}
        {activeTab === "docs" && isErrorDocs && (
          <p>Error loading docs posts.</p>
        )}
        {activeTab === "likes" &&
          !isLoading &&
          !isError &&
          likedPosts?.map((post: PostModel, index: number) => (
            <div key={index} onClick={() => handlePostClick(post)}>
              <ProfilePost isVideo={false} post={post} />
            </div>
          ))}
        {activeTab === "likes" && isLoading && <p>Loading...</p>}
        {activeTab === "likes" && isError && <p>Error loading liked posts.</p>}
        {activeTab === "saves" &&
          !isLoadingSavedPosts &&
          !isErrorSavedPosts &&
          savedPosts?.map((post: PostModel, index: number) => (
            <div key={index} onClick={() => handlePostClick(post)}>
              <ProfilePost isVideo={false} post={post} />
            </div>
          ))}
        {activeTab === "saves" && isLoadingSavedPosts && <p>Loading...</p>}
        {activeTab === "saves" && isErrorSavedPosts && (
          <p>Error loading liked posts.</p>
        )}
      </div>
      {selectedPost && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={() => handleCloseModal(selectedPost)}
          title="Post Info"
          size="md"
        >
          <PostDetails
            selectedPost={selectedPost}
            currentUserId={currentUserId ?? ""}
            onClose={() => handleCloseModal(selectedPost)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProfilePosts;
