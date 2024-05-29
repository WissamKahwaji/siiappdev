import { Formik, FormikHelpers } from "formik";
import { PostInputProps, PostModel } from "../../../apis/posts/type";
import Modal from "../../const/Modal";
import HashtagsInput from "../../const/HashtagsInput";

interface EditPostDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPost: PostModel;
  onEdit: (
    values: PostInputProps,
    helpers: FormikHelpers<PostInputProps>
  ) => void;
}

const EditPostDetails = ({
  isOpen,
  onClose,
  selectedPost,
  onEdit,
}: EditPostDetailsProps) => {
  const renderPostMedia = () => {
    switch (selectedPost.postType) {
      case "image":
        return (
          <img
            src={selectedPost.images[0]}
            alt="Post"
            className="w-full h-auto rounded-lg object-contain"
          />
        );
      case "video":
        return (
          <video controls className="w-full h-auto rounded-lg">
            <source src={selectedPost.postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "doc":
        return (
          <iframe
            src={selectedPost.postDocs}
            className="w-full h-auto rounded-lg"
            title="Document"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} title="Edit Your Post">
      <Formik initialValues={selectedPost} onSubmit={onEdit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-h-[500px] overflow-y-auto no-scrollbar  md:space-y-0 md:grid md:grid-cols-2 gap-x-4 font-header"
          >
            <div className="flex justify-center">{renderPostMedia()}</div>
            <div className="flex flex-col items-start justify-start w-full relative py-1 px-2">
              <div className="flex items-center mb-5">
                <img
                  src={
                    selectedPost.owner.profileImage ??
                    "https://via.placeholder.com/40"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p className="text-navBackground font-serif">
                  {selectedPost.owner.fullName}
                </p>
              </div>
              <label htmlFor="caption" className="text-gray-700 text-sm">
                Caption
              </label>
              <textarea
                id="caption"
                name="caption"
                placeholder="Edit caption"
                className="p-2 border h-32 mb-2 border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.caption}
              />
              {errors.caption && touched.caption && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.caption}
                </div>
              )}
              <label htmlFor="whatsAppNumber" className="text-gray-700 text-sm">
                Whatsapp Number
              </label>
              <input
                id="whatsAppNumber"
                name="whatsAppNumber"
                type="text"
                placeholder="Edit whatsapp number"
                className="p-2 mb-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.whatsAppNumber}
              />
              {errors.whatsAppNumber && touched.whatsAppNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.whatsAppNumber}
                </div>
              )}
              <label htmlFor="mobileNumber" className="text-gray-700 text-sm">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                placeholder="Edit mobile number"
                className="p-2 mb-5 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNumber}
              />
              {errors.mobileNumber && touched.mobileNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.mobileNumber}
                </div>
              )}
              <label htmlFor="link" className="text-gray-700 text-sm">
                Link
              </label>
              <input
                id="link"
                name="link"
                type="text"
                placeholder="Edit link"
                className="p-2 mb-5 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.link}
              />
              {errors.link && touched.link && (
                <div className="text-red-500 text-xs mt-1">{errors.link}</div>
              )}
              <div className="mb-5 items-start flex flex-col">
                <label
                  className="  text-sm font-medium text-gray-700"
                  htmlFor="HashTags"
                >
                  HashTags
                </label>
                <HashtagsInput
                  value={values.tags ?? []}
                  onChange={newTags => setFieldValue("tags", newTags)}
                />
              </div>
              <button
                className="w-full p-2 bg-secondary text-navBackground font-semibold rounded-xl hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditPostDetails;
