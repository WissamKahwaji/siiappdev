import { useState, useEffect } from "react";
import { FormikHelpers } from "formik";
// import { SyncLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import {
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useToggleLikeMutaion,
  useToggleSaveMutaion,
} from "../../../apis/posts/queries";

import { PostModel } from "../../../apis/posts/type";
import EditPostDetails from "./EditPostDetails";
import OptionsModal from "./OptionsModal";
import { Link } from "react-router-dom";
import {
  PiHandsClappingFill,
  PiHandsClappingThin,
  PiShareFatLight,
} from "react-icons/pi";
import { toast } from "react-toastify";
import LoginToast from "../../const/LoginToast";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../const/Modal";
import LoginModalContent from "../../const/LoginModalContent";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../const/LoadingComponent";
import { FolderOrPostProps } from "../../../apis/folder/type";
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
  const { t } = useTranslation();
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

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(
        `www.siiapp.net/${selectedPost.owner.userName}/${selectedPost._id}`
      )
      .then(() => {
        toast.info("copy to clipboard");
      });
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
    values: FolderOrPostProps,
    { setSubmitting }: FormikHelpers<FolderOrPostProps>
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
      <div className="text-center h-fit w-[120px] md:w-full flex flex-col justify-center items-center">
        {/* <SyncLoader size={20} /> */}
        <LoadingComponent />
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
            className="md:w-full md:h-full w-full h-full md:max-h-[369px] md:object-contain object-cover rounded-lg border-4 border-secondary"
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
            className="relative border rounded-lg overflow-hidden cursor-pointer w-[320px] md:w-full   border-secondary"
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
      <div className="md:w-1/2 w-full  flex flex-col items-center">
        {renderPostContent()}
      </div>

      <div className="md:w-1/2 w-full flex flex-col p-4">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center gap-x-2">
            <img
              src={
                postInfo?.owner.profileImage ?? "https://via.placeholder.com/40"
              }
              alt="User"
              className="w-10 h-10 rounded-full "
            />
            <p className="text-navBackground text-xs md:text-base font-serif">
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
        <hr className="mb-4 bg-secondary/40 h-0.5" />

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
                const sanitizedNumber = postInfo.whatsAppNumber?.replace(
                  /\s+/g,
                  ""
                );
                window.open(`https://wa.me/${sanitizedNumber}`, "_blank");
              }}
            >
              <div className="flex flex-row">
                <span className="font-bold">{`${t(
                  "whatsApp_number"
                )} : `}</span>
                <p
                  className="text-blue-700 underline"
                  style={{ direction: "ltr" }}
                >{`${postInfo?.whatsAppNumber}`}</p>
              </div>
            </p>
          )}
          {postInfo?.mobileNumber && (
            <Link to={`tel:${postInfo.mobileNumber}`}>
              <p className=" text-sm mt-2">
                <div className="flex flex-row">
                  <span className="font-bold">{`${t(
                    "mobile_number"
                  )} : `}</span>
                  <p
                    style={{ direction: "ltr" }}
                    className="text-blue-700 underline"
                  >
                    {` ${postInfo?.mobileNumber}`}
                  </p>
                </div>
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
            <div className="flex flex-row gap-x-1 mt-2 flex-wrap">
              {postInfo.tags.map((tag, index) => (
                <p key={index} className="text-xs text-blue-700 font-semibold">
                  {tag}
                </p>
              ))}
            </div>
          )}
          {postInfo?.discountPercentage && postInfo?.discountPercentage > 0 ? (
            <div className="flex flex-col items-start justify-start space-y-1">
              <p className="text-blue-500 font-bold">
                <span className="font-semibold text-black">
                  {`${t("discount")} : `}
                </span>{" "}
                {postInfo?.discountPercentage}% off
              </p>
              <p className="text-xs text-gray-600">
                {t(
                  "This discount for this service will be given to all users who have a Sii card"
                )}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex gap-x-4 mb-2 justify-between">
          <div className="flex gap-x-5">
            <div onClick={handleToggleLike} className="cursor-pointer">
              {isLiked ? (
                <PiHandsClappingFill className="w-5 h-5 text-secondary" />
              ) : (
                <PiHandsClappingThin className="w-5 h-5" />
              )}
            </div>
            <PiShareFatLight
              className="w-6 h-6 cursor-pointer hover:text-gray-500"
              onClick={handleShareClick}
            />
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
            {t("liked_by")}{" "}
            <span className="font-semibold text-base">
              {likeCount} {t("people")}
            </span>
          </p>
        </div>

        {isLoginModalOpen && (
          <Modal
            isOpen={isLoginModalOpen}
            setIsOpen={handleCloseModal}
            title={t("login")}
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
