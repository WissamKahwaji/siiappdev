import logo from "../../assets/logo_sii_new_2.png";
import googlePlayImg from "../../assets/google play.png";
import appleStoreImg from "../../assets/apple_store_2.png";
import { Link } from "react-router-dom";
import { useSignInMutation } from "../../apis/auth/queries";
import { SignInValues } from "../../apis/auth/type";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";
import { MdArrowRightAlt } from "react-icons/md";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const { mutate: signIn } = useSignInMutation();

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
    <div className="py-20 w-full flex flex-col md:flex-row items-center justify-center md:space-x-20">
      <div className="md:w-64 w-32 h-auto">
        <img src={logo} alt="Logo" className="object-contain" />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
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
                    placeholder="Your Email or Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                    placeholder="Your Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
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
                    "Log In"
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <a href="#" className="text-xs text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="flex items-center mt-6">
                <div className="border-t border-gray-300 flex-grow"></div>
                <div className="mx-4 text-sm text-gray-500">Or</div>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <button
                type="button"
                className="bg-blue-800 text-white text-sm font-semibold rounded-full py-2 mt-6 transition duration-300 hover:bg-blue-900 focus:outline-none"
              >
                Log In with Facebook
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white text-sm font-semibold rounded-full py-2 mt-3 transition duration-300 hover:bg-red-700 focus:outline-none"
              >
                Log In with Google
              </button>
              <button
                type="button"
                className="bg-black text-white text-sm font-semibold rounded-full py-2 mt-3 transition duration-300 hover:bg-gray-800 focus:outline-none"
              >
                Log In with Apple
              </button>

              <div className="mt-8 text-gray-600 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </div>
              <div className="flex items-center mt-6">
                <div className="border-t border-gray-300 flex-grow"></div>
                <div className="mx-4 text-sm text-gray-500">Or</div>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              <Link to={`/`} replace>
                <div className="cursor-pointer text-center mt-5 bg-secondary rounded-lg shadow-lg shadow-navBackground/20 py-1 space-x-1 flex flex-row justify-center items-center">
                  <p className="font-semibold font-header">Skip To Home</p>
                  <MdArrowRightAlt size={25} />
                </div>
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 mt-6">
              <p className="text-primary font-header text-lg">Get The App</p>
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
