import { Formik, FormikHelpers } from "formik";

import { SiiCardModel } from "../../apis/sii_card/type";
import * as Yup from "yup";
import { useAddSiiCardMutaion } from "../../apis/sii_card/queries";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format"),
  fullName: Yup.string().required("Please enter your full name"),
  mobileNumber: Yup.string().required("Please enter your mobile number"),
});

const GetSiiCard = () => {
  const { userName } = useParams<string>();
  const { t } = useTranslation();
  const initialValues: SiiCardModel = {
    fullName: "",
    email: "",
    mobileNumber: "",
  };

  const { mutate: addSiiCard } = useAddSiiCardMutaion();

  const handleSubmit = (
    values: SiiCardModel,
    { setSubmitting }: FormikHelpers<SiiCardModel>
  ) => {
    addSiiCard(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center font-header w-full h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-400 flex flex-col items-start justify-start max-w-lg w-full">
        <h2 className="text-2xl mb-3">{t("get_your_sii_card")}</h2>
        <p className="text-gray-700 text-sm mb-2">
          {t("get_your_sii_card_info")}
        </p>
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
                    className="w-full p-2 border border-gray-400 rounded-lg bg-navBackground/20 cursor-not-allowed"
                    style={{ direction: "ltr" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="fullName"
                  >
                    {t("your_name")}
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded-lg bg-navBackground/20"
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
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded-lg bg-navBackground/20"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobileNumber}
                    style={{ direction: "ltr" }}
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
                {isSubmitting ? t("Saveing") : t("save")}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GetSiiCard;
