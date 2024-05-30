import { useState, useEffect } from "react";
import { FormikHelpers } from "formik";
import { SyncLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import {
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useToggleLikeMutaion,
  useToggleSaveMutaion,
} from "../../../apis/posts/queries";

import { PostInputProps, PostModel } from "../../../apis/posts/type";
import EditPostDetails from "./EditPostDetails";
import OptionsModal from "./OptionsModal";
import { Link } from "react-router-dom";
import { PiHandsClappingFill, PiHandsClappingThin } from "react-icons/pi";
import { toast } from "react-toastify";
import LoginToast from "../../const/LoginToast";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../const/Modal";
import LoginModalContent from "../../const/LoginModalContent";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
// import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PostDetailsProps {
  selectedPost: PostModel;
  currentUserId: string;
  onClose: () => void;
}

const PostDetails = ({
  selectedPost,
  currentUserId,
  onClose,
}: PostDetailsProps) => {
  const { isAuthenticated } = useAuth();
  const { mutate: toggleLike } = useToggleLikeMutaion();
  const { mutate: toggleSave } = useToggleSaveMutaion();
  const { mutate: editPostInfo } = useEditPostMutation();
  const { mutate: deletePostInfo } = useDeletePostMutation();

  const {
    data: postInfo,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useGetPostByIdQuery(selectedPost._id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(selectedPost.likes?.length ?? 0);
  const [isSaved, setIsSaved] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showFullBrief, setShowFullBrief] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const toggleBrief = () => {
    setShowFullBrief(!showFullBrief);
  };
  useEffect(() => {
    if (selectedPost.likes?.includes(currentUserId)) {
      setIsLiked(true);
    }
    if (selectedPost.saves?.includes(currentUserId)) {
      setIsSaved(true);
    }
    const element = document.getElementById(`post-caption-${postInfo?._id}`);
    if (element && element.scrollHeight > element.clientHeight) {
      setShouldShowToggle(true);
    } else {
      setShouldShowToggle(false);
    }
  }, [selectedPost.likes, selectedPost.saves, currentUserId, postInfo?._id]);

  const handleToggleLike = () => {
    if (!isAuthenticated) {
      toast.error(
        <LoginToast
          onClose={() => {
            setIsLoginModalOpen(true);
          }}
        />,
        { toastId: "auth" }
      );
    } else {
      toggleLike(selectedPost._id);
      setIsLiked(!isLiked);
      setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
    }
  };

  const handleToggleSave = () => {
    if (!isAuthenticated) {
      toast.error(
        <LoginToast
          onClose={() => {
            setIsLoginModalOpen(true);
          }}
        />,
        { toastId: "auth" }
      );
    } else {
      toggleSave(selectedPost._id);
      setIsSaved(!isSaved);
    }
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleEditPost = (
    values: PostInputProps,
    { setSubmitting }: FormikHelpers<PostInputProps>
  ) => {
    editPostInfo(values, {
      onSettled() {
        setSubmitting(false);
        setIsEditModalOpen(false);
      },
    });
  };

  const handleDeletePost = () => {
    deletePostInfo(selectedPost._id);
    setIsOptionsModalOpen(false);
    onClose();
  };

  if (isLoadingPost)
    return (
      <div className="text-center h-fit flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  if (isErrorPost) return <div></div>;

  const renderPostContent = () => {
    switch (postInfo?.postType) {
      case "image":
        return (
          <img
            src={postInfo.images[0]}
            alt="Post"
            className="md:w-full md:h-full w-full h-full object-contain rounded-lg"
          />
        );
      case "video":
        return (
          <video
            controls
            className="md:w-full md:h-full w-full h-full object-contain rounded-lg"
          >
            <source src={postInfo.postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "doc":
        return (
          <div
            className="relative border rounded-lg overflow-hidden cursor-pointer w-[320px] md:w-full"
            onClick={() => window.open(postInfo.postDocs, "_blank")}
          >
            <img
              src="https://techterms.com/img/lg/pdf_109.png"
              alt="PDF Icon"
              className="w-full h-[200px] md:h-[300px] object-contain"
            />
            <div className="absolute bottom-0 left-0 w-full bg-secondary bg-opacity-75 text-xs text-navBackground font-semibold text-center p-2">
              {postInfo.postDocs
                ? postInfo.postDocs.split("/").pop()
                : "Document"}
            </div>
          </div>
          // <div className="relative w-full h-full">
          //   <a
          //     href={postInfo.postDocs}
          //     target="_blank"
          //     rel="noopener noreferrer"
          //   >
          //     <Document
          //       file={postInfo.postDocs}
          //       className="w-full h-[240px] border border-secondary"
          //     >
          //       <Page pageNumber={1} width={300} />
          //     </Document>
          //   </a>
          //   <div className="absolute bottom-0 left-0 w-full text-center bg-secondary bg-opacity-50 text-navBackground text-sm py-1">
          //     {postInfo.postDocs
          //       ? postInfo.postDocs.split("/").pop()
          //       : "Document"}
          //   </div>
          // </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full font-header">
      <div className="md:w-1/2 w-full flex flex-col items-center">
        {renderPostContent()}
      </div>

      <div className="md:w-1/2 w-full flex flex-col p-4">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <img
              src={
                postInfo?.owner.profileImage ?? "https://via.placeholder.com/40"
              }
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <p className="text-navBackground font-serif">
              {postInfo?.owner.fullName}
            </p>
          </div>
          {postInfo?.owner._id === currentUserId && (
            <FontAwesomeIcon
              icon={faEllipsis}
              className="cursor-pointer"
              onClick={() => setIsOptionsModalOpen(true)}
            />
          )}
        </div>
        <hr className="mb-4" />

        <div className="mb-4 text-start whitespace-pre-wrap   justify-start items-start ">
          {/* <p> {postInfo?.caption}</p> */}

          <div
            id={`post-caption-${postInfo?._id}`}
            className={`text-gray-600 whitespace-pre-wrap font-serif text-sm ${
              !showFullBrief ? "clamp-3-lines" : ""
            }`}
          >
            {postInfo?.caption}
          </div>
          {shouldShowToggle && (
            <span
              className="cursor-pointer text-gray-400 text-xs"
              onClick={toggleBrief}
            >
              {showFullBrief ? " Show Less" : " Show More"}
            </span>
          )}

          {postInfo?.whatsAppNumber && (
            <p
              className="cursor-pointer text-sm"
              onClick={() => {
                window.open(
                  `https://wa.me/${postInfo.whatsAppNumber}`,
                  "_blank"
                );
              }}
            >
              <span className="font-bold">WhatsApp Number:</span>
              {` ${postInfo?.whatsAppNumber}`}
            </p>
          )}
          {postInfo?.mobileNumber && (
            <Link to={`tel:${postInfo.mobileNumber}`}>
              <p className=" text-sm mt-2">
                <span className="font-bold">Mobile Number:</span>
                {` ${postInfo?.mobileNumber}`}
              </p>
            </Link>
          )}
          {postInfo?.link && (
            <Link
              to={postInfo.link}
              target="_blank"
              className="cursor-pointer font-bold text-sm "
            >
              <p className="mt-2">{` ${postInfo?.link}`}</p>
            </Link>
          )}
          {postInfo?.tags && postInfo.tags.length > 0 && (
            <div className="flex flex-row space-x-1 mt-2">
              {postInfo.tags.map((tag, index) => (
                <p key={index} className="text-xs text-blue-700 font-semibold">
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-4 mb-2 justify-between">
          <div className="flex space-x-5">
            <div onClick={handleToggleLike} className="cursor-pointer">
              {isLiked ? (
                <PiHandsClappingFill className="w-5 h-5 text-secondary" />
              ) : (
                <PiHandsClappingThin className="w-5 h-5" />
              )}
            </div>
            <div onClick={handleToggleSave} className="cursor-pointer">
              {isSaved ? (
                <BsBookmarkCheckFill className="w-5 h-5   text-secondary" />
              ) : (
                <BsBookmark className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>
        <div className="text-start mb-4 ">
          <p className="text-sm">
            Liked by{" "}
            <span className="font-semibold text-base">{likeCount} people</span>
          </p>
        </div>

        {isLoginModalOpen && (
          <Modal
            isOpen={isLoginModalOpen}
            setIsOpen={handleCloseModal}
            title="LogIn"
            size="md"
          >
            <LoginModalContent />
          </Modal>
        )}
        {postInfo && (
          <>
            <OptionsModal
              isOpen={isOptionsModalOpen}
              onClose={() => setIsOptionsModalOpen(false)}
              onEdit={() => {
                setIsOptionsModalOpen(false);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeletePost}
            />
            <EditPostDetails
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              selectedPost={postInfo}
              onEdit={handleEditPost}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
