import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  useEditProfileMutation,
  useGetUserByIdQuery,
} from "../../apis/account/queries";
import { EditProfileProps } from "../../apis/account/type";
import ImageDragDropField from "../../components/const/ImageDragDrop";
import { SyncLoader } from "react-spinners";

const validationSchema = Yup.object().shape({});

const EditProfilePage: React.FC = () => {
  const { data: userInfo, isLoading, isError } = useGetUserByIdQuery();
  const { mutate: editProfileInfo } = useEditProfileMutation();

  const initialValues: EditProfileProps = {
    mobileNumber: userInfo?.mobileNumber ?? "",
    fullName: userInfo?.fullName ?? "",
    bio: userInfo?.bio ?? "",
    socialMedia: {
      webSite: userInfo?.socialMedia?.webSite ?? "",
      whatsApp: userInfo?.socialMedia?.whatsApp ?? "",
      faceBook: userInfo?.socialMedia?.faceBook ?? "",
      linkedIn: userInfo?.socialMedia?.linkedIn ?? "",
      instagram: userInfo?.socialMedia?.instagram ?? "",
      threads: userInfo?.socialMedia?.threads ?? "",
      snapChat: userInfo?.socialMedia?.snapChat ?? "",
      youtube: userInfo?.socialMedia?.youtube ?? "",
    },
  };

  const handleSubmit = (
    values: EditProfileProps,
    { setSubmitting }: FormikHelpers<EditProfileProps>
  ) => {
    editProfileInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isLoading)
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  if (isError) return <div></div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>
      <div className="flex justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,

              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-6 ">
                <div className="flex flex-col">
                  <ImageDragDropField
                    name="profileImage"
                    label="change your profile photo"
                    oldImg={userInfo?.profileImage}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                    />
                    {errors.fullName && touched.fullName && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="bio"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="px-4 py-2 border h-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bio ?? ""}
                    />
                    {errors.bio && touched.bio && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.bio}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="mobileNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobileNumber}
                    />
                    {errors.mobileNumber && touched.mobileNumber && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.mobileNumber}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="name"
                    >
                      WebSite
                    </label>
                    <input
                      id="socialMedia.webSite"
                      name="socialMedia.webSite"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.webSite}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.whatsApp"
                    >
                      whatsApp
                    </label>
                    <input
                      id="socialMedia.whatsApp"
                      name="socialMedia.whatsApp"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.whatsApp}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.faceBook"
                    >
                      faceBook
                    </label>
                    <input
                      id="socialMedia.faceBook"
                      name="socialMedia.faceBook"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.faceBook}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.linkedIn"
                    >
                      linkedIn
                    </label>
                    <input
                      id="socialMedia.linkedIn"
                      name="socialMedia.linkedIn"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.linkedIn}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.instagram"
                    >
                      instagram
                    </label>
                    <input
                      id="socialMedia.instagram"
                      name="socialMedia.instagram"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.instagram}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.threads"
                    >
                      threads
                    </label>
                    <input
                      id="socialMedia.threads"
                      name="socialMedia.threads"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.threads}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.snapChat"
                    >
                      snapChat
                    </label>
                    <input
                      id="socialMedia.snapChat"
                      name="socialMedia.snapChat"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.snapChat}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.youtube"
                    >
                      youtube
                    </label>
                    <input
                      id="socialMedia.youtube"
                      name="socialMedia.youtube"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.youtube}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-navBackground text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
