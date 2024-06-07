import * as Yup from "yup";

import { Formik, FormikHelpers } from "formik";
import { SignUpValues } from "../../../apis/auth/type";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from "react-spinners";
import { useSignUpWithAddMutation } from "../../../apis/account/queries";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format"),
  userName: Yup.string()
    .required("Please enter your username")
    .matches(/^\S*$/, "Username should not contain spaces"),
  fullName: Yup.string().required("Please enter your full name"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal = ({ onClose }: SignUpModalProps) => {
  const { t } = useTranslation();

  const { mutate: signUp } = useSignUpWithAddMutation();

  const handleSignUp = (
    values: SignUpValues,
    { setSubmitting }: FormikHelpers<SignUpValues>
  ) => {
    signUp(values, {
      onSettled: () => {
        setSubmitting(false);
        onClose();
      },
    });
  };

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full flex justify-center items-center min-w-[300px]">
      <Formik
        initialValues={{
          email: "",
          userName: "",
          fullName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
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
            className="flex flex-col md:w-1/2 w-full space-y-2"
          >
            <input
              type="text"
              name="email"
              className="text-xs w-full font-header rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
              placeholder={t("your_email_or_phone_number")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}

            <input
              type="text"
              name="userName"
              className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
              placeholder={t("username")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
            />
            {errors.userName && touched.userName && (
              <div className="text-red-500 text-xs">{errors.userName}</div>
            )}

            <input
              type="text"
              name="fullName"
              className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
              placeholder={t("fullname")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && (
              <div className="text-red-500 text-xs">{errors.fullName}</div>
            )}

            <div className="relative">
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

            <div className="relative">
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
              className="text-sm font-header bg-secondary text-navBackground py-1 rounded font-medium flex items-center justify-center hover:bg-navBackground hover:text-secondary transform duration-200"
            >
              {isSubmitting ? (
                <PulseLoader size={20} color="white" />
              ) : (
                t("signup")
              )}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpModal;
