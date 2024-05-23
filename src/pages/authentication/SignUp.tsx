import logo from "../../assets/logo_sii.png";
import googlePlayImg from "../../assets/google play.png";
import appleStoreImg from "../../assets/apple_store_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSignUpMutation } from "../../apis/auth/queries";
import { SignUpValues } from "../../apis/auth/type";
import { PulseLoader } from "react-spinners";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format"),
  userName: Yup.string().required("Please enter your username"),
  fullName: Yup.string().required("Please enter your full name"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

const Signup = () => {
  const { mutate: signUp } = useSignUpMutation();

  const handleSignUp = (
    values: SignUpValues,
    { setSubmitting }: FormikHelpers<SignUpValues>
  ) => {
    signUp(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="py-10 w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg border shadow-md max-w-sm flex flex-col justify-center items-center">
          <div className="mb-8">
            <img src={logo} alt="Instagram" className="w-36" />
          </div>
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
                className="flex flex-col w-72 space-y-2"
              >
                <input
                  type="text"
                  name="email"
                  className="text-xs w-full font-header rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder="Your Email Or Phone Number"
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
                  placeholder="Username"
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
                  placeholder="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                />
                {errors.fullName && touched.fullName && (
                  <div className="text-red-500 text-xs">{errors.fullName}</div>
                )}

                <input
                  type="password"
                  name="password"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs">{errors.password}</div>
                )}

                <input
                  type="password"
                  name="confirmPassword"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-sm font-header bg-navBackground text-secondary py-1 rounded font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <PulseLoader size={20} color="white" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            )}
          </Formik>
          <div className="mt-8 text-gray-600 text-center">
            Already have an account?
            <Link
              to="/"
              className="font-semibold text-blue-500 hover:underline"
            >
              Log in
            </Link>
          </div>{" "}
          <div className="w-full">
            <div className="flex items-center my-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <div className="mx-4 text-sm text-gray-500">Or</div>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            <button
              type="button"
              className="w-full flex flex-row justify-center items-center space-x-2 bg-blue-800 text-white text-sm font-semibold rounded-full py-2 transition duration-300 hover:bg-blue-900 focus:outline-none"
            >
              <FontAwesomeIcon icon={faSquareFacebook} color="white" />
              <p>Log In with Facebook</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-3">
          <p className="mt-4 text-primary font-header text-lg">Get The App</p>
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
      </div>
    </div>
  );
};

export default Signup;
