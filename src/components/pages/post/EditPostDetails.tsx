import { Formik, FormikHelpers } from "formik";
import { PostModel } from "../../../apis/posts/type";
import Modal from "../../const/Modal";
import HashtagsInput from "../../const/HashtagsInput";
import { useTranslation } from "react-i18next";
import { FolderOrPostProps } from "../../../apis/folder/type";
import { useState } from "react";
import ImagePostSlider from "../../const/image_post_slider/ImagePostSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface EditPostDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPost: PostModel;
  onEdit: (
    values: FolderOrPostProps,
    helpers: FormikHelpers<FolderOrPostProps>
  ) => void;
}

const EditPostDetails = ({
  isOpen,
  onClose,
  selectedPost,
  onEdit,
}: EditPostDetailsProps) => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const [discountFunctionType, setDiscountFunctionType] = useState(
    selectedPost.discountFunctionType ?? "get_offer"
  );
  const initialValues: FolderOrPostProps = {
    _id: selectedPost._id,

    caption: selectedPost.caption,

    link: selectedPost.link,
    whatsAppNumber: selectedPost.whatsAppNumber,
    mobileNumber: selectedPost.mobileNumber,
    tags: selectedPost.tags,
    discountPercentage: selectedPost.discountPercentage,
    discountFunctionType: selectedPost.discountFunctionType,
    otherCaptions: selectedPost.otherCaptions,
  };

  const captionSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const renderPostMedia = () => {
    switch (selectedPost.postType) {
      case "image":
        return (
          <>
            {selectedPost.images.length > 1 ? (
              <div className="md:w-full max-w-xs md:max-w-full">
                <ImagePostSlider>
                  {selectedLang === "en"
                    ? selectedPost.images.map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt="Post"
                            className="md:w-full md:h-full w-full h-full md:max-h-[369px] md:object-contain object-cover rounded-lg border-4 border-secondary"
                          />
                        </div>
                      ))
                    : [...selectedPost.images].reverse().map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt="Post"
                            className="md:w-full md:h-full w-full h-full md:max-h-[369px] md:object-contain object-cover rounded-lg border-4 border-secondary"
                          />
                        </div>
                      ))}
                </ImagePostSlider>
              </div>
            ) : (
              <img
                src={selectedPost.images[0]}
                alt="Post"
                className="w-full h-auto rounded-lg object-contain"
              />
            )}
          </>
          // <img
          //   src={selectedPost.images[0]}
          //   alt="Post"
          //   className="w-full h-auto rounded-lg object-contain"
          // />
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
    <Modal isOpen={isOpen} setIsOpen={onClose} title={t("edit_your_post")}>
      <Formik initialValues={initialValues} onSubmit={onEdit}>
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
            className="space-y-6 max-h-[500px] overflow-y-auto no-scrollbar  md:space-y-0 md:grid md:grid-cols-2 gap-x-4 font-header max-w-[350px] md:max-w-full"
          >
            <div className="flex justify-center">{renderPostMedia()}</div>
            {/* {renderPostMedia()} */}
            <div className="flex flex-col items-start justify-start w-full relative py-1 px-2">
              <div className="flex items-center mb-5 gap-x-2">
                <img
                  src={
                    selectedPost.owner.profileImage ??
                    "https://via.placeholder.com/40"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full  "
                />
                <p className="text-navBackground font-serif">
                  {selectedPost.owner.fullName}
                </p>
              </div>
              <div className="md:w-full max-w-[340px]">
                <Slider {...captionSettings}>
                  <div className="flex flex-col items-start justify-start w-full  px-1">
                    <label htmlFor="caption" className="text-gray-700 text-sm">
                      {t("caption for image 1")}
                    </label>
                    <textarea
                      id="caption"
                      name="caption"
                      placeholder={t("edit_caption")}
                      className="p-2 border h-32 mb-2 border-secondary rounded w-full focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.caption}
                    />
                    {errors.caption && touched.caption && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.caption}
                      </div>
                    )}
                  </div>
                  {selectedPost.images &&
                    selectedPost.images.slice(1).map((_caption, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start justify-start w-full px-1"
                      >
                        <label
                          className="mb-2 text-sm font-medium text-gray-700"
                          htmlFor={`otherCaptions-${index}`}
                        >
                          {t(`caption for image ${index + 2}`)}
                        </label>
                        <textarea
                          id={`otherCaptions-${index}`}
                          name={`otherCaptions[${index}]`}
                          minLength={1}
                          className="px-4 h-32 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.otherCaptions![index]}
                        />
                        {errors.otherCaptions && touched.otherCaptions && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.otherCaptions}
                          </div>
                        )}
                      </div>
                    ))}
                </Slider>
              </div>
              {/* <label htmlFor="caption" className="text-gray-700 text-sm">
                {t("caption")}
              </label>
              <textarea
                id="caption"
                name="caption"
                placeholder={t("edit_caption")}
                className="p-2 border h-32 mb-2 border-secondary rounded w-full focus:outline-none focus:ring-2 focus:ring-navBackground"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.caption}
              />
              {errors.caption && touched.caption && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.caption}
                </div>
              )} */}

              <label
                htmlFor="whatsAppNumber"
                className="text-gray-700 text-sm mt-6"
              >
                {t("whatsApp_number")}
              </label>
              <input
                id="whatsAppNumber"
                name="whatsAppNumber"
                type="text"
                placeholder={t("edit_whatsApp_number")}
                className="p-2 mb-2 border border-secondary rounded w-full focus:outline-none focus:ring-2 focus:ring-navBackground"
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
                {t("mobile_number")}
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                placeholder={t("edit_mobile_number")}
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
                {t("link")}
              </label>
              <input
                id="link"
                name="link"
                type="text"
                placeholder={t("edit_link")}
                className="p-2 mb-5 border border-secondary rounded w-full focus:outline-none focus:ring-2 focus:ring-navBackground"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.link}
              />
              {errors.link && touched.link && (
                <div className="text-red-500 text-xs mt-1">{errors.link}</div>
              )}
              <div className="mb-5 items-start flex flex-col w-full">
                <label
                  className="  text-sm font-medium text-gray-700"
                  htmlFor="HashTags"
                >
                  {t("hashTags")}
                </label>
                <HashtagsInput
                  value={values.tags ?? []}
                  onChange={newTags => setFieldValue("tags", newTags)}
                />
              </div>
              {selectedPost.owner.isBusiness && (
                <div className="flex flex-col items-start justify-start w-full mb-4">
                  <label
                    className="mb-1 text-sm font-medium text-gray-700"
                    htmlFor="discountPercentage"
                  >
                    {t("discount_percentage")}
                  </label>
                  <p className="text-xs mb-1 text-blue-500 text-start">
                    {t(
                      "This discount for this service will be given to all users who have a Sii card"
                    )}
                  </p>
                  {/* <input
                    id="discountPercentage"
                    name="discountPercentage"
                    placeholder={t("enter_discount_percentage")}
                    type="number"
                    min={0}
                    max={100}
                    className="px-4 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discountPercentage ?? ""}
                  /> */}
                  <input
                    id="discountPercentage"
                    name="discountPercentage"
                    placeholder="Enter discount percentage"
                    type="number"
                    min={1}
                    max={99}
                    inputMode="numeric"
                    pattern="\d*"
                    className="px-4 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={e => {
                      const { value } = e.currentTarget;
                      const numericValue = parseInt(value, 10);

                      // Ensure the value is a valid two-digit number
                      if (
                        (numericValue >= 1 && numericValue <= 99) ||
                        value == ""
                      ) {
                        handleChange(e);
                      }
                    }}
                    value={values.discountPercentage ?? ""}
                  />
                  {values.discountPercentage &&
                    values.discountPercentage > 0 && (
                      <div className="flex flex-row items-center gap-x-8 mt-8">
                        <label className="flex items-center gap-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="discountFunctionType"
                            value="get_offer"
                            checked={discountFunctionType === "get_offer"}
                            onChange={() => {
                              setDiscountFunctionType("get_offer");
                              setFieldValue(
                                "discountFunctionType",
                                "get_offer"
                              );
                            }}
                            className="form-radio h-4 w-4 text-seconBackground "
                          />
                          <span className="text-gray-700 font-medium">
                            {t("get_offer")}
                          </span>
                        </label>
                        <label className="flex items-center gap-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="discountFunctionType"
                            value="send_message"
                            checked={discountFunctionType === "send_message"}
                            onChange={() => {
                              setDiscountFunctionType("send_message");
                              setFieldValue(
                                "discountFunctionType",
                                "send_message"
                              );
                            }}
                            className="form-radio h-4 w-4 text-seconBackground "
                          />
                          <span className="text-gray-700 font-medium">
                            {t("send_message")}
                          </span>
                        </label>
                      </div>
                    )}
                </div>
              )}
              <button
                className="w-full p-2 bg-secondary text-navBackground font-semibold rounded-xl hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? `${t("saving")}...` : t("save")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditPostDetails;

