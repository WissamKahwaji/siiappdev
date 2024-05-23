import { useState, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
import { SyncLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FaRegBookmark, FaRegComment, FaBookmark } from "react-icons/fa";
import {
  useAddCommentMutaion,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useToggleLikeMutaion,
  useToggleSaveMutaion,
} from "../../../apis/posts/queries";

import {
  AddCommentInputProps,
  PostInputProps,
  PostModel,
} from "../../../apis/posts/type";
import EditPostDetails from "./EditPostDetails";
import OptionsModal from "./OptionsModal";
import { Link } from "react-router-dom";
import { PiHandsClappingFill, PiHandsClappingThin } from "react-icons/pi";

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
  const { mutate: addCommentInfo } = useAddCommentMutaion();
  const { mutate: toggleLike } = useToggleLikeMutaion();
  const { mutate: toggleSave } = useToggleSaveMutaion();
  const { mutate: editPostInfo } = useEditPostMutation();
  const { mutate: deletePostInfo } = useDeletePostMutation();

  const {
    data: comments,
    isLoading,
    isError,
  } = useGetPostCommentsQuery(selectedPost._id);

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

  useEffect(() => {
    if (selectedPost.likes?.includes(currentUserId)) {
      setIsLiked(true);
    }
    if (selectedPost.saves?.includes(currentUserId)) {
      setIsSaved(true);
    }
  }, [selectedPost.likes, selectedPost.saves, currentUserId]);

  const initialValues: AddCommentInputProps = {
    text: "",
    postId: selectedPost._id,
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
    toggleLike(selectedPost._id);
    setIsLiked(!isLiked);
    setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleToggleSave = () => {
    toggleSave(selectedPost._id);
    setIsSaved(!isSaved);
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
            className="md:w-full md:h-full w-1/2 h-1/2 object-contain rounded-lg"
          />
        );
      case "video":
        return (
          <video
            controls
            className="md:w-full md:h-full w-1/2 h-1/2 object-contain rounded-lg"
          >
            <source src={postInfo.postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "doc":
        return (
          <iframe
            src={postInfo.postDocs}
            className="md:w-full md:h-full w-1/2 h-1/2 object-contain rounded-lg"
            title="Document"
          />
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
          <FontAwesomeIcon
            icon={faEllipsis}
            className="cursor-pointer"
            onClick={() => setIsOptionsModalOpen(true)}
          />
        </div>
        <hr className="mb-4" />

        <div className="mb-4 text-start whitespace-pre-wrap  md:max-h-32 max-h-24 justify-start items-start overflow-y-scroll no-scrollbar ">
          <p> {postInfo?.caption}</p>
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
            <p className=" text-sm mt-1">
              <span className="font-bold">Mobile Number:</span>
              {` ${postInfo?.mobileNumber}`}
            </p>
          )}
          {postInfo?.link && (
            <Link
              to={postInfo.link}
              target="_blank"
              className="cursor-pointer font-bold text-sm "
            >
              <p className="mt-1">{` ${postInfo?.link}`}</p>
            </Link>
          )}
        </div>

        <div className="flex space-x-4 mb-2 justify-between">
          <div className="flex space-x-5">
            <div onClick={handleToggleLike} className="cursor-pointer">
              {isLiked ? (
                <PiHandsClappingFill className="w-5 h-5 text-red-500" />
              ) : (
                <PiHandsClappingThin className="w-5 h-5" />
              )}
            </div>
            <FaRegComment className="w-5 h-5 cursor-pointer" />
          </div>
          <div onClick={handleToggleSave} className="cursor-pointer">
            {isSaved ? (
              <FaBookmark className="w-5 h-5   text-secondary" />
            ) : (
              <FaRegBookmark className="w-5 h-5" />
            )}
          </div>
        </div>
        <div className="text-start mb-4 ">
          <p className="text-sm">
            Liked by{" "}
            <span className="font-semibold text-base">{likeCount} people</span>
          </p>
        </div>

        {isLoading ? (
          <div className="text-center flex flex-col justify-center items-center">
            <SyncLoader size={20} />
          </div>
        ) : isError ? (
          <div>Error!!</div>
        ) : (
          <div className="flex flex-col space-y-4 overflow-y-scroll no-scrollbar mb-12 md:max-h-32 max-h-24 ">
            {comments &&
              (comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 font-header"
                  >
                    <img
                      src={
                        comment.user.profileImage ??
                        "https://via.placeholder.com/30"
                      }
                      alt="Commenter"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm text-start ">
                      <strong>{comment.user.fullName}</strong> {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <div>No comments yet</div>
              ))}
          </div>
        )}

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
            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 md:w-[370px] w-[300px] flex items-center p-4 bg-white border-t border-gray-300"
            >
              <input
                id="text"
                name="text"
                type="text"
                placeholder="Add a comment..."
                className="flex-grow p-2 border border-gray-300 rounded"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text ?? ""}
              />
              {errors.text && touched.text && (
                <div className="text-red-500 text-xs mt-1">{errors.text}</div>
              )}
              <button
                className="ml-2 p-2 text-blue-500"
                type="submit"
                disabled={isSubmitting}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          )}
        </Formik>

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
