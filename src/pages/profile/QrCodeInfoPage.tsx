import { Link, useParams } from "react-router-dom";
import { useGetUserByUserNameQuery } from "../../apis/account/queries";
import { useEffect } from "react";

import ImagePopup from "../../components/const/ImagePopup";
import defaultImage from "../../assets/guest-01-01.png";
import { BsWhatsapp } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLink,
  FaLinkedin,
  FaSnapchat,
  FaTiktok,
  FaPinterest,
} from "react-icons/fa";
import { FaMapLocationDot, FaThreads, FaXTwitter } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { UserModel } from "../../apis/account/type";
import { ImProfile } from "react-icons/im";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../components/const/LoadingComponent";

const QrCodeInfoPage = () => {
  const { userName } = useParams<{ userName: string }>();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");

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

  const socialMediaIcons = [
    {
      icon: <GiWorld className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "webSite",
      text: "website",
    },
    {
      icon: <ImProfile className="w-5 h-5 md:w-9 md:h-9" />,
      field: "companyProfile",
      text: "company_profile_and_others",
    },
    {
      icon: <BsWhatsapp className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "whatsApp",
      text: "whatsApp",
    },
    {
      icon: <FaLinkedin className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "linkedIn",
      text: "linkedIn",
    },
    {
      icon: <FaInstagram className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "instagram",
      text: "instagram",
    },
    {
      icon: <FaThreads className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "threads",
      text: "threads",
    },

    {
      icon: <FaFacebook className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "faceBook",
      text: "faceBook",
    },
    {
      icon: <FaYoutube className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "youtube",
      text: "youtube",
    },
    {
      icon: <FaSnapchat className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "snapChat",
      text: "snapChat",
    },
    {
      icon: <FaTiktok className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "tiktok",
      text: "tiktok",
    },
    {
      icon: <FaXTwitter className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "xPlatform",
      text: "xPlatform",
    },
    {
      icon: <FaPinterest className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "painterest",
      text: "painterest",
    },
    {
      icon: <FaLink className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "otherLink",
      text: "otherLink",
    },
    {
      icon: <MdAdd className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "add",
    },
  ];

  const filterSocialMediaIcons = (user: UserModel): typeof socialMediaIcons => {
    const newSocial = socialMediaIcons.filter(
      icon =>
        user.socialMedia &&
        user.socialMedia[icon.field as keyof typeof user.socialMedia]
    );
    newSocial.push({
      icon: <MdAdd className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9" />,
      field: "+",
    });
    return newSocial;
  };

  const filteredIcons = filterSocialMediaIcons(userInfo!);

  return (
    <div className="flex items-center justify-center my-10 h-full w-full font-header">
      <div className="bg-navBackground p-8 rounded-lg shadow-md md:max-w-3xl max-w-sm w-full flex flex-col justify-start items-center space-y-7">
        <div className="flex justify-center items-center w-full flex-col space-y-4">
          <ImagePopup
            src={userInfo?.profileImage ?? defaultImage}
            alt="profile"
            smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[100px] lg:h-[200px] lg:w-[200px]"
            largeClassName="h-[300px] w-[300px]"
          />
          <Link to={`/${userInfo?.userName}`} replace>
            <p className="bg-secondary rounded-lg px-3 py-2 text-navBackground text-sm shadow-sm shadow-gray-200 hover:text-secondary hover:bg-navBackground/40 transform ease-in-out duration-300">
              Show Profile
            </p>
          </Link>
        </div>
        <div className="w-full md:px-5 lg:px-10 flex flex-col items-start justify-start space-y-5">
          {filteredIcons.length > 0 &&
            filteredIcons.map((item, index) => {
              const socialLink =
                userInfo?.socialMedia &&
                userInfo?.socialMedia[
                  item.field as keyof typeof userInfo.socialMedia
                ];
              if (socialLink) {
                return (
                  <div
                    key={index}
                    className="py-3 px-4 w-full bg-secondary rounded-lg text-navBackground flex items-center justify-start gap-x-4 cursor-pointer transition-transform transform hover:scale-105 ease-in-out duration-300"
                    onClick={() => {
                      if (item.field === "whatsApp") {
                        window.open(`https://wa.me/${socialLink}`, "_blank");
                      } else {
                        window.open(socialLink, "_blank");
                      }
                    }}
                  >
                    <div>{item.icon}</div>
                    <div className="flex flex-col items-start justify-start break-words w-full">
                      <p className="font-body text-base md:text-2xl font-bold capitalize">
                        {t(item.text ?? "")}
                      </p>
                      <p className="font-serif font-semibold text-xs md:text-sm text-gray-700 cursor-copy break-all">
                        {socialLink}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          {userInfo?.location && (
            <div className="py-3 px-4 w-full bg-secondary rounded-lg text-navBackground flex items-center justify-start gap-x-4  transition-transform transform hover:scale-105 ease-in-out duration-300">
              <div>
                <FaMapLocationDot className="w-5 h-5 md:w-9 md:h-9" />
              </div>
              <div className="flex flex-col items-start justify-start break-words w-full">
                <p className="font-body text-base md:text-2xl font-bold capitalize">
                  {t("location")}
                </p>
                <p className="font-serif font-semibold text-xs md:text-sm text-gray-700 cursor-copy break-all">
                  {userInfo?.location}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrCodeInfoPage;
