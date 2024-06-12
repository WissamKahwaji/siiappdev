import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../apis/auth/queries";
import { ResetPasswordParams } from "../../apis/auth/type";
import { Formik, FormikHelpers } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from "react-spinners";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const { token } = useParams<string>();
  const { t } = useTranslation();
  const { mutate: resetPassword } = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSignIn = (
    values: ResetPasswordParams,
    { setSubmitting }: FormikHelpers<ResetPasswordParams>
  ) => {
    resetPassword(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const initialValues: ResetPasswordParams = {
    token: token ?? "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="flex items-center justify-center pt-40">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("reset_password")}
        </h2>
        <Formik
          initialValues={initialValues}
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
              <div className="relative" style={{ direction: "ltr" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute bottom-2 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}

              <div className="relative" style={{ direction: "ltr" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("confirm_password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute bottom-2 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </div>
              )}

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

export default ResetPassword;
