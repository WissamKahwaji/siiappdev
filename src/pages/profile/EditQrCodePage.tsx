import { useParams } from "react-router-dom";
import { useGetUserByUserNameQuery } from "../../apis/account/queries";
import {
  useEditUserQrCodeMutation,
  useGetUserQrCodeQuery,
} from "../../apis/qrcode/queries";
import { qrCodeModel } from "../../apis/qrcode/type";
import { Formik, FormikHelpers } from "formik";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaTrash } from "react-icons/fa";
import { getFileNameFromUrl } from "../../utils";

const validationSchema = Yup.object().shape({
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
});

const EditQrCodePage = () => {
  const { userName } = useParams<{ userName: string }>();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");
  const {
    data: userQrCodeInfo,
    isLoading: isLoadingUserQrCode,
    isError: isErrorUserQrCode,
  } = useGetUserQrCodeQuery(userName ?? "");
  const { mutate: editUserQrCodeInfo } = useEditUserQrCodeMutation();
  const [fileError, setFileError] = useState<string | null>(null);

  const initialValues: qrCodeModel = {
    webSite: userQrCodeInfo?.webSite ?? userInfo?.socialMedia?.webSite,
    companyProfile:
      userQrCodeInfo?.companyProfile ?? userInfo?.socialMedia?.companyProfile,
    whatsApp: userQrCodeInfo?.whatsApp ?? userInfo?.socialMedia?.whatsApp,
    faceBook: userQrCodeInfo?.faceBook ?? userInfo?.socialMedia?.faceBook,
    linkedIn: userQrCodeInfo?.linkedIn ?? userInfo?.socialMedia?.linkedIn,
    instagram: userQrCodeInfo?.instagram ?? userInfo?.socialMedia?.instagram,
    threads: userQrCodeInfo?.threads ?? userInfo?.socialMedia?.threads,
    snapChat: userQrCodeInfo?.snapChat ?? userInfo?.socialMedia?.snapChat,
    youtube: userQrCodeInfo?.youtube ?? userInfo?.socialMedia?.youtube,
    painterest: userQrCodeInfo?.painterest ?? userInfo?.socialMedia?.painterest,
    tiktok: userQrCodeInfo?.tiktok ?? userInfo?.socialMedia?.tiktok,
    xPlatform: userQrCodeInfo?.xPlatform ?? userInfo?.socialMedia?.xPlatform,
    otherLink: userQrCodeInfo?.otherLink ?? userInfo?.socialMedia?.otherLink,
    location: userQrCodeInfo?.location ?? userInfo?.location,
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (
    values: qrCodeModel,
    { setSubmitting }: FormikHelpers<qrCodeModel>
  ) => {
    editUserQrCodeInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isLoadingUser || isLoadingUserQrCode) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isErrorUser || isErrorUserQrCode) {
    return (
      <div className="text-red-500 text-center">Error loading profile</div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8 ">
        {t("edit_qrcode")}
      </h1>
      <div className="flex justify-center md:w-1/2 md:mx-auto">
        <div className="bg-white md:p-10 py-10 px-4 rounded-lg shadow-lg border border-secondary w-full mx-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-1 gap-3 grid-cols-1">
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="webSite"
                    >
                      {t("website")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="webSite"
                        name="webSite"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.webSite}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("webSite", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-1 text-sm font-medium text-gray-700"
                      htmlFor="companyProfile"
                    >
                      {t("company_profile_and_others")}
                    </label>
                    <p className="text-xs text-gray-700 mb-1">
                      file size must be less than 25MB
                    </p>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        ref={fileInputRef}
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
                            setFieldValue("companyProfile", "");
                          } else {
                            setFileError(null);
                            setFieldValue("doc", file);
                            setFieldValue("companyProfile", file.name);
                          }
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-secondary rounded-lg bg-secondary text-navBackground hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-navBackground"
                      >
                        {t("upload_file")}
                      </button>
                      <div className="flex-1 text-sm ml-2">
                        {getFileNameFromUrl(values.companyProfile ?? "")}
                      </div>
                      <FaTrash
                        className="cursor-pointer text-red-500 ml-2"
                        onClick={() => {
                          setFieldValue("doc", null);
                          setFieldValue("companyProfile", "");
                        }}
                      />
                    </div>
                  </div>
                  {fileError && (
                    <div className="text-red-500 text-xs mt-1">{fileError}</div>
                  )}

                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="location"
                    >
                      {t("location")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="location"
                        name="location"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("location", "")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="whatsApp"
                    >
                      {t("whatsApp")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <PhoneInput
                        containerStyle={{ direction: "ltr" }}
                        country={"ae"}
                        value={values.whatsApp}
                        onBlur={handleBlur}
                        onChange={value => setFieldValue("whatsApp", value)}
                        placeholder={t("whatsApp")}
                        inputStyle={{
                          width: "100%",
                          height: "41px",
                          border: "1px solid #FFCF57",
                          borderRadius: "0.375rem",
                          fontSize: "15px",
                          outline: "none",
                          direction: "ltr",
                          flex: "1",
                        }}
                        buttonStyle={{
                          margin: 3,
                          direction: "ltr",
                        }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("whatsApp", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="faceBook"
                    >
                      {t("faceBook")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="faceBook"
                        name="faceBook"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.faceBook}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className=" cursor-pointer text-red-500"
                        onClick={() => setFieldValue("faceBook", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="linkedIn"
                    >
                      {t("linkedIn")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="linkedIn"
                        name="linkedIn"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.linkedIn}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("linkedIn", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="instagram"
                    >
                      {t("instagram")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="instagram"
                        name="instagram"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.instagram}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className=" cursor-pointer text-red-500"
                        onClick={() => setFieldValue("instagram", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="threads"
                    >
                      {t("threads")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="threads"
                        name="threads"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.threads}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("threads", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="tiktok"
                    >
                      {t("tiktok")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="tiktok"
                        name="tiktok"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.tiktok}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("tiktok", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="snapChat"
                    >
                      {t("snapChat")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="snapChat"
                        name="snapChat"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.snapChat}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("snapChat", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="youtube"
                    >
                      {t("youtube")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="youtube"
                        name="youtube"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.youtube}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className=" cursor-pointer text-red-500"
                        onClick={() => setFieldValue("youtube", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="xPlatform"
                    >
                      {t("xPlatform")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="xPlatform"
                        name="xPlatform"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.xPlatform}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("xPlatform", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="painterest"
                    >
                      {t("painterest")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="painterest"
                        name="painterest"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.painterest}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("painterest", "")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col relative">
                    <label
                      className="mb-2 text-sm font-medium text-gray-700"
                      htmlFor="otherLink"
                    >
                      {t("other_link")}
                    </label>
                    <div className="flex flex-row gap-x-2 items-center">
                      <input
                        id="otherLink"
                        name="otherLink"
                        type="text"
                        className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.otherLink}
                        style={{ direction: "ltr" }}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => setFieldValue("otherLink", "")}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary transform ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default EditQrCodePage;
