import { useState } from "react";
import card from "../../assets/sii_card_back.png";
import yellowCardBack from "../../assets/sii_card_front.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {
  useEditSiiCardMutaion,
  useGetUserSiiCardQuery,
} from "../../apis/sii_card/queries";
import { SyncLoader } from "react-spinners";
import { EditCardParams } from "../../apis/sii_card/type";
import { Formik, FormikHelpers } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  mobileNumber: Yup.string().required("Please enter your mobile number"),
});

const SiiCardInfo = () => {
  const { data: cardInfo, isLoading, isError } = useGetUserSiiCardQuery();
  const [isFlipped, setIsFlipped] = useState(false);
  const { mutate: editSiiCard } = useEditSiiCardMutaion();

  const handleSubmit = (
    values: EditCardParams,
    { setSubmitting }: FormikHelpers<EditCardParams>
  ) => {
    editSiiCard(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const initialValues: EditCardParams = {
    email: cardInfo?.email ?? "",
    mobileNumber: cardInfo?.mobileNumber ?? "",
  };

  const handleSwapClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isError) return <div>Error loading data...</div>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          className="flex flex-col justify-center items-center font-header w-full h-full py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-400 flex flex-col items-start justify-start md:w-1/3 max-w-full w-full">
            <h2 className="text-2xl mb-8 bg-secondary px-3 py-1 rounded-sm shadow-sm text-navBackground">
              Sii Card Info
            </h2>

            <div className="relative w-full justify-center flex h-[200px] md:h-[250px]  mb-10">
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180 backface-hidden" : ""
                }`}
              >
                <img src={card} alt="Card Back" className="w-full h-full" />
              </div>
              <div
                className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "" : "rotate-y-180 backface-hidden"
                }`}
              >
                <img
                  src={yellowCardBack}
                  alt="Card Front"
                  className="w-full h-full"
                />
              </div>
              <button
                type="button"
                onClick={handleSwapClick}
                className="absolute top-0 left-9 transform -translate-x-1/2 m-3 bg-white rounded-full w-14 p-2 shadow-md z-10 flex justify-center items-center "
              >
                <FontAwesomeIcon icon={faRightLeft} />
              </button>
            </div>

            <div className="grid grid-cols-1  gap-6 w-full">
              <div>
                <p className="text-sm">Card Number</p>
                <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-not-allowed">
                  {cardInfo?._id}
                </div>
              </div>
              <div>
                <p className="text-sm">Your Email</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20 w-full"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm">Mobile Number</p>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobileNumber}
                  className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/20 w-full"
                />
                {errors.mobileNumber && touched.mobileNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.mobileNumber}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm">Full Name</p>
                <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-not-allowed">
                  {cardInfo?.fullName}
                </div>
              </div>
              <div>
                <p className="text-sm">User Name</p>
                <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-not-allowed">
                  {cardInfo?.userName}
                </div>
              </div>

              <div>
                <p className="text-sm">Qr Code Link</p>
                <div className="min-w-60 p-2 border border-gray-400 rounded-lg bg-navBackground/10 opacity-80 cursor-copy">
                  {cardInfo?.qrCode ??
                    `https://www.siiapp.com/${cardInfo?.fullName}`}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary transform ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SiiCardInfo;
