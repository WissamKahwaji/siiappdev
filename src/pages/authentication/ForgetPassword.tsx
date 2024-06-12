import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { PulseLoader } from "react-spinners";
import * as Yup from "yup";
import React from "react";
import { useForgetPasswordMutation } from "../../apis/auth/queries";
import { ForgetPasswordParams } from "../../apis/auth/type";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
});

const ForgetPassword: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: fotgetPassword } = useForgetPasswordMutation();
  const handleSignIn = (
    values: ForgetPasswordParams,
    { setSubmitting }: FormikHelpers<ForgetPasswordParams>
  ) => {
    fotgetPassword(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex items-center justify-center pt-40">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("forget_password")}
        </h2>
        <Formik
          initialValues={{
            email: localStorage.getItem("email") ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
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
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  {t("email")}
                </label>
                <input
                  type="text"
                  name="email"
                  className="text-sm w-full rounded border bg-gray-100 border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("your_email_or_phone_number")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  style={{ direction: "ltr" }}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {t(errors.email)}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sm bg-secondary text-black py-2 rounded font-medium hover:text-secondary hover:bg-navBackground transition duration-200"
              >
                {isSubmitting ? (
                  <PulseLoader size={5} color="white" />
                ) : (
                  t("reset_password")
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
