import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  PiHandsClappingFill,
  PiHandsClappingThin,
  PiShareFatLight,
} from "react-icons/pi";
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

type PostProps = {
  post: PostModel;
  currentUserId: string;
};

const Post = (props: PostProps) => {
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
      .writeText(window.location.href + `post/${props.post._id}`)
      .then(() => {
        toast.info("copy to clipboard");
      });
  };

  const renderPostContent = () => {
    switch (props.post?.postType) {
      case "image":
        return (
          <div className="p-2 justify-center flex">
            <img
              src={props.post.images[0]}
              alt="Post"
              className="object-cover  border border-secondary rounded-lg md:w-full w-full  cursor-pointer"
              onClick={() => handlePostClick(props.post)}
            />
          </div>
        );
      case "video":
        return (
          <video
            ref={videoRef}
            controls
            className="object-cover bg-transparent w-full max-h-[450px]"
          >
            <source src={props.post?.postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
            <img
              src={props.post.owner.profileImage}
              alt=""
              className="rounded-full border border-secondary w-8 h-8 inline"
            />
            <span className="font-medium text-sm ml-2">
              {props.post.owner.fullName}
            </span>
          </Link>
        </div>
      </div>

      {renderPostContent()}

      <div className="flex flex-col py-2 px-3">
        <div className="flex space-x-4 mb-2 justify-between">
          <div className="flex space-x-5">
            <div
              onClick={handleToggleLike}
              className="cursor-pointer hover:text-gray-500"
            >
              {isLiked ? (
                <PiHandsClappingFill className="w-6 h-6 text-secondary" />
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
          </div>
          <div
            onClick={handleToggleSave}
            className="cursor-pointer hover:text-gray-500"
          >
            {isSaved ? (
              <FaBookmark className="w-6 h-6 text-secondary" />
            ) : (
              <FaRegBookmark className="w-6 h-6" />
            )}
          </div>
        </div>

        <div className="font-medium text-sm">{likeCount} Likes</div>

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
              onClick={() =>
                window.open(
                  `https://wa.me/${props.post.whatsAppNumber}`,
                  "_blank"
                )
              }
            >
              <span className="font-bold">WhatsApp Number:</span>
              {` ${props.post?.whatsAppNumber}`}
            </p>
          )}
          {props.post?.mobileNumber && (
            <Link to={`tel:${props.post?.mobileNumber}`}>
              <p className="text-sm mt-2">
                <span className="font-bold">Mobile Number:</span>
                {` ${props.post?.mobileNumber}`}
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
            <div className="flex flex-row space-x-1 mt-2 flex-wrap">
              {props.post.tags.map((tag, index) => (
                <p key={index} className="text-xs text-blue-700 font-bold">
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>

        {props.post.createdAt && (
          <div className="text-gray-500 uppercase text-xs tracking-wide mt-2">
            {formatDate(props.post.createdAt.toString())}
          </div>
        )}
        <div
          className="text-sm text-gray-400 mt-1 cursor-pointer"
          onClick={() => handlePostClick(props.post)}
        >{`View details`}</div>

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
          title="Your Post"
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
          title="LogIn"
          size="md"
        >
          <LoginModalContent />
        </Modal>
      )}
    </div>
  );
};

export default Post;
