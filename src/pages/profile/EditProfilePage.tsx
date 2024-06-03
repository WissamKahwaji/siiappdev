/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  useEditProfileMutation,
  useGetUserByIdQuery,
} from "../../apis/account/queries";
import { EditProfileProps } from "../../apis/account/type";

import { SyncLoader } from "react-spinners";
import ImageCropper from "../../components/const/ImageCropper";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  bio: Yup.string(),
  mobileNumber: Yup.string(),
  userCategory: Yup.string(),
  userAbout: Yup.object().shape({
    aboutUs: Yup.string(),
    ourMission: Yup.string(),
    ourVision: Yup.string(),
  }),
  socialMedia: Yup.object().shape({
    webSite: Yup.string(),
    whatsApp: Yup.string(),
    faceBook: Yup.string(),
    linkedIn: Yup.string(),
    instagram: Yup.string(),
    threads: Yup.string(),
    snapChat: Yup.string(),
    youtube: Yup.string(),
    xPlatform: Yup.string(),
    painterest: Yup.string(),
    otherLink: Yup.string(),
  }),
});

const userCategories = [
  "Finance",
  "Media Agency",
  "Public",
  "Creator account",
  "Music",
  "Restaurants",
  "Business account",
  "Personal account",
  "Makeup",
  "Agriculture",
  "Local service",
  "Photographer",
  "Social Club",
  "Entertainment",
  "Food",
  "Clothes",
  "Real Estate",
  "Fashion",
  "Nonprofit organization",
  "Retail",
];

const EditProfilePage: React.FC = () => {
  const { data: userInfo, isLoading, isError } = useGetUserByIdQuery();
  const { mutate: editProfileInfo } = useEditProfileMutation();
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string>("");

  const handleCropComplete = (croppedFile: File, setFieldValue: any) => {
    setCroppedImageFile(croppedFile);
    console.log(croppedImageFile?.name);
    setFieldValue("profileImage", croppedFile);
    const reader = new FileReader();
    reader.readAsDataURL(croppedFile);
    reader.onloadend = () => {
      setCroppedImageDataUrl(reader.result as string);
    };
  };
  const initialValues: EditProfileProps = {
    userName: userInfo?.userName ?? "",
    mobileNumber: userInfo?.mobileNumber ?? "",
    fullName: userInfo?.fullName ?? "",
    bio: userInfo?.bio ?? "",
    userCategory: userInfo?.userCategory ?? "",
    userAbout: {
      aboutUs: userInfo?.userAbout?.aboutUs ?? "",
      ourMission: userInfo?.userAbout?.ourMission ?? "",
      ourVision: userInfo?.userAbout?.ourVision ?? "",
    },
    socialMedia: {
      webSite: userInfo?.socialMedia?.webSite ?? "",
      whatsApp: userInfo?.socialMedia?.whatsApp ?? "",
      faceBook: userInfo?.socialMedia?.faceBook ?? "",
      linkedIn: userInfo?.socialMedia?.linkedIn ?? "",
      instagram: userInfo?.socialMedia?.instagram ?? "",
      threads: userInfo?.socialMedia?.threads ?? "",
      snapChat: userInfo?.socialMedia?.snapChat ?? "",
      youtube: userInfo?.socialMedia?.youtube ?? "",
      painterest: userInfo?.socialMedia?.painterest ?? "",
      xPlatform: userInfo?.socialMedia?.xPlatform ?? "",
      otherLink: userInfo?.socialMedia?.otherLink ?? "",
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

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">Error loading profile</div>
    );
  }

  return (
    <div className="container mx-auto py-12 ">
      <h1 className="text-3xl font-bold text-center mb-8 ">Edit Profile</h1>
      <div className="flex justify-center md:w-1/2 md:mx-auto">
        <div className="bg-white p-10 rounded-lg shadow-lg border border-secondary w-full mx-2 ">
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
              setFieldValue,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                  {/* <ImageDragDropField
                    name="profileImage"
                    label="Change your profile photo"
                    oldImg={userInfo?.profileImage}
                  /> */}
                  <div className=" ">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Profile Picture
                    </label>
                    <div className="flex flex-row w-full">
                      <img
                        src={
                          croppedImageDataUrl != ""
                            ? croppedImageDataUrl
                            : userInfo?.profileImage
                        }
                        alt="Cropped"
                        className="rounded-md border border-secondary shadow-sm shadow-secondary w-32 h-32 object-cover"
                      />
                      <ImageCropper
                        aspect={1}
                        onCropComplete={croppedFile => {
                          handleCropComplete(croppedFile, setFieldValue);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-3 grid-cols-1">
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="fullName"
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
                      className="px-4 py-2 border h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      htmlFor="userCategory"
                    >
                      User Category
                    </label>
                    <div className="relative">
                      <select
                        id="userCategory"
                        name="userCategory"
                        className="block appearance-none w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.userCategory}
                      >
                        <option
                          value=""
                          label="Select category"
                          className="text-secondary"
                        />
                        {userCategories.map(category => (
                          <option
                            key={category}
                            value={category}
                            className="text-xs"
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                    {errors.userCategory && touched.userCategory && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.userCategory}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.webSite"
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
                      WhatsApp
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
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.xPlatform"
                    >
                      xPlatform
                    </label>
                    <input
                      id="socialMedia.xPlatform"
                      name="socialMedia.xPlatform"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.xPlatform}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.painterest"
                    >
                      painterest
                    </label>
                    <input
                      id="socialMedia.painterest"
                      name="socialMedia.painterest"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.painterest}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.otherLink"
                    >
                      other Link
                    </label>
                    <input
                      id="socialMedia.otherLink"
                      name="socialMedia.otherLink"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.otherLink}
                    />
                  </div>
                  {/* Add other social media fields similarly */}
                </div>
                <p className="text-navBackground bg-secondary font-serif font-semibold px-3 w-fit rounded py-1">
                  About Section
                </p>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="userAbout.aboutUs"
                  >
                    About Us
                  </label>
                  <textarea
                    id="userAbout.aboutUs"
                    name="userAbout.aboutUs"
                    className="px-4 py-2 border h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userAbout?.aboutUs ?? ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="userAbout.ourVision"
                  >
                    Our Vision
                  </label>
                  <textarea
                    id="userAbout.ourVision"
                    name="userAbout.ourVision"
                    className="px-4 py-2 border h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userAbout?.ourVision ?? ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="userAbout.ourMission"
                  >
                    Our Mission
                  </label>
                  <textarea
                    id="userAbout.ourMission"
                    name="userAbout.ourMission"
                    className="px-4 py-2 border h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userAbout?.ourMission ?? ""}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
