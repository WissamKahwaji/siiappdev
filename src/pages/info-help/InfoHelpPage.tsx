import { useTranslation } from "react-i18next";
import { useGetInfoHelpQuery } from "../../apis/info-help/queries";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../constants/domain";

const InfoHelpPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: infoHelpInfo, isLoading, isError } = useGetInfoHelpQuery();
  const [formData, setFormData] = useState({
    message: "",
  });

  const [shownumber, setShowNumber] = useState(false);

  const handleShowNumber = () => {
    setShowNumber(!shownumber);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/info-help/send-suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: formData.message,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        alert("Your Inquiry sent successfully!");
      } else {
        console.error("Failed to send email");
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send request. Please try again.");
    }
    setFormData({
      message: "",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) return <div>Error loading data...</div>;

  return (
    <div className="flex flex-col font-header mx-5 md:mx-32 md:mt-12 py-10 md:pb-10">
      <h1 className="text-center font-serif text-4xl text-navBackground font-bold mb-16">
        {t("info_help")}
      </h1>
      <div className="flex flex-col space-y-8 mb-12">
        {infoHelpInfo &&
          infoHelpInfo?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start space-y-2"
            >
              <h2 className="font-bold font-header text-xl">
                {selectedLang === "en" ? item.title : item.titleAr}
              </h2>
              <p className="font-serif whitespace-break-spaces leading-8 text-lg text-gray-700">
                {selectedLang === "en" ? item.description : item.descriptionAr}
              </p>
            </div>
          ))}
      </div>
      <div className="w-full grid grid-cols-1 gap-12 mt-12 bg-gray-50 py-8 px-8 rounded-lg shadow-md md:grid-cols-2">
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col space-y-2 md:space-y-5">
            <p className="font-header font-semibold text-3xl">
              {t("contact_via_email")}
            </p>
            <Link to={"mailto:info@siiapp.net"}>
              <p className="text-blue-600 text-2xl underline cursor-pointer">
                info@siiapp.net
              </p>
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-6">
            <p
              className="cursor-pointer underline text-secondary font-header font-semibold text-2xl"
              onClick={handleShowNumber}
            >
              {t("do_you_still_need_help")}
            </p>
            {shownumber && (
              <Link to={"tel:+971545615757"}>
                <div
                  className="bg-secondary border border-navBackground rounded-md p-2 w-full md:w-1/2 cursor-pointer"
                  style={{ direction: "ltr" }}
                >
                  <p className="font-mono font-bold text-navBackground text-center text-2xl">
                    +971 54 561 5757
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-secondary shadow-lg shadow-secondary/50 w-full flex flex-col space-y-6 items-center p-6 rounded-md bg-white max-w-full"
        >
          <h3 className="font-semibold font-serif text-lg ">
            {t("submit_suggestion")}
          </h3>
          <p className="text-center text-gray-600 mb-4">
            {t("write_suggestion")}
          </p>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-32 outline-none focus:border-primary text-[15px] resize-none"
            placeholder={t("your_message")}
            required
          ></textarea>
          <button
            type="submit"
            className="font-header bg-secondary w-full md:w-auto text-navBackground hover:text-secondary py-3 px-8 rounded-md hover:bg-primary transition-colors duration-300"
          >
            {t("send_message")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoHelpPage;
