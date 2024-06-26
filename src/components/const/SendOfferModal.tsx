import React, { useState } from "react";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import baseURL from "../../constants/domain";
import PhoneInput from "react-phone-input-2";
interface SendOfferModalProps {
  isModalOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  toEmail: string;
  postCaption: string;
  cardNumber?: string | undefined;
}
const SendOfferModal = ({
  isModalOpen,
  closeModal,
  toEmail,
  postCaption,
  cardNumber,
}: SendOfferModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [mobileError, setMobileError] = useState("");
  const handlePhoneChange = (mobile: string) => {
    setFormData(prevData => ({
      ...prevData,
      mobile,
    }));
    setMobileError("");
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
      const response = await fetch(`${baseURL}/info-help/send-offer-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          toEmail: toEmail,
          name: formData.fullName,
          mobile: formData.mobile,
          message: formData.message,
          postCaption: postCaption,
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
      fullName: "",
      email: "",
      mobile: "",
      message: "",
    });
  };
  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={closeModal}
      title={t("send_message_to_get_offer")}
      size="md"
    >
      <form
        onSubmit={handleSubmit}
        className=" border-2 border-secondary shadow-lg shadow-secondary/50 w-full min-w-[340px] flex flex-col space-y-6 items-center p-6 rounded-md bg-white max-w-full"
      >
        <h3 className="font-semibold font-serif text-lg ">
          {t("send_message")}
        </h3>
        {/* <p className="text-center text-gray-600 mb-4">
          {t("write_suggestion")}
        </p> */}
        <div className="w-full justify-start flex flex-col items-start">
          <p className="text-sm mb-2">{t("card_number")}</p>
          <div
            className="w-full text-start p-2 border border-secondary rounded-lg bg-gray-50 opacity-40 cursor-not-allowed"
            style={{ direction: "ltr" }}
          >
            {cardNumber ?? ""}
          </div>
        </div>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t("fullName")}
          required
          className="w-full p-2 border border-secondary rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
        />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("email")}
          required
          className="w-full p-2 border border-secondary rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
        />
        <PhoneInput
          containerStyle={{ direction: "ltr" }}
          country={"ae"}
          value={formData.mobile}
          onChange={handlePhoneChange}
          inputProps={{ required: true, autoFocus: true }}
          placeholder={t("your_mobile_number")}
          inputStyle={{
            width: "100%",
            height: "41px",
            border: "1px solid #FFCF57",
            borderRadius: "0.375rem",
            fontSize: "15px",
            outline: "none",
            direction: "ltr",
            flex: "1",
          }}
          buttonStyle={{
            margin: 3,
            direction: "ltr",
          }}
        />
        {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-secondary rounded-md h-32 outline-none focus:border-primary text-[15px] resize-none"
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
    </Modal>
  );
};

export default SendOfferModal;
