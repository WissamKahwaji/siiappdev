import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SignInValues } from "../../apis/auth/type";
import { useSignInMutation } from "../../apis/auth/queries";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
});
const LoginModalContent = () => {
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  w-full  space-y-2">
            <div>
              <input
                type="text"
                name="email"
                className="text-xs w-1/2 font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
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
                className="text-xs w-1/2 font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder="Your Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-sm font-header mx-auto w-1/2 bg-navBackground text-secondary py-1 rounded font-medium"
            >
              {isSubmitting ? <PulseLoader size={5} color="white" /> : "Log In"}
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
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginModalContent;
