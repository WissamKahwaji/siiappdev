import googlePlayImg from "../../assets/google play.png";
import appleStoreImg from "../../assets/apple_store_2.png";
import { Link } from "react-router-dom";
import { useSignInMutation } from "../../apis/auth/queries";
import { SignInValues } from "../../apis/auth/type";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";
import { MdArrowRightAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo_video from "../../assets/video_logo.mp4";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string().required(
    "Please enter your email or mobileNumber or username"
  ),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const { t } = useTranslation();
  const { mutate: signIn } = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth endpoint
    window.location.href =
      "https://siiappback.siidevelopment.com/users/auth/google";
  };
  // const handleFacebookLogin = () => {
  //   window.location.href = "http://localhost:5001/users/auth/facebook";
  // };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userName = params.get("userName");
    const email = params.get("email");
    const userId = params.get("userId");

    if (token && userName && email && userId) {
      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email);

      window.location.href = `/${userName}`;
    }
  }, []);

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

  useEffect(() => {
    const video = document.getElementById("logoVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.log("Auto-play was prevented, trying to play manually", error);
      });
    }
  }, []);

  return (
    <div className="py-20 w-full flex flex-col md:flex-row items-center justify-center md:space-x-20 capitalize">
      <div className="md:w-96 w-52 h-auto">
        <video
          id="logoVideo"
          autoPlay
          playsInline
          muted
          loop
          className="object-cover w-full h-full"
        >
          <source src={logo_video} type="video/mp4" />
        </video>
      </div>
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
                <a
                  href="/forget-password"
                  className="text-xs text-blue-500 hover:underline"
                >
                  {t("forget_password")}
                </a>
              </div>

              <div className="flex items-center mt-6">
                <div className="border-t border-gray-300 flex-grow"></div>
                <div className="mx-4 text-sm text-gray-500">{t("or")}</div>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              {/* <button
                type="button"
                onClick={handleFacebookLogin}
                className="bg-blue-800 text-white text-sm font-semibold rounded-full py-2 mt-6 transition duration-300 hover:bg-blue-900 focus:outline-none"
              >
                {t("login_with_facebook")}
              </button> */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="bg-gray-500 text-white text-sm font-semibold rounded-full py-2 mt-3 transition duration-300 hover:bg-red-700 focus:outline-none"
              >
                {t("login_with_google")}
              </button>

              {/* <button
                type="button"
                className="bg-black text-white text-sm font-semibold rounded-full py-2 mt-3 transition duration-300 hover:bg-gray-800 focus:outline-none"
              >
                {t("login_with_apple")}
              </button> */}

              <div className="mt-8 text-gray-600 text-center">
                {t("don't_have_any_account")}
                <Link
                  to="/register"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  {t("signup")}
                </Link>
              </div>

              <div className="flex items-center mt-6">
                <div className="border-t border-gray-300 flex-grow"></div>
                <div className="mx-4 text-sm text-gray-500">{t("or")}</div>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <Link to={`/home`} replace>
                <div className="cursor-pointer text-center mt-5 bg-secondary rounded-lg shadow-lg shadow-navBackground/20 py-1 space-x-1 flex flex-row justify-center items-center">
                  <p className="font-semibold font-header">
                    {t("skip_to_home")}
                  </p>
                  <MdArrowRightAlt size={25} />
                </div>
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 mt-6">
              <p className="text-primary font-header text-lg">
                {t("get_the_app")}
              </p>
              <div className="flex flex-row space-x-2">
                <img
                  src={googlePlayImg}
                  alt="Google Play"
                  className="w-32 h-auto"
                />
                <img
                  src={appleStoreImg}
                  alt="Apple Store"
                  className="w-32 h-auto"
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
