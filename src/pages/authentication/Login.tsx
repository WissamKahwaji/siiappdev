import logo from "../../assets/logo_black.png";
import googlePlayImg from "../../assets/google play.png";
import appleStoreImg from "../../assets/apple_store_2.png";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../apis/auth/queries";
import { SignInValues } from "../../apis/auth/type";
import { Formik, FormikHelpers } from "formik";
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
  const navigate = useNavigate();
  return (
    <div className="py-20 w-full flex flex-col md:flex-row items-center justify-center md:space-x-20">
      <div className="md:w-64 w-32 h-auto">
        <img src={logo} alt="" className="object-contain" />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          const errors = { email: "" };
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={handleSignIn}
      >
        <form>
          <div className=" flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm  flex flex-col">
              <form className="flex flex-col w-72 space-y-2 ">
                <input
                  type="text"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none "
                  placeholder="Your Email or Phone Number"
                />
                <input
                  type="text"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none "
                  placeholder="Your Password"
                />

                <button
                  type="button"
                  className="text-sm font-header bg-navBackground text-secondary py-1 rounded font-medium"
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  Log In
                </button>
              </form>
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
              <div className="mt-8 text-gray-600 text-center">
                Don't have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
              <p className="mt-4 text-primary font-header text-lg">
                Get The App
              </p>
              <div className="flex flex-row space-x-2">
                <img src={googlePlayImg} alt="" className="w-32 h-auto" />
                <img src={appleStoreImg} alt="" className="w-32 h-auto" />
              </div>
            </div>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default Login;
