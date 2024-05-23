import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
  FaShare,
} from "react-icons/fa";
import { PiHandsClappingFill, PiHandsClappingThin } from "react-icons/pi";
import { AddCommentInputProps, PostModel } from "../../../apis/posts/type";
import { Link } from "react-router-dom";
import {
  useAddCommentMutaion,
  useToggleLikeMutaion,
  useToggleSaveMutaion,
} from "../../../apis/posts/queries";
import { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import Modal from "../../const/Modal";
import PostDetails from "./PostDetails";

type PostProps = {
  post: PostModel;
  currentUserId: string;
};
const Post = (props: PostProps) => {
  const { mutate: addCommentInfo } = useAddCommentMutaion();
  const { mutate: toggleLike } = useToggleLikeMutaion();
  const { mutate: toggleSave } = useToggleSaveMutaion();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.post.likes?.length ?? 0);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [showFullBrief, setShowFullBrief] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
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
  }, [props.post.likes, props.post.saves, props.currentUserId]);

  const initialValues: AddCommentInputProps = {
    text: "",
    postId: props.post._id,
  };
  const handlePostClick = (post: PostModel) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (
    values: AddCommentInputProps,
    { setSubmitting, resetForm }: FormikHelpers<AddCommentInputProps>
  ) => {
    addCommentInfo(values, {
      onSettled() {
        setSubmitting(false);
        resetForm();
      },
    });
  };

  const handleToggleLike = () => {
    toggleLike(props.post._id);
    setIsLiked(!isLiked);
    setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleToggleSave = () => {
    toggleSave(props.post._id);
    setIsSaved(!isSaved);
  };

  const renderPostContent = () => {
    switch (props.post?.postType) {
      case "image":
        return (
          <img
            src={props.post.images[0]}
            alt="Post"
            className="object-cover w-full  max-h-[450px]"
          />
        );
      case "video":
        return (
          <video controls className="object-cover w-full  max-h-[450px]">
            <source src={props.post?.postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "doc":
        return (
          <iframe
            src={props.post.postDocs}
            // className="md:w-full md:h-1/2 w-1/2 h-1/2 object-contain rounded-lg"
            title="Document"
            height="500px"
            width="100%"
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="border rounded-lg border-slate-200 mb-5 bg-white font-header w-[620px]">
      <div className="p-3 flex flex-row">
        <div className="flex-1">
          <Link to={`/${props.post.owner.userName}`}>
            <img
              src={props.post.owner.profileImage}
              alt=""
              className="rounded-full w-8 inline"
            />
            <span className="font-medium text-sm ml-2">
              {props.post.owner.fullName}
            </span>
          </Link>
        </div>
      </div>

      {renderPostContent()}
      <div className="flex flex-col py-2 px-3">
        <div className="flex space-x-4 mb-2 justify-between ">
          <div className="flex space-x-5">
            <div
              onClick={handleToggleLike}
              className="cursor-pointer hover:text-gray-500"
            >
              {isLiked ? (
                <PiHandsClappingFill className="w-6 h-6 text-red-500" />
              ) : (
                <PiHandsClappingThin className="w-6 h-6" />
              )}
            </div>
            <FaRegComment className="w-6 h-6 cursor-pointer hover:text-gray-500" />
            <FaShare className="w-6 h-6 cursor-pointer hover:text-gray-500" />
          </div>
          {/* <div className="cursor-pointer">
            <FaBookmark className="w-6 h-6   text-secondary hover:text-gray-500" />
          </div> */}
          <div
            onClick={handleToggleSave}
            className="cursor-pointer hover:text-gray-500"
          >
            {isSaved ? (
              <FaBookmark className="w-6 h-6   text-secondary" />
            ) : (
              <FaRegBookmark className="w-6 h-6" />
            )}
          </div>
        </div>
        <div className="font-medium text-sm">{likeCount} Likes</div>
        <div className="text-sm">
          {/* <p className="whitespace-pre-wrap">
            <span className="font-medium">{props.post.owner.fullName}</span>{" "}
            {props.post.caption}
          </p> */}
          <div className="flex flex-row items-end">
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
                window.open(
                  `https://wa.me/${props.post.whatsAppNumber}`,
                  "_blank"
                );
              }}
            >
              <span className="font-bold">WhatsApp Number:</span>
              {` ${props.post?.whatsAppNumber}`}
            </p>
          )}
          {props.post?.mobileNumber && (
            <p className=" text-sm mt-1">
              <span className="font-bold">Mobile Number:</span>
              {` ${props.post?.mobileNumber}`}
            </p>
          )}
          {props.post?.link && (
            <Link
              to={props.post.link}
              target="_blank"
              className="cursor-pointer font-bold text-sm text-blue-500"
            >
              <p className="mt-1">{` ${props.post?.link}`}</p>
            </Link>
          )}
        </div>
        <div className="text-gray-500 uppercase text-xs tracking-wide mt-2">
          23 hours
        </div>
        <div
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
              <div className=" py-1 mt-2 flex flex-row border-t">
                <div className="flex items-center">
                  <a href="" className="text-2xl cursor-pointer ">
                    <FontAwesomeIcon icon={faSmile} />
                  </a>
                </div>

                <div className="flex-1 pr-3 py-1">
                  <input
                    id="text"
                    name="text"
                    type="text"
                    className="w-full px-3 py-1 text-sm outline-0 "
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
                  {/* <a
                    href=""
                    className="text-sky-500 font font-medium cursor-pointer"
                  >
                    Post
                  </a> */}
                </div>
              </div>
            </form>
          )}
        </Formik>
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
    </div>
  );
};

export default Post;
