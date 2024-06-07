import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SignInValues } from "../../apis/auth/type";
import { useSignInMutation } from "../../apis/auth/queries";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
});
const LoginModalContent = () => {
  const { t } = useTranslation();
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
                className="text-xs md:w-1/2 w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("your_email_or_phone_number")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs ">{errors.email}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                className="text-xs md:w-1/2 w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("password")}
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
              className="text-sm font-header mx-auto md:w-1/2 w-full bg-navBackground text-secondary py-1 rounded font-medium"
            >
              {isSubmitting ? (
                <PulseLoader size={5} color="white" />
              ) : (
                t("login")
              )}
            </button>
            <div className="mt-8 text-gray-600 text-center">
              {t("don't_have_any_account")}{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-500 hover:underline"
              >
                {t("signup")}
              </Link>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginModalContent;
