import { FaBookmark } from "react-icons/fa";
import { PiHandsClappingThin, PiShareFatLight } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { PostModel } from "../../../apis/posts/type";
import { Link } from "react-router-dom";
import {
  useToggleLikeMutaion,
  useToggleSaveMutaion,
} from "../../../apis/posts/queries";
import { useEffect, useRef, useState } from "react";

import Modal from "../../const/Modal";
import PostDetails from "./PostDetails";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import LoginToast from "../../const/LoginToast";
import LoginModalContent from "../../const/LoginModalContent";
import { formatDate } from "../../../utils";
import { useTranslation } from "react-i18next";
import { FaHandsClapping } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type PostProps = {
  post: PostModel;
  currentUserId: string;
};

const Post = (props: PostProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  // const { mutate: addCommentInfo } = useAddCommentMutaion();
  const { mutate: toggleLike } = useToggleLikeMutaion();
  const { mutate: toggleSave } = useToggleSaveMutaion();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.post.likes?.length ?? 0);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [showFullBrief, setShowFullBrief] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const commentInputRef = useRef<HTMLInputElement>(null);

  const toggleBrief = () => {
    setShowFullBrief(!showFullBrief);
  };

  useEffect(() => {
    if (props.post.likes?.includes(props.currentUserId)) {
      setIsLiked(true);
    }
    if (props.post.saves?.includes(props.currentUserId)) {
      setIsSaved(true);
    }
    const element = document.getElementById(`post-caption-${props.post._id}`);
    if (element && element.scrollHeight > element.clientHeight) {
      setShouldShowToggle(true);
    } else {
      setShouldShowToggle(false);
    }

    // Event listeners for full-screen change
    const handleFullScreenChange = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        if (document.fullscreenElement) {
          videoElement.classList.remove("object-cover");
          videoElement.classList.add("object-contain");
        } else {
          videoElement.classList.remove("object-contain");
          videoElement.classList.add("object-cover");
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, [props.post.likes, props.post.saves, props.currentUserId, props.post._id]);

  // const initialValues: AddCommentInputProps = {
  //   text: "",
  //   postId: props.post._id,
  // };

  const handlePostClick = (post: PostModel) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsModalOpen(false);
  };

  // const handleSubmit = (
  //   values: AddCommentInputProps,
  //   { setSubmitting, resetForm }: FormikHelpers<AddCommentInputProps>
  // ) => {
  //   addCommentInfo(values, {
  //     onSettled() {
  //       setSubmitting(false);
  //       resetForm();
  //     },
  //   });
  // };

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
      toggleLike(props.post._id);
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
      toggleSave(props.post._id);
      setIsSaved(!isSaved);
    }
  };

  // const handleCommentClick = () => {
  //   commentInputRef.current?.focus();
  // };

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(
        `siiappdev.siidevelopment.com/${props.post.owner.userName}/${props.post._id}`
      )
      .then(() => {
        toast.info("copy to clipboard");
      });
  };

  const renderPostContent = () => {
    switch (props.post?.postType) {
      case "image":
        return (
          <div className="p-2 justify-center flex relative">
            <img
              src={props.post.images[0]}
              alt="Post"
              className="object-cover  border border-secondary rounded-lg md:w-full w-full  cursor-pointer"
              onClick={() => handlePostClick(props.post)}
            />
            {props.post.discountPercentage &&
              props.post.discountPercentage > 0 && (
                <div className="absolute bottom-4 w-full px-2 bg-transparent ">
                  <div className=" p-3 bg-secondary">
                    <Link to={`/${props.post.owner.userName}`}>
                      <div className="w-full flex flex-row justify-between items-center ">
                        <p className="text-blue-500 font-bold">
                          <span className="font-semibold text-black">
                            {`${t("discount")} : `}
                          </span>{" "}
                          {props.post.discountPercentage}%
                        </p>
                        <MdOutlineKeyboardArrowRight size={24} />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
          </div>
        );
      case "video":
        return (
          <video
            ref={videoRef}
            playsInline
            muted
            controls
            className="object-cover bg-transparent w-full max-h-[450px]"
          >
            <source src={props.post?.postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          // <video
          //   id="logoVideo"
          //   autoPlay
          //   playsInline
          //   muted
          //   loop
          //   className="object-cover w-full h-full"
          // >
          //   <source src={logo_video} type="video/mp4" />
          // </video>
        );
      case "doc":
        return (
          <div
            className="relative border rounded-lg overflow-hidden cursor-pointer"
            onClick={() => window.open(props.post?.postDocs, "_blank")}
          >
            <img
              src={
                props.post.coverPdfImage ??
                "https://techterms.com/img/lg/pdf_109.png"
              }
              alt="PDF Icon"
              className="w-full h-[200px] md:h-[300px] object-contain"
            />
            <div className="absolute bottom-0 flex items-center justify-center left-0 w-full bg-secondary bg-opacity-75 text-navBackground font-semibold text-center p-2 text-sm md:text-base">
              <img
                src="https://techterms.com/img/lg/pdf_109.png"
                alt=""
                className="md:w-7 md:h-7 md:mr-2 w-5 h-5 mr-1"
              />
              {props.post?.postDocs
                ? props.post?.postDocs.split("/").pop()
                : "Document"}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-2 rounded-lg border-secondary shadow-sm shadow-secondary mb-5 bg-white font-header w-full max-w-[550px]">
      <div className="p-3 flex flex-row">
        <div className="flex-1">
          <Link to={`/${props.post.owner.userName}`} reloadDocument>
            <div className="flex gap-x-1 items-center">
              <img
                src={props.post.owner.profileImage}
                alt=""
                className="rounded-lg border border-secondary w-8 h-8 inline"
              />
              <span className="font-medium text-sm ">
                {props.post.owner.fullName}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {renderPostContent()}

      <div className="flex flex-col py-2 px-3">
        <div className="flex gap-x-4 mb-2 justify-between">
          <div className="flex gap-x-5">
            <div
              onClick={handleToggleLike}
              className="cursor-pointer hover:text-gray-500"
            >
              {isLiked ? (
                <FaHandsClapping className="w-6 h-6 text-secondary" />
              ) : (
                <PiHandsClappingThin className="w-6 h-6" />
              )}
            </div>
            {/* <FaRegComment
              className="w-6 h-6 cursor-pointer hover:text-gray-500"
              onClick={handleCommentClick}
            /> */}
            <PiShareFatLight
              className="w-6 h-6 cursor-pointer hover:text-gray-500"
              onClick={handleShareClick}
            />
            <div
              onClick={handleToggleSave}
              className="cursor-pointer hover:text-gray-500"
            >
              {isSaved ? (
                <FaBookmark className="w-6 h-6 text-secondary" />
              ) : (
                <CiBookmark className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>

        {/* <div className="font-medium text-sm">
          {likeCount} {t("likes")}
        </div> */}
        <div className="text-start mb-4 ">
          <p className="text-sm">
            {t("liked_by")}{" "}
            <span className="font-semibold text-base">
              {likeCount} {t("people")}
            </span>
          </p>
        </div>

        <div className="text-sm">
          <div className="flex flex-col mb-2">
            <div
              id={`post-caption-${props.post._id}`}
              className={`text-gray-600 whitespace-pre-wrap font-serif text-sm ${
                !showFullBrief ? "clamp-3-lines" : ""
              }`}
            >
              {props.post.caption}
            </div>
            {shouldShowToggle && (
              <span
                className="cursor-pointer text-gray-400 text-xs"
                onClick={toggleBrief}
              >
                {showFullBrief ? " Show Less" : " Show More"}
              </span>
            )}
          </div>
          {props.post.whatsAppNumber && (
            <p
              className="cursor-pointer text-sm"
              onClick={() => {
                const sanitizedNumber = props.post.whatsAppNumber?.replace(
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
                  style={{ direction: "ltr" }}
                >{`${props.post.whatsAppNumber}`}</p>
              </div>
            </p>
          )}
          {props.post?.mobileNumber && (
            <Link to={`tel:${props.post?.mobileNumber}`}>
              <p className="text-sm mt-2">
                <div className="flex flex-row">
                  <span className="font-bold">{`${t(
                    "mobile_number"
                  )} : `}</span>
                  <p style={{ direction: "ltr" }}>
                    {` ${props.post?.mobileNumber}`}
                  </p>
                </div>
              </p>
            </Link>
          )}
          {props.post?.link && (
            <Link
              to={props.post.link}
              target="_blank"
              className="cursor-pointer font-bold text-sm text-blue-500"
            >
              <p className="mt-2">{` ${props.post?.link}`}</p>
            </Link>
          )}
          {props.post.tags && props.post.tags.length > 0 && (
            <div className="flex flex-row gap-x-1 mt-2 flex-wrap">
              {props.post.tags.map((tag, index) => (
                <p key={index} className="text-xs text-blue-700 font-bold">
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>
        {props.post.discountPercentage && props.post.discountPercentage > 0 ? (
          <div className="flex flex-col items-start justify-start space-y-1">
            <p className="text-blue-500 font-bold">
              <span className="font-semibold text-black">
                {`${t("discount")} : `}
              </span>{" "}
              {props.post.discountPercentage}%
            </p>
            <p className="text-xs text-gray-600">
              {t(
                "This discount for this service will be given to all users who have a Sii card"
              )}
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {props.post.createdAt && (
          <div className="text-gray-500 uppercase text-xs tracking-wide mt-2">
            {formatDate(props.post.createdAt.toString())}
          </div>
        )}
        <div
          className="text-sm text-gray-400 mt-1 cursor-pointer"
          onClick={() => handlePostClick(props.post)}
        >
          {t("view_details")}
        </div>

        {/* <div
          className="text-sm text-gray-400 mt-1 cursor-pointer"
          onClick={() => handlePostClick(props.post)}
        >
          {`View all ${props.post.comments?.length} comments`}
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="py-1 mt-2 flex flex-row border-t">
                <div className="flex items-center">
                  <a href="" className="text-2xl cursor-pointer">
                    <FontAwesomeIcon icon={faSmile} />
                  </a>
                </div>

                <div className="flex-1 pr-3 py-1">
                  <input
                    ref={commentInputRef}
                    id="text"
                    name="text"
                    type="text"
                    className="w-full px-3 py-1 text-sm outline-0"
                    placeholder="Add a comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.text ?? ""}
                  />
                  {errors.text && touched.text && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.text}
                    </div>
                  )}
                </div>

                <div className="flex items-center text-sm">
                  <button
                    className="ml-2 p-2 text-blue-500"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik> */}
      </div>

      {selectedPost && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={handleCloseModal}
          title={t("post_info")}
          size="md"
        >
          <PostDetails
            selectedPost={selectedPost}
            currentUserId={props.currentUserId ?? ""}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
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
    </div>
  );
};

export default Post;
