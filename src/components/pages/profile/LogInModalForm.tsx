import { useState } from "react";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { SignInValues } from "../../../apis/auth/type";
import { Formik, FormikHelpers } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from "react-spinners";
import { useSwitchAccountMutation } from "../../../apis/account/queries";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("please_enter_your_email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
});
const LogInModalForm = () => {
  const { t } = useTranslation();
  const { mutate: signIn } = useSwitchAccountMutation();
  const [showPassword, setShowPassword] = useState(false);
  const handleSignIn = (
    values: SignInValues,
    { setSubmitting }: FormikHelpers<SignInValues>
  ) => {
    signIn(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: localStorage.getItem("email") ?? "",
          password: localStorage.getItem("password") ?? "",
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm flex flex-col">
              <div className="flex flex-col w-72 space-y-2">
                <div>
                  <input
                    type="text"
                    name="email"
                    className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                    placeholder={t("your_email_or_phone_number")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    style={{
                      direction: "ltr",
                    }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                      placeholder={t("password")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      style={{
                        direction: "ltr",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 bottom-2 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-sm font-header bg-secondary text-navBackground py-1 rounded font-medium hover:bg-navBackground hover:text-secondary transform duration-200"
                >
                  {isSubmitting ? (
                    <PulseLoader size={5} color="white" />
                  ) : (
                    t("login")
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <a href="#" className="text-xs text-blue-500 hover:underline">
                  {t("forget_password")}
                </a>
              </div>

              <div className="flex items-center mt-6">
                <div className="border-t border-gray-300 flex-grow"></div>
                <div className="mx-4 text-sm text-gray-500">{t("or")}</div>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <button
                type="button"
                className="bg-blue-800 text-white text-sm font-semibold rounded-full py-2 mt-6 transition duration-300 hover:bg-blue-900 focus:outline-none"
              >
                {t("login_with_facebook")}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white text-sm font-semibold rounded-full py-2 mt-3 transition duration-300 hover:bg-red-700 focus:outline-none"
              >
                {t("login_with_google")}
              </button>
              <button
                type="button"
                className="bg-black text-white text-sm font-semibold rounded-full py-2 mt-3 transition duration-300 hover:bg-gray-800 focus:outline-none"
              >
                {t("login_with_apple")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LogInModalForm;
