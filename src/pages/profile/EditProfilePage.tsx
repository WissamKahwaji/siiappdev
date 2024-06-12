/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  useEditProfileMutation,
  useGetUserByIdQuery,
} from "../../apis/account/queries";
import { EditProfileProps } from "../../apis/account/type";

import ImageCropper from "../../components/const/ImageCropper";
import ToggleSwitch from "../../components/const/ToggleSwitch";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingComponent from "../../components/const/LoadingComponent";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  bio: Yup.string(),
  mobileNumber: Yup.string()
    .matches(/^\+?\d+$/, "Invalid mobile number")
    .min(9, "Mobile number must be at least 9 characters long"),
  userCategory: Yup.string(),
  userAbout: Yup.object().shape({
    aboutUs: Yup.string(),
    ourMission: Yup.string(),
    ourVision: Yup.string(),
  }),
  socialMedia: Yup.object().shape({
    webSite: Yup.string(),
    whatsApp: Yup.string()
      .matches(/^\+?\d+$/, "Invalid mobile number")
      .min(9, "Mobile number must be at least 9 characters long"),
    faceBook: Yup.string(),
    linkedIn: Yup.string(),
    instagram: Yup.string(),
    threads: Yup.string(),
    snapChat: Yup.string(),
    youtube: Yup.string(),
    tiktok: Yup.string(),
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
  const { t } = useTranslation();
  const { data: userInfo, isLoading, isError } = useGetUserByIdQuery();
  const { mutate: editProfileInfo } = useEditProfileMutation();
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string>("");
  const [isBusinessAccount, setIsBusinessAccount] = useState(
    userInfo?.isBusiness ?? false
  );
  const [fileError, setFileError] = useState<string | null>(null);
  const handleSwitchChange = (checked: boolean, setFieldValue: any) => {
    setIsBusinessAccount(checked);

    setFieldValue("isBusiness", checked);
    // You can also make an API call here to update the user's account type
  };
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
    isBusiness: userInfo?.isBusiness ?? false,
    userAbout: {
      aboutUs: userInfo?.userAbout?.aboutUs ?? "",
      ourMission: userInfo?.userAbout?.ourMission ?? "",
      ourVision: userInfo?.userAbout?.ourVision ?? "",
    },
    location: userInfo?.location ?? "",
    socialMedia: {
      webSite: userInfo?.socialMedia?.webSite ?? "",
      companyProfile: userInfo?.socialMedia?.companyProfile ?? "",
      whatsApp: userInfo?.socialMedia?.whatsApp ?? "",
      faceBook: userInfo?.socialMedia?.faceBook ?? "",
      linkedIn: userInfo?.socialMedia?.linkedIn ?? "",
      instagram: userInfo?.socialMedia?.instagram ?? "",
      threads: userInfo?.socialMedia?.threads ?? "",
      snapChat: userInfo?.socialMedia?.snapChat ?? "",
      youtube: userInfo?.socialMedia?.youtube ?? "",
      painterest: userInfo?.socialMedia?.painterest ?? "",
      tiktok: userInfo?.socialMedia?.tiktok ?? "",
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
        <LoadingComponent />
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
      <h1 className="text-3xl font-bold text-center mb-8 ">
        {t("edit_profile")}
      </h1>
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
                      {t("profile_picture")}
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
                      {t("full_name")}
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      style={{ direction: "ltr" }}
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
                      {t("bio")}
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="px-4 py-2 border h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bio ?? ""}
                      style={{ direction: "ltr" }}
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
                      {t("phone_number")}
                    </label>
                    {/* <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobileNumber}
                      style={{ direction: "ltr" }}
                    /> */}
                    <PhoneInput
                      containerStyle={{ direction: "ltr" }}
                      country={"ae"}
                      value={values.mobileNumber}
                      onBlur={handleBlur}
                      onChange={value => setFieldValue("mobileNumber", value)}
                      placeholder={t("mobileNumber")}
                      inputStyle={{
                        width: "100%",
                        height: "41px",
                        border: "1px solid #d3d3d3",
                        borderRadius: "0.375rem",
                        fontSize: "15px",
                        outline: "none",

                        direction: "ltr",
                      }}
                      buttonStyle={{
                        margin: 3,
                        direction: "ltr",
                      }}
                    />
                    {errors.mobileNumber && touched.mobileNumber && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.mobileNumber}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center my-2">
                    <ToggleSwitch
                      label={t("switch_to_business_account")}
                      checked={values.isBusiness ?? isBusinessAccount}
                      onChange={e => {
                        handleSwitchChange(e, setFieldValue);
                      }}
                    />
                  </div>
                  {values.isBusiness && (
                    <div className="flex flex-col">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="userCategory"
                      >
                        {t("user_category")}
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
                  )}

                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.webSite"
                    >
                      {t("website")}
                    </label>
                    <input
                      id="socialMedia.webSite"
                      name="socialMedia.webSite"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.webSite}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-1 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.webSite"
                    >
                      {t("company_profile_and_others")}
                    </label>
                    <p className="text-xs text-gray-700 mb-1">
                      file size must be less than 25MB
                    </p>
                    <input
                      id="doc"
                      name="doc"
                      type="file"
                      accept="application/pdf"
                      onBlur={handleBlur}
                      onChange={event => {
                        const file = event.currentTarget.files![0];
                        if (file && file.size > 25 * 1024 * 1024) {
                          setFileError("File size should not exceed 25MB");
                          setFieldValue("doc", null);
                        } else {
                          setFileError(null);
                          setFieldValue("doc", file);
                        }
                      }}
                      className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {fileError && (
                    <div className="text-red-500 text-xs mt-1">{fileError}</div>
                  )}

                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="location"
                    >
                      {t("location")}
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      style={{ direction: "ltr" }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.whatsApp"
                    >
                      {t("whatsApp")}
                    </label>
                    {/* <input
                      id="socialMedia.whatsApp"
                      name="socialMedia.whatsApp"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.whatsApp}
                      style={{ direction: "ltr" }}
                    /> */}
                    <PhoneInput
                      containerStyle={{ direction: "ltr" }}
                      country={"ae"}
                      value={values.socialMedia?.whatsApp}
                      onBlur={handleBlur}
                      onChange={value =>
                        setFieldValue("socialMedia.whatsApp", value)
                      }
                      placeholder={t("whatsApp")}
                      inputStyle={{
                        width: "100%",
                        height: "41px",
                        border: "1px solid #d3d3d3",
                        borderRadius: "0.375rem",
                        fontSize: "15px",
                        outline: "none",

                        direction: "ltr",
                      }}
                      buttonStyle={{
                        margin: 3,
                        direction: "ltr",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.faceBook"
                    >
                      {t("faceBook")}
                    </label>
                    <input
                      id="socialMedia.faceBook"
                      name="socialMedia.faceBook"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.faceBook}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.linkedIn"
                    >
                      {t("linkedIn")}
                    </label>
                    <input
                      id="socialMedia.linkedIn"
                      name="socialMedia.linkedIn"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.linkedIn}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.instagram"
                    >
                      {t("instagram")}
                    </label>
                    <input
                      id="socialMedia.instagram"
                      name="socialMedia.instagram"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.instagram}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.threads"
                    >
                      {t("threads")}
                    </label>
                    <input
                      id="socialMedia.threads"
                      name="socialMedia.threads"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.threads}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.tiktok"
                    >
                      {t("tiktok")}
                    </label>
                    <input
                      id="socialMedia.tiktok"
                      name="socialMedia.tiktok"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.tiktok}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.snapChat"
                    >
                      {t("snapChat")}
                    </label>
                    <input
                      id="socialMedia.snapChat"
                      name="socialMedia.snapChat"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.snapChat}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.youtube"
                    >
                      {t("youtube")}
                    </label>
                    <input
                      id="socialMedia.youtube"
                      name="socialMedia.youtube"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.youtube}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.xPlatform"
                    >
                      {t("xPlatform")}
                    </label>
                    <input
                      id="socialMedia.xPlatform"
                      name="socialMedia.xPlatform"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.xPlatform}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.painterest"
                    >
                      {t("painterest")}
                    </label>
                    <input
                      id="socialMedia.painterest"
                      name="socialMedia.painterest"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.painterest}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="socialMedia.otherLink"
                    >
                      {t("other_link")}
                    </label>
                    <input
                      id="socialMedia.otherLink"
                      name="socialMedia.otherLink"
                      type="text"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.socialMedia?.otherLink}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  {/* Add other social media fields similarly */}
                </div>
                <p className="text-navBackground bg-secondary font-serif font-semibold px-3 w-fit rounded py-1">
                  {t("about_section")}
                </p>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="userAbout.aboutUs"
                  >
                    {t("about_us")}
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
                    {t("our_vision")}
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
                    {t("our_mission")}
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
                  {isSubmitting ? t("Saving") : t("save")}
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
