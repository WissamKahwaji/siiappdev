import { useState } from "react";
import card from "../../assets/card_front_last.png";
import yellowCardBack from "../../assets/card_back_last.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {
  useEditSiiCardMutaion,
  useGetUserSiiCardQuery,
} from "../../apis/sii_card/queries";
import { SyncLoader } from "react-spinners";
import { EditCardParams } from "../../apis/sii_card/type";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  mobileNumber: Yup.string().required("Please enter your mobile number"),
});

const SiiCardInfo = () => {
  const { t } = useTranslation();
  const { data: cardInfo, isLoading, isError } = useGetUserSiiCardQuery();
  const [isFlipped, setIsFlipped] = useState(false);
  const { mutate: editSiiCard } = useEditSiiCardMutaion();

  const handleSubmit = (
    values: EditCardParams,
    { setSubmitting }: FormikHelpers<EditCardParams>
  ) => {
    editSiiCard(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const initialValues: EditCardParams = {
    email: cardInfo?.email ?? "",
    mobileNumber: cardInfo?.mobileNumber ?? "",
  };

  const handleSwapClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isError) return <div>Error loading data...</div>;

  return (
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center font-header w-full h-full py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-400 flex flex-col items-start justify-start md:w-1/3 max-w-full w-full">
            <h2 className="text-2xl mb-8 bg-secondary px-3 py-1 rounded-sm shadow-sm text-navBackground">
              {t("sii_card_info")}
            </h2>

            <div className="relative w-full justify-center flex h-[200px] md:h-[250px]  mb-10">
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180 backface-hidden" : ""
                }`}
              >
                <img src={card} alt="Card Back" className="w-full h-full" />
              </div>
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "" : "rotate-y-180 backface-hidden"
                }`}
              >
                <img
                  src={yellowCardBack}
                  alt="Card Front"
                  className="w-full h-full"
                />
              </div>
              <button
                type="button"
                onClick={handleSwapClick}
                className="absolute top-0 left-9 transform -translate-x-1/2 m-3 bg-white rounded-full w-14 p-2 shadow-md z-10 flex justify-center items-center "
              >
                <FontAwesomeIcon icon={faRightLeft} />
              </button>
            </div>

            <div className="grid grid-cols-1  gap-6 w-full">
              <div>
                <p className="text-sm">{t("card_number")}</p>
                <div
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-not-allowed"
                  style={{ direction: "ltr" }}
                >
                  {cardInfo?._id}
                </div>
              </div>
              <div>
                <p className="text-sm">{t("your_email")}</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20 w-full"
                  style={{ direction: "ltr" }}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm">{t("mobile_number")}</p>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobileNumber}
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20 w-full"
                  style={{ direction: "ltr" }}
                />
                {errors.mobileNumber && touched.mobileNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.mobileNumber}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm">{t("full_name")}</p>
                <div
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-not-allowed"
                  style={{ direction: "ltr" }}
                >
                  {cardInfo?.fullName}
                </div>
              </div>
              <div>
                <p className="text-sm">{t("user_name")}</p>
                <div
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-not-allowed"
                  style={{ direction: "ltr" }}
                >
                  {cardInfo?.userName}
                </div>
              </div>

              <div>
                <p className="text-sm">{t("qr_code_link")}</p>
                <div
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-copy"
                  style={{ direction: "ltr" }}
                >
                  {cardInfo?.qrCode ??
                    `https://www.siiapp.com/${cardInfo?.fullName}`}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary transform ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? t("Saving") : t("save")}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SiiCardInfo;
