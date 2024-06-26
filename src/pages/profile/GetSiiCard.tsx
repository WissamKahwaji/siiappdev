import { Formik, FormikHelpers } from "formik";
import { SiiCardModel } from "../../apis/sii_card/type";
import * as Yup from "yup";
import { useAddSiiCardMutaion } from "../../apis/sii_card/queries";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetUserByIdQuery } from "../../apis/account/queries";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useGetCardPrivacyPolicyQuery } from "../../apis/card_privacy_policy/queries";
import PrivacyPolicyModal from "../../components/const/PrivacyPolicyModal";
import cardImg from "../../assets/card_front_last.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format"),
  fullName: Yup.string().required("Please enter your full name"),
  mobileNumber: Yup.string()
    .required("Please enter your mobile number")
    .matches(/^\+?\d+$/, "Invalid mobile number")
    .min(9, "Mobile number must be at least 11 characters long"),
});

const GetSiiCard = () => {
  const navigate = useNavigate();
  const { userName } = useParams<string>();
  const { data: userInfo, isLoading, isError } = useGetUserByIdQuery();
  const { data: cardPrivacyPolicy } = useGetCardPrivacyPolicyQuery();

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<SiiCardModel | null>(null);

  useEffect(() => {
    if (userInfo?.siiCard) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  const { t } = useTranslation();
  const initialValues: SiiCardModel = {
    fullName: userInfo?.fullName ?? "",
    email: userInfo?.email ?? "",
    mobileNumber: userInfo?.mobileNumber ?? "",
  };

  const [yourName, setYourName] = useState(userInfo?.fullName ?? "");
  const { mutate: addSiiCard } = useAddSiiCardMutaion();

  const handleSubmit = (
    values: SiiCardModel,
    { setSubmitting }: FormikHelpers<SiiCardModel>
  ) => {
    setFormValues(values);
    setShowModal(true);
    setSubmitting(false);
  };

  const handleAgree = () => {
    if (formValues) {
      addSiiCard(formValues, {
        onSettled: () => {
          setShowModal(false);
          setFormValues(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">Error loading</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center font-header w-full h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-400 flex flex-col items-start justify-start max-w-lg w-full">
        <h2 className="text-2xl mb-3">{t("get_your_sii_card")}</h2>
        <div className="relative w-full justify-center flex h-[200px] md:h-[250px]  mb-6">
          <img src={cardImg} alt="" className="w-full h-full" />
          <p className="absolute bottom-3 md:left-11 left-8 text-white font-serif md:text-lg text-sm">
            {yourName}
          </p>
        </div>
        <p className="text-gray-700 text-sm mb-2">{t("get_sii_card_info")}</p>
        <hr className="w-full mb-6" />
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="userName"
                  >
                    {t("user_name")}
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    readOnly
                    type="text"
                    value={userName}
                    className="w-full p-2 border border-secondary rounded-lg bg-gray-50 opacity-40 cursor-not-allowed"
                    style={{ direction: "ltr" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="fullName"
                  >
                    {t("your_name_on_the_card")}
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded-lg bg-navBackground/20"
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e);
                      setYourName(e.currentTarget.value);
                    }}
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
                    htmlFor="email"
                  >
                    {t("your_email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded-lg bg-navBackground/20"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    style={{ direction: "ltr" }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="mobileNumber"
                  >
                    {t("mobile_number")}
                  </label>
                  <PhoneInput
                    containerStyle={{ direction: "ltr" }}
                    country={"ae"}
                    value={values.mobileNumber}
                    onBlur={handleBlur}
                    onChange={value => setFieldValue("mobileNumber", value)}
                    inputProps={{ required: true }}
                    placeholder={t("your_mobile_number")}
                    inputStyle={{
                      width: "100%",
                      height: "41px",
                      border: "1px solid #757575",
                      borderRadius: "0.375rem",
                      fontSize: "15px",
                      outline: "none",
                      backgroundColor: "#d3d3d3",
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
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? t("Saving") : t("save")}
              </button>
            </form>
          )}
        </Formik>
      </div>

      <PrivacyPolicyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAgree={handleAgree}
        privacyPolicy={cardPrivacyPolicy?.titleEn ?? ""}
      />
    </div>
  );
};

export default GetSiiCard;
