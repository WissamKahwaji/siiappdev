import { useGetUserByUserNameQuery } from "../../apis/account/queries";
import { useLocation, useParams } from "react-router-dom";
import ProfileHeader from "../../components/pages/profile/profileHeader";
import ProfilePosts from "../../components/pages/profile/profilePosts";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useTranslation } from "react-i18next";
import { useGetPostByIdQuery } from "../../apis/posts/queries";
import Modal from "../../components/const/Modal";
import baseURL from "../../constants/domain";
import PhoneInput from "react-phone-input-2";

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const discountType = queryParams.get("discountType");
  const postId = queryParams.get("postId");
  const { data: postInfo } = useGetPostByIdQuery(postId ?? "");

  const handleClick = () => {
    if (
      discountType &&
      discountType === "get_offer" &&
      userInfo?.socialMedia?.whatsApp
    ) {
      const phoneNumber = userInfo.socialMedia?.whatsApp;
      const whatsappLink = `https://wa.me/${phoneNumber}`;
      window.location.href = whatsappLink;
    } else {
      openModal();
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [mobileError, setMobileError] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
          toEmail: postInfo?.owner.email,
          name: formData.fullName,
          mobile: formData.mobile,
          message: formData.message,
          postCaption: postInfo?.caption,
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

  useEffect(() => {
    console.log("Fetching data for userName:", userName);
  }, [userName]);

  if (isLoadingUser) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isErrorUser) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className="container py-8 mx-auto relative">
      <main className="bg-background">
        {/* Fixed Button */}
        {discountType && (
          <div
            className="fixed md:top-[620px] top-[520px] left-0 right-0 z-50 flex justify-center"
            onClick={handleClick}
          >
            <button className="bg-secondary font-serif font-semibold text-navBackground py-2 px-10 rounded-md shadow-sm shadow-secondary">
              {t(discountType)}
            </button>
          </div>
        )}
        {userInfo && <ProfileHeader user={userInfo} />}
        {userInfo && <ProfilePosts userId={userInfo._id} />}
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
            {mobileError && (
              <p className="text-red-500 text-sm">{mobileError}</p>
            )}
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
      </main>
    </div>
  );
};

export default Profile;