// {selectedPost.images && selectedPost.images.length > 1 && (
//   <div className="w-full mb-2">
//     {values.otherCaptions?.map((caption, index) => (
//       <div
//         key={index}
//         className="flex flex-col items-start justify-start w-full"
//       >
//         <label
//           className="mb-2 text-sm font-medium text-gray-700"
//           htmlFor={`otherCaptions-${index}`}
//         >
//           {t(`caption for image ${index + 2}`)}
//         </label>
//         <textarea
//           id={`otherCaptions-${index}`}
//           name={`otherCaptions[${index}]`}
//           minLength={1}
//           className="px-4 h-32 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
//           onBlur={handleBlur}
//           onChange={handleChange}
//           value={caption}
//         />
//         {errors.otherCaptions && touched.otherCaptions && (
//           <div className="text-red-500 text-xs mt-1">
//             {errors.otherCaptions}
//           </div>
//         )}
//       </div>
//     ))}
//     {values.otherCaptions &&
//       values.otherCaptions?.length <
//         selectedPost.images.length - 1 && (
//         <button
//           type="button"
//           className="bg-secondary text-navBackground font-semibold py-2 px-4 rounded-lg hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transform ease-in-out duration-300"
//           onClick={() => {
//             if (values.otherCaptions) {
//               setFieldValue("otherCaptions", [
//                 ...values.otherCaptions,
//                 "",
//               ]);
//             }
//           }}
//         >
//           {t("add_another_caption")}
//         </button>
//       )}
//   </div>
// )}
