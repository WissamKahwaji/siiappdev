/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { IoIosArrowDown } from "react-icons/io";

import { FaThreads, FaX, FaXTwitter } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  faAdd,
  faArrowLeft,
  faArrowRight,
  faCamera,
  faEdit,
  faHome,
  faList,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

import yellowCardBack from "../../../assets/card.png";
import logo from "../../../assets/logo_sii_new.png";
import { useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";

import { UserModel } from "../../../apis/account/type";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../const/Modal";

import { useAddPostMutation } from "../../../apis/posts/queries";
import { Formik, FormikHelpers } from "formik";
import {
  useGetUserAccountsQuery,
  useSwitchAccountMutation,
  useToggleFollowMutaion,
} from "../../../apis/account/queries";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import LoginToast from "../../const/LoginToast";
import LoginModalContent from "../../const/LoginModalContent";
import HashtagsInput from "../../const/HashtagsInput";
import defaultImage from "../../../assets/guest-01-01.png";
import ImageCropper from "../../const/ImageCropper";
import { useTranslation } from "react-i18next";
import SignUpModal from "./SignUpModal";
import UserAccountsModal from "./UserAccountsModal";
import LogInModalForm from "./LogInModalForm";

import ImagePopup from "../../const/ImagePopup";
import QrCodeUser from "../../const/QrCodeUser";
import { ImProfile } from "react-icons/im";
import { FolderOrPostProps } from "../../../apis/folder/type";
import { useAddFolderMutation } from "../../../apis/folder/queries";
import LoadingComponent from "../../const/LoadingComponent";
import * as htmlToImage from "html-to-image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiCarousel } from "react-icons/bi";

interface ProfileHeaderProps {
  user: UserModel;
}

const validationSchema = Yup.object().shape({
  caption: Yup.string().required("Please enter your caption"),
});

const ProfileHeader: React.FC<ProfileHeaderProps> = user => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { isAuthenticated } = useAuth();
  // const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewLoginModalOpen, setIsNewLoginModalOpen] = useState(false);
  const [isNewLoginFormModalOpen, setIsNewLoginFormModalOpen] = useState(false);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string>("");
  const [isCaptionEdited, setIsCaptionEdited] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleSaveAsImage = () => {
    if (qrCodeRef.current) {
      htmlToImage
        .toPng(qrCodeRef.current)
        .then(dataUrl => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${user.user.fullName}_QRCode.png`;

          // For Safari, try opening in a new window if direct click doesn't work
          if (
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
          ) {
            setTimeout(() => {
              window.open(dataUrl, "_blank");
            }, 1000); // Adjust the delay as needed
          } else {
            // For other browsers, append and click the link
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        })
        .catch(error => {
          console.error("Error generating image", error);
        });
    }
  };
  const [croppedImages, setCroppedImages] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagesCropComplete = (croppedFile: File, setFieldValue: any) => {
    const updatedCroppedImages = [...croppedImages];
    updatedCroppedImages[currentImageIndex] = croppedFile;
    setCroppedImages(updatedCroppedImages);
    setFieldValue("postImages", updatedCroppedImages);
    console.log(updatedCroppedImages.length);
    if (currentImageIndex < 9) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleCropComplete = (
    croppedFile: File,
    setFieldValue: any,
    fieldValue: string
  ) => {
    setCroppedImageFile(croppedFile);
    console.log(croppedImageFile?.name);
    if (!croppedFile) {
      return;
    }
    setFieldValue(fieldValue, croppedFile);
    const reader = new FileReader();
    reader.readAsDataURL(croppedFile);
    reader.onloadend = () => {
      setCroppedImageDataUrl(reader.result as string);
      // setIsCropperOpen(false);
    };
  };

  const socialMediaIcons = [
    { icon: <GiWorld className="w-5 h-5 md:w-9 md:h-9" />, field: "webSite" },
    {
      icon: <ImProfile className="w-5 h-5 md:w-9 md:h-9" />,
      field: "companyProfile",
    },

    {
      icon: <BsWhatsapp className="w-5 h-5 md:w-9 md:h-9" />,
      field: "whatsApp",
    },
    {
      icon: <FaLinkedin className="w-5 h-5 md:w-9 md:h-9" />,
      field: "linkedIn",
    },
    {
      icon: <FaInstagram className="w-5 h-5 md:w-9 md:h-9" />,
      field: "instagram",
    },
    { icon: <FaThreads className="w-5 h-5 md:w-9 md:h-9" />, field: "threads" },
    { icon: <FaX className="w-5 h-5 md:w-9 md:h-9" />, field: "x" },
    {
      icon: <FaFacebook className="w-5 h-5 md:w-9 md:h-9" />,
      field: "faceBook",
    },
    { icon: <FaYoutube className="w-5 h-5 md:w-9 md:h-9" />, field: "youtube" },

    {
      icon: <FaSnapchat className="w-5 h-5 md:w-9 md:h-9" />,
      field: "snapChat",
    },
    {
      icon: <FaTiktok className="w-5 h-5 md:w-9 md:h-9" />,
      field: "tiktok",
    },
    {
      icon: <FaXTwitter className="w-5 h-5 md:w-9 md:h-9" />,
      field: "xPlatform",
    },
    {
      icon: <FaPinterest className="w-5 h-5 md:w-9 md:h-9" />,
      field: "painterest",
    },
    { icon: <FaLink className="w-5 h-5 md:w-9 md:h-9" />, field: "otherLink" },
    { icon: <MdAdd className="w-5 h-5 md:w-9 md:h-9" />, field: "add" },
  ];
  const filterSocialMediaIcons = (user: UserModel): typeof socialMediaIcons => {
    const newSocial = socialMediaIcons.filter(
      icon =>
        user.socialMedia &&
        user.socialMedia[icon.field as keyof typeof user.socialMedia]
    );
    newSocial.push({
      icon: <MdAdd className="w-5 h-5 md:w-9 md:h-9" />,
      field: "+",
    });
    return newSocial;
  };

  const filteredIcons = filterSocialMediaIcons(user.user);
  const [fileType, setFileType] = useState("image");
  const [discountFunctionType, setDiscountFunctionType] = useState("get_offer");

  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [followersCount, setFollowersCount] = useState<number>(
    user.user.followersNumber ?? user.user.followers.length ?? 0
  );
  // const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  // const [pdfImage, setPdfImage] = useState<File | null>(null);
  const [pdfShowImage, setPdfShowImage] = useState(false);

  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleVideoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setFieldValue("video", file);
      setShowVideoPreview(true);
    }
  };
  // const handleImageUpload = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setFieldValue: any
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setCoverImage(file);
  //     setFieldValue("coverVideoImage", file);
  //   }
  // };
  const captureFrame = (time: number, setFieldValue: any) => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.onseeked = () => {
        const context = canvasRef.current!.getContext("2d");
        if (context) {
          context.drawImage(
            videoRef.current!,
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          const dataUrl = canvasRef.current!.toDataURL("image/jpeg");
          fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], "cover.jpg", {
                type: "image/jpeg",
              });
              setCoverImage(file);
              setFieldValue("coverVideoImage", file);
              // setIsCropperOpen(true);
            });
        }
      };
    }
  };

  const handleSelectCover = (setFieldValue: any) => {
    if (videoRef.current) {
      captureFrame(videoRef.current.currentTime, setFieldValue);
    }
  };
  // const handleCoverImageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   setCoverImage(file ?? null);
  // };

  const initialValues: FolderOrPostProps = {
    caption: "",
    link: "",
    mobileNumber: "",
    whatsAppNumber: "",
    tags: [],
    postType: fileType,
    discountFunctionType: "get_offer",
    otherCaptions: [],
  };
  const mainSliderRef = useRef<any>(null);
  const thumbSliderRef = useRef<any>(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    asNavFor: thumbSliderRef.current,

    ref: (slider: Slider) => (mainSliderRef.current = slider),
  };
  const captionSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: mainSliderRef.current,
    ref: (slider: Slider) => (thumbSliderRef.current = slider),
  };

  // const initialValues2: FolderInputProps = {
  //   name: "",
  //   caption: "",
  //   link: "",
  //   mobileNumber: "",
  //   whatsAppNumber: "",
  // };

  const { mutate: addPostInfo } = useAddPostMutation();
  const { mutate: addFolderInfo } = useAddFolderMutation();
  const { mutate: toggleFollow } = useToggleFollowMutaion();

  const {
    data: users,
    isLoading: isLoadingUserAccounts,
    isError: isErrorUserAccounts,
  } = useGetUserAccountsQuery();
  const { mutate: switchAccount } = useSwitchAccountMutation();

  const handleToggleFollow = () => {
    if (!isAuthenticated) {
      toast.error(
        <LoginToast
          onClose={() => {
            setIsLoginModalOpen(true);
          }}
        />,
        { toastId: "auth" }
      );
    } else {
      setIsFollowed(!isFollowed);
      setFollowersCount(prevCount =>
        isFollowed ? prevCount - 1 : prevCount + 1
      );
      toggleFollow(user.user._id);
    }
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSubmit = (
    values: FolderOrPostProps,
    { setSubmitting }: FormikHelpers<FolderOrPostProps>
  ) => {
    if (fileType === "folder") {
      addFolderInfo(values, {
        onSettled() {
          setSubmitting(false);
          setIsModalOpen(false);
        },
      });
    } else {
      addPostInfo(values, {
        onSettled() {
          setSubmitting(false);
          setCroppedImageFile(null);
          setCroppedImageDataUrl("");
          setIsModalOpen(false);
        },
      });
    }
  };
  // const handleFolderSubmit = (
  //   values: FolderInputProps,
  //   { setSubmitting }: FormikHelpers<FolderInputProps>
  // ) => {
  //   addFolderInfo(values, {
  //     onSettled() {
  //       setSubmitting(false);
  //       // setCroppedImageFile(null);
  //       // setCroppedImageDataUrl("");
  //       setIsModalOpen(false);
  //     },
  //   });
  // };
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  // const handleSwapClick = () => {
  //   setIsFlipped(!isFlipped);
  // };
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.info("copy to clipboard");
    });
  };

  useEffect(() => {
    if (user.user.followers?.includes(userId ?? "")) {
      setIsFollowed(true);
    }
  }, [user.user.followers, userId]);

  return (
    <div className="flex flex-col md:justify-center md:items-center justify-start items-start px-3 w-full">
      <div className="flex md:hidden w-full flex-col">
        {userId === user.user._id ? (
          <div className="flex flex-row w-full justify-between items-start">
            <div className="flex flex-col justify-start items-start space-y-2">
              <div
                className="flex flex-row justify-start items-center  gap-x-1"
                onClick={() => setIsAddAccountModalOpen(true)}
              >
                <p className="text-sm   font-semibold ">
                  {user.user?.userName}
                </p>
                <IoIosArrowDown className="text-secondary md:w-4 md:h-4 w-4 h-4" />
              </div>
              <div className="h-[100px] w-auto">
                <div className=" relative">
                  <ImagePopup
                    src={user.user?.profileImage ?? defaultImage}
                    alt="profile"
                    smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-auto"
                    largeClassName="h-[300px] w-[300px]"
                  />
                  {user.user._id === userId && (
                    <Link to={"/account/edit-profile"}>
                      <div className="absolute bottom-0 p-1 rounded-lg  bg-gray-200  opacity-35 right-0">
                        <FontAwesomeIcon
                          icon={faCamera}
                          width={14}
                          height={14}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row md:gap-x-4 gap-x-2 mt-6">
              {/* <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faBell} className="" />
                </div> */}
              <Link
                to={"/home"}
                className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
              >
                <div>
                  <FontAwesomeIcon icon={faHome} className="" />
                </div>
              </Link>
              <div className="relative group">
                <div
                  className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => setIsQrModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faQrcode} className="" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  QR Code
                </div>
              </div>

              <div
                className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <FontAwesomeIcon icon={faAdd} className="" />
              </div>
              <Link to="/account/edit-profile">
                <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                  <FontAwesomeIcon icon={faEdit} className="" />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-row w-full justify-between items-start">
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-sm  font-semibold ">{user.user?.userName}</p>
              <div className="h-[100px] w-auto">
                <div className=" relative">
                  <ImagePopup
                    src={user.user?.profileImage ?? defaultImage}
                    alt="profile"
                    smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-auto"
                    largeClassName="h-[300px] w-[300px]"
                  />
                  {user.user._id === userId && (
                    <Link to={"/account/edit-profile"}>
                      <div className="absolute bottom-0 p-1 rounded-lg  bg-gray-200  opacity-35 right-0">
                        <FontAwesomeIcon
                          icon={faCamera}
                          width={14}
                          height={14}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-end">
              <div className="flex flex-row gap-x-2 md:gap-x-3 mt-6">
                {/* <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faBell} className="" />
                </div> */}
                <Link
                  to={"/home"}
                  className=" px-2 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                >
                  <div>
                    <FontAwesomeIcon icon={faHome} className="" />
                  </div>
                </Link>
                <div className="relative group">
                  <div
                    className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                    onClick={() => setIsQrModalOpen(true)}
                  >
                    <FontAwesomeIcon icon={faQrcode} className="" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    QR Code
                  </div>
                </div>
                <div
                  className=" px-2 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => {
                    setIsMoreModalOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faList} className="" />
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-3 capitalize w-full">
                <div
                  className={`${
                    isFollowed ? "border-2 border-secondary bg-transparent" : ""
                  } w-28 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer  `}
                  onClick={handleToggleFollow}
                >
                  <p className="font-serif  font-semibold text-xs md:text-sm">
                    {isFollowed ? t("following") : t("follow")}
                  </p>
                </div>
                <div
                  className="w-28   px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={handleShareClick}
                >
                  <p className="font-serif  font-semibold text-xs">
                    {t("share_profile")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="flex flex-row w-full justify-between items-center">
          <div className="h-[100px] w-auto">
            <div className=" relative">
              <ImagePopup
                src={user.user?.profileImage ?? defaultImage}
                alt="profile"
                smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-auto"
                largeClassName="h-[300px] w-[300px]"
              />
              {user.user._id === userId && (
                <Link to={"/account/edit-profile"}>
                  <div className="absolute bottom-0 p-1 rounded-lg  bg-gray-200  opacity-35 right-0">
                    <FontAwesomeIcon icon={faCamera} width={14} height={14} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div> */}
      </div>
      <div className="md:hidden font-header mt-4 text-lg md:h-[135px] w-full overflow-ellipsis">
        {/* <p className="text-sm  font-semibold">wissam_98</p> */}
        <p className="md:text-2xl text-base   font-header font-semibold min-w-[270px]">
          {user.user.fullName}
        </p>
        <Link to={`/users/${user.user.userCategory}`}>
          <p className="text-xs font-header text-blue-500 font-bold cursor-pointer">
            {user.user.userCategory}
          </p>
        </Link>
        <p className="text-sm whitespace-pre-wrap ">{user.user.bio}</p>
        <div className="flex w-full justify-start items-start gap-x-5 mt-1">
          <div
            className="flex flex-row items-end gap-x-0.5 font-semibold text-sm "
            // onClick={() => {
            //   if (user.user._id === userId) {
            //     navigate("/account/followings");
            //   }
            // }}
          >
            <p className="font-semibold text-sm text-navBackground">
              {user.user.followingsNumber ?? user.user?.followings.length}
            </p>
            <p className="text-xs text-secondary">{t("follows")}</p>
          </div>
          <div
            className="flex flex-row items-end gap-x-0.5 font-semibold text-sm capitalize "
            // onClick={() => {
            //   if (user.user._id === userId) {
            //     navigate("/account/followers");
            //   }
            // }}
          >
            <p className="font-semibold text-sm text-navBackground">
              {followersCount}
            </p>
            <p className="text-xs text-secondary">{t("followers")}</p>
          </div>
          {user.user.userAbout &&
            (user.user.userAbout.aboutUs ||
              user.user.userAbout.ourMission ||
              user.user.userAbout.ourVision) && (
              <Link to={`/${user.user.userName}/about`}>
                <p className="underline text-secondary font-serif font-semibold text-xs my-1 cursor-pointer w-fit">
                  {t("read_more_About_us")}
                </p>
              </Link>
            )}
        </div>
      </div>
      {userId === user.user._id && (
        <div className="md:hidden bg-secondary rounded-xl px-4 py-8 my-3">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col w-1/2">
              <h2 className="text-navBackground font-serif text-base font-bold flex items-center">
                <img src={logo} alt="" className="w-10 h-auto mr-1" />{" "}
                {t("premium_card")}
              </h2>
              <p className="text-navBackground text-sm font-semibold mt-1">
                {t("premium_card_info")}
              </p>
              <div
                className="mt-3 text-sm flex items-center gap-x-2 cursor-pointer w-fit p-2 bg-navBackground rounded-xl text-secondary font-serif font-semibold"
                onClick={() => {
                  user.user?.siiCard
                    ? navigate("/sii-card")
                    : navigate(`/get-sii-card/${user.user?.userName}`);
                }}
              >
                <p>
                  {user.user?.siiCard
                    ? t("show_details")
                    : t("get_sii_card_now")}
                </p>
                <FontAwesomeIcon
                  icon={selectedLang === "en" ? faArrowRight : faArrowLeft}
                />
              </div>
            </div>
            <img src={yellowCardBack} alt="" className="w-36" />
          </div>
        </div>
      )}
      <div className="hidden md:flex w-full justify-center">
        <div className="hidden md:flex md:flex-col items-start justify-start">
          <div className="relative rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px]">
            <ImagePopup
              src={user.user?.profileImage ?? defaultImage}
              alt="profile"
              smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] min-h-[100px] min-w-[130px]"
              largeClassName="h-[300px] w-[300px]"
            />
            {user.user._id === userId && (
              <Link to={"/account/edit-profile"}>
                <div className="absolute bottom-0 p-1 rounded-lg bg-gray-200  opacity-60 right-0 cursor-pointer">
                  <FontAwesomeIcon icon={faCamera} width={14} height={14} />
                </div>
              </Link>
            )}
          </div>
          <div className="font-header mt-4 text-lg  min-w-[240px] max-w-[240px]  overflow-hidden whitespace-pre-wrap">
            <p className="text-sm  font-bold">{user?.user?.fullName}</p>
            {user.user.isBusiness && user.user.userCategory != "None" && (
              <Link to={`/users/${user.user.userCategory}`} className="w-auto">
                <p className="text-sm font-header text-blue-500 font-bold cursor-pointer w-auto">
                  {user.user.userCategory}
                </p>
              </Link>
            )}
            <p className="text-base">
              {user?.user?.bio ? user.user.bio : "write your bio in settings"}
            </p>
          </div>
          <div className="flex w-full justify-start items-start gap-x-5 mt-2 ">
            <div
              className="flex flex-row items-end gap-x-0.5 font-semibold text-sm text-navBackground font-serif"
              // onClick={() => {
              //   if (user.user._id === userId) {
              //     navigate("/account/followings");
              //   }
              // }}
            >
              <p className="font-semibold text-sm text-navBackground">
                {user.user.followingsNumber ?? user.user?.followings.length}
              </p>
              <p className="text-xs text-secondary">{t("follows")}</p>
            </div>
            <div
              className="flex flex-row items-end gap-x-0.5 font-semibold text-sm capitalize text-navBackground font-serif"
              // onClick={() => {
              //   if (user.user._id === userId) {
              //     navigate("/account/followers");
              //   }
              // }}
            >
              <p className=" ">{followersCount}</p>
              <p className="text-xs text-secondary">{t("followers")}</p>
            </div>
            {user.user.userAbout &&
              (user.user.userAbout.aboutUs ||
                user.user.userAbout.ourMission ||
                user.user.userAbout.ourVision) && (
                <Link to={`/${user.user.userName}/about`}>
                  <p className="underline text-secondary font-serif font-semibold text-sm  cursor-pointer w-fit">
                    {t("read_more_About_us")}
                  </p>
                </Link>
              )}
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-start items-start ">
          {userId === user.user._id ? (
            <div className="flex flex-row w-full md:gap-x-10 h-fit md:items-center md:justify-between items-center  justify-between ">
              <div
                className="flex flex-row justify-center items-center md:gap-x-2 gap-x-1  cursor-pointer"
                onClick={() => setIsAddAccountModalOpen(true)}
              >
                <p className="text-sm ml-4 md:ml-0 font-semibold ">
                  {user.user?.userName}
                </p>
                <IoIosArrowDown className="text-secondary md:w-4 md:h-4 w-4 h-4" />
              </div>

              <div className="flex flex-row md:gap-x-4 gap-x-2 ">
                {/* <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faBell} className="" />
                </div> */}
                <Link
                  to={"/home"}
                  className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                >
                  <div>
                    <FontAwesomeIcon icon={faHome} className="" />
                  </div>
                </Link>
                <div className="relative group">
                  <div
                    className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                    onClick={() => setIsQrModalOpen(true)}
                  >
                    <FontAwesomeIcon icon={faQrcode} className="" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    QR Code
                  </div>
                </div>

                <div
                  className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faAdd} className="" />
                </div>
                <Link to="/account/edit-profile">
                  <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                    <FontAwesomeIcon icon={faEdit} className="" />
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center w-full">
              <p className="text-sm  font-semibold ">{user.user?.userName}</p>
              <div className="flex flex-row gap-x-2 md:gap-x-3 ">
                {/* <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faBell} className="" />
                </div> */}
                <div className="relative group">
                  <div
                    className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                    onClick={() => setIsQrModalOpen(true)}
                  >
                    <FontAwesomeIcon icon={faQrcode} className="" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    QR Code
                  </div>
                </div>
                <div
                  className=" px-2 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => {
                    setIsMoreModalOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faList} className="" />
                </div>
              </div>
            </div>
          )}
          <div className="hidden md:flex md:flex-col  group perspective-1000  items-center justify-center my-2 md:min-w-[530px]">
            {/* <div
              className={`hidden ${
                userId === user.user._id ? "justify-center" : "md:justify-start"
              } md:w-full items-start md:flex md:mt-2`}
            >
              <div className="flex flex-row items-center justify-center w-full gap-x-12  mb-2 capitalize">
                <div className="text-primary font-header flex flex-col items-center justify-center">
                  <p className="font-semibold">{user?.user?.posts.length}</p>
                  <p className="text-sm">{t("posts")}</p>
                </div>
                <div
                  className="text-primary font-header flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (user.user._id === userId) {
                      navigate("/account/followings");
                    }
                  }}
                >
                  <p className="font-semibold">
                    {user?.user?.followings.length}
                  </p>
                  <p className="text-sm">{t("following")}</p>
                </div>
                <div
                  className="text-primary font-header flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (user.user._id === userId) {
                      navigate("/account/followers");
                    }
                  }}
                >
                  <p className="font-semibold">{followersCount}</p>
                  <p className="text-sm">{t("followers")}</p>
                </div>
              </div>
            </div> */}

            {userId === user.user._id ? (
              <div className=" bg-secondary rounded-xl px-4 py-8 ">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col w-1/2">
                    <h2 className="text-navBackground font-serif text-lg font-bold flex items-center">
                      <img src={logo} alt="" className="w-12 h-auto mr-1" />{" "}
                      {t("premium_card")}
                    </h2>
                    <p className="text-navBackground text-base font-semibold mt-1">
                      {t("premium_card_info")}
                    </p>
                    <div
                      className="mt-3 text-sm flex items-center gap-x-2 cursor-pointer w-fit p-2 bg-navBackground rounded-xl text-secondary font-serif font-semibold"
                      onClick={() => {
                        user.user?.siiCard
                          ? navigate("/sii-card")
                          : navigate(`/get-sii-card/${user.user?.userName}`);
                      }}
                    >
                      <p>
                        {user.user?.siiCard
                          ? t("show_details")
                          : t("get_sii_card_now")}
                      </p>
                      <FontAwesomeIcon
                        icon={
                          selectedLang === "en" ? faArrowRight : faArrowLeft
                        }
                      />
                    </div>
                  </div>
                  <img src={yellowCardBack} alt="" className="w-36 mr-3" />
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-x-8 mt-10 w-full">
                <div
                  className={`${
                    isFollowed ? "border-2 border-secondary bg-transparent" : ""
                  } w-40 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out`}
                  onClick={handleToggleFollow}
                >
                  <p className="font-serif  font-semibold text-xs md:text-sm capitalize">
                    {isFollowed ? t("following") : t("follow")}
                  </p>
                </div>
                <div
                  className="w-40  px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
                  onClick={handleShareClick}
                >
                  <p className="font-serif  font-semibold text-sm">
                    {t("share_profile")}
                  </p>
                </div>
                {/* <div
               className="w-40 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
               onClick={() => {
                 setIsMoreModalOpen(true);
               }}
             >
               <p className="font-serif font-semibold text-sm ">Message</p>
             </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`md:my-12 mt-3 w-full md:px-64 `}>
        {filteredIcons.length > 0 && (
          <Swiper
            spaceBetween={4}
            slidesPerView={9}
            onSlideChange={() => console.log("slide change")}
            onSwiper={swiper => console.log(swiper)}
            breakpoints={{
              0: {
                spaceBetween: 4,
                slidesPerView: 5.5,
              },
              468: {
                spaceBetween: 4,
                slidesPerView: 5.5,
              },
              768: {
                spaceBetween: 4,
                slidesPerView: 5.5,
              },
              1024: {
                spaceBetween: 1,
                slidesPerView: 6.2,
              },
              1280: {
                spaceBetween: 1,
                slidesPerView: 6.2,
              },
            }}
          >
            {filteredIcons.map((item, index) => {
              const socialLink =
                user.user.socialMedia &&
                user.user.socialMedia[
                  item.field as keyof typeof user.user.socialMedia
                ];
              if (socialLink) {
                return (
                  <SwiperSlide>
                    <div
                      key={index}
                      className="rounded-lg md:w-20 md:h-20 w-12 h-12 bg-secondary cursor-pointer  flex justify-center items-center"
                      onClick={() => {
                        if (item.field === "whatsApp") {
                          const sanitizedNumber = socialLink.replace(
                            /\s+/g,
                            ""
                          );
                          window.open(
                            `https://wa.me/${sanitizedNumber}`,
                            "_blank"
                          );
                        } else {
                          window.open(socialLink, "_blank");
                        }
                      }}
                    >
                      <div>{item.icon}</div>
                    </div>
                  </SwiperSlide>
                );
              }

              if (user.user._id === userId) {
                return (
                  <SwiperSlide>
                    <div
                      key={index}
                      className="rounded-lg md:w-20 md:h-20 w-12 h-12 bg-secondary cursor-pointer  flex justify-center items-center"
                      onClick={() => {
                        navigate("/account/edit-profile");
                      }}
                    >
                      <div>{item.icon}</div>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        )}
      </div>

      {isMoreModalOpen && (
        <Modal
          isOpen={isMoreModalOpen}
          setIsOpen={setIsMoreModalOpen}
          title={t("options")}
          size="md"
        >
          <div className="flex flex-col space-y-2 font-semibold font-serif w-[300px] md:w-full">
            <p
              className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
              onClick={handleShareClick}
            >
              {t("copy_profile")}
            </p>
            <p
              className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
              onClick={() => {
                setIsMoreModalOpen(false);
                setIsQrModalOpen(true);
              }}
            >
              {t("qr_code")}
            </p>
            <Link to={`tel:${user.user.mobileNumber}`}>
              <p className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out">
                {t("call")}
              </p>
            </Link>
            <p
              className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
              onClick={() => {
                const sanitizedNumber =
                  user.user.socialMedia?.whatsApp?.replace(/\s+/g, "");
                window.open(`https://wa.me/${sanitizedNumber}`, "_blank");
              }}
            >
              {t("whatsapp")}
            </p>
            <Link to={`mailto:${user.user.email}`}>
              <p className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out">
                {t("email")}
              </p>
            </Link>
          </div>
        </Modal>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={() => {
            setIsModalOpen(false);
            setCroppedImages([]);
            setCurrentImageIndex(0);
            setVideoFile(null);
            setCoverImage(null);
            // setPdfImage(null);
            setShowVideoPreview(false);
            setCroppedImageFile(null);
            setCroppedImageDataUrl("");
          }}
          title={t("create_post")}
          size="md"
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 max-h-[500px] overflow-y-auto no-scrollbar"
              >
                <div className="flex flex-col space-y-2 md:mx-2 mx-0">
                  <div className="flex justify-around gap-x-4 mb-4 bg-secondary p-4 rounded-lg shadow-md">
                    <label className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fileType"
                        value="image"
                        checked={fileType === "image"}
                        onChange={() => {
                          setFileType("image");
                          setFieldValue("postType", "image");
                        }}
                        className="form-radio h-4 w-4 text-blue-600 "
                      />
                      <span className="text-gray-700 font-medium">
                        {t("image")}
                      </span>
                    </label>
                    <label className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fileType"
                        value="video"
                        checked={fileType === "video"}
                        onChange={() => {
                          setFileType("video");
                          setFieldValue("postType", "video");
                        }}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700 font-medium">
                        {t("video")}
                      </span>
                    </label>
                    <label className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fileType"
                        value="doc"
                        checked={fileType === "doc"}
                        onChange={() => {
                          setFileType("doc");
                          setFieldValue("postType", "doc");
                        }}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700 font-medium">
                        {t("doc")}
                      </span>
                    </label>
                    <label className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fileType"
                        value="folder"
                        checked={fileType === "folder"}
                        onChange={() => {
                          setFileType("folder");
                        }}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700 font-medium">
                        {t("folder")}
                      </span>
                    </label>
                  </div>

                  {fileType === "image" && (
                    <div className="w-[340px] md:w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        {t("post_image")}
                      </label>
                      <div className="w-full mb-2">
                        <Slider {...settings}>
                          {croppedImages.map((image, index) => (
                            <div key={index} className="w-full">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Cropped ${index}`}
                                className="rounded-md border border-secondary shadow-sm shadow-secondary w-60 h-60 md:w-1/2 md:h-auto object-cover"
                              />
                            </div>
                          ))}
                        </Slider>
                      </div>
                      {croppedImages.length == 0 ? (
                        <>
                          <div className="w-full flex flex-row">
                            <img
                              src=""
                              alt={`Cropped`}
                              className="rounded-md border border-secondary shadow-sm shadow-secondary w-32 h-32 object-cover"
                            />
                            <ImageCropper
                              aspect={1}
                              onCropComplete={croppedFile =>
                                handleImagesCropComplete(
                                  croppedFile,
                                  setFieldValue
                                )
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {currentImageIndex < 10 && (
                            <ImageCropper
                              aspect={1}
                              onCropComplete={croppedFile =>
                                handleImagesCropComplete(
                                  croppedFile,
                                  setFieldValue
                                )
                              }
                              icon={
                                <BiCarousel className="w-10 h-10 text-secondary" />
                              }
                              titleIcon="select multi images"
                            />
                          )}
                        </>
                      )}
                    </div>
                    // <div className="w-[340px] md:w-full">
                    //   <label className="block mb-2 text-sm font-medium text-gray-700">
                    //     {t("post_image")}
                    //   </label>
                    //   <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-y-2 mb-2">
                    //     {croppedImages.map((image, index) => (
                    //       <div className=" w-full">
                    //         <img
                    //           key={index}
                    //           src={URL.createObjectURL(image)}
                    //           alt={`Cropped ${index}`}
                    //           className="rounded-md border border-secondary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    //         />
                    //       </div>
                    //     ))}
                    //   </div>
                    //   {currentImageIndex < 10 && (
                    //     <ImageCropper
                    //       aspect={1}
                    //       onCropComplete={croppedFile =>
                    //         handleImagesCropComplete(croppedFile, setFieldValue)
                    //       }
                    //     />
                    //   )}
                    // </div>
                  )}
                  {fileType === "video" && (
                    <div className="flex flex-col">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="postVideo"
                      >
                        {t("add_post_video")}
                      </label>
                      <input
                        id="postVideo"
                        name="postVideo"
                        type="file"
                        accept="video/*"
                        onBlur={handleBlur}
                        onChange={event =>
                          handleVideoUpload(event, setFieldValue)
                        }
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {showVideoPreview && videoFile && (
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 border border-secondary p-2 md:max-h-[450px]">
                          <div className="mb-4 flex-1">
                            <video
                              ref={videoRef}
                              controls
                              className="object-contain w-full md:max-h-[350px]"
                            >
                              <source
                                src={URL.createObjectURL(videoFile)}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="flex-1">
                            <div className="mb-4">
                              <label
                                htmlFor="coverVideoImage"
                                className="block font-medium mb-2"
                              >
                                {t("select_cover_image")}
                              </label>
                              <div className="flex justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSelectCover(setFieldValue)
                                  }
                                  className="bg-secondary text-navBackground text-sm transform ease-in-out duration-300 hover:text-secondary hover:bg-navBackground px-4 py-2 rounded"
                                >
                                  {t("capture_frame")}
                                </button>
                                {/* <label className="bg-secondary text-navBackground text-sm transform ease-in-out duration-300 hover:text-secondary hover:bg-navBackground px-4 py-2 rounded cursor-pointer">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={event => {
                                      const file = event.target.files![0];
                                      if (file) {
                                        setCoverImage(file);
                                        setFieldValue("coverVideoImage", file);
                                        setIsCropperOpen(true); // Open cropper when image is uploaded
                                      }
                                    }}
                                  />
                                  Upload Image
                                </label> */}
                                <div className="bg-secondary px-2 rounded-md py-1 cursor-pointer">
                                  <p>{t("upload_image")}</p>
                                  <ImageCropper
                                    onCropComplete={croppedFile => {
                                      setCoverImage(croppedFile);
                                      handleCropComplete(
                                        croppedFile,
                                        setFieldValue,
                                        "coverVideoImage"
                                      );
                                    }}
                                    aspect={9 / 16} // Aspect ratio for cover image
                                  />
                                </div>
                              </div>
                              <canvas
                                ref={canvasRef}
                                width="400"
                                height="700"
                                className="hidden"
                              />
                              {coverImage && (
                                <div className="mt-4">
                                  <img
                                    src={URL.createObjectURL(coverImage)}
                                    alt="Cover Image"
                                    className="w-full max-h-[200px] md:max-h-[200px] md:w-full object-contain border border-secondary mt-4"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {fileType === "doc" && (
                    <div className="flex flex-col">
                      <label
                        htmlFor="postPDF"
                        className="mb-2 text-sm font-medium text-gray-700"
                      >
                        {t("add_post_pdf")}
                      </label>
                      <input
                        id="postPDF"
                        name="postPDF"
                        type="file"
                        accept="application/pdf"
                        onBlur={handleBlur}
                        onChange={event => {
                          setFieldValue(
                            "doc",
                            event.currentTarget.files![0] ?? null
                          );
                          setPdfShowImage(true);
                        }}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {fileType === "doc" && pdfShowImage && (
                    <div className="flex md:flex-row flex-col justify-between items-center  ">
                      <div className="flex flex-col">
                        <label
                          htmlFor="coverPdfImage"
                          className="mb-2 text-sm font-medium text-gray-700"
                        >
                          {t("select_cover_image_for_PDF")}
                        </label>
                        <ImageCropper
                          aspect={1}
                          onCropComplete={croppedFile => {
                            handleCropComplete(
                              croppedFile,
                              setFieldValue,
                              "coverPdfImage"
                            );
                          }}
                        />
                        {/* <input
                          id="coverPdfImage"
                          name="coverPdfImage"
                          type="file"
                          accept="image/*"
                          onBlur={handleBlur}
                          onChange={event => {
                            setPdfImage(event.currentTarget.files![0]);
                            setFieldValue(
                              "coverPdfImage",
                              event.currentTarget.files![0] ?? null
                            );
                          }}
                          className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        /> */}
                      </div>
                      {croppedImageDataUrl && (
                        <div className="mt-4">
                          <img
                            src={croppedImageDataUrl}
                            alt="pdfImage"
                            className="w-80 h-56 md:h-auto object-contain border border-secondary mt-4"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {fileType === "folder" && (
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="folder_images"
                      >
                        {t("folder_images")}
                      </label>
                      <input
                        id="folderImages"
                        name="folderImages"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={event => {
                          if (event.currentTarget.files) {
                            setFieldValue(
                              "folderImages",
                              Array.from(event.currentTarget.files)
                            );
                          }
                        }}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {fileType === "folder" && (
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="folder_images"
                      >
                        {t("folder_cover_image")}
                      </label>
                      {/* <input
                        id="folderCoverImg"
                        name="folderCoverImg"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={event => {
                          if (event.currentTarget.files) {
                            setFieldValue(
                              "folderCoverImg",
                              Array.from(event.currentTarget.files)
                            );
                          }
                        }}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      /> */}
                      <div className="flex w-full justify-start items-center">
                        <ImageCropper
                          aspect={1}
                          onCropComplete={croppedFile => {
                            handleCropComplete(
                              croppedFile,
                              setFieldValue,
                              "folderCoverImg"
                            );
                          }}
                        />
                        {croppedImageDataUrl && (
                          <div className="mt-4">
                            <img
                              src={croppedImageDataUrl}
                              alt="folder_image"
                              className="w-80 h-56 md:h-auto object-contain border border-secondary mt-4"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-x-5 gap-y-3 mx-2">
                    {fileType === "folder" && (
                      <div className="flex flex-col items-start justify-start w-full">
                        <label
                          className="mb-2 text-sm font-medium text-gray-700"
                          htmlFor="name"
                        >
                          {t("folder_name")}
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          minLength={2}
                          className="px-4 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name ?? ""}
                        />
                        {errors.link && touched.link && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.link}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="w-full ">
                      <Slider {...captionSettings}>
                        <div className="flex flex-col items-start justify-start w-full px-1">
                          <label
                            className="mb-2 text-sm justify-start w-full flex font-medium text-gray-700"
                            htmlFor="caption"
                          >
                            {`${t(`caption_for_image`)} 1`}
                          </label>
                          <textarea
                            id="caption"
                            name="caption"
                            minLength={1}
                            className="px-4 h-32 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                            onBlur={handleBlur}
                            onChange={e => {
                              handleChange(e);

                              if (!isCaptionEdited) {
                                setFieldValue(
                                  "otherCaptions",
                                  Array(croppedImages.length - 1).fill(
                                    e.target.value
                                  )
                                );
                              }
                            }}
                            value={values.caption ?? ""}
                          />
                          {errors.caption && touched.caption && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.caption}
                            </div>
                          )}
                        </div>
                        {croppedImages &&
                          croppedImages.slice(1).map((_caption, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-start justify-start w-full px-1"
                            >
                              <label
                                className="mb-2 text-sm font-medium text-gray-700 justify-start w-full flex"
                                htmlFor={`otherCaptions-${index}`}
                              >
                                {`${t(`caption_for_image`)} ${index + 2}`}
                              </label>
                              <textarea
                                id={`otherCaptions-${index}`}
                                name={`otherCaptions[${index}]`}
                                minLength={1}
                                className="px-4 h-32 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                                onBlur={handleBlur}
                                onChange={e => {
                                  handleChange(e);
                                  setIsCaptionEdited(true);
                                }}
                                value={
                                  values.otherCaptions![index] ?? values.caption
                                }
                              />
                              {errors.otherCaptions &&
                                touched.otherCaptions && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {errors.otherCaptions}
                                  </div>
                                )}
                            </div>
                          ))}
                      </Slider>
                    </div>
                    {/* <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="caption"
                      >
                        {t("caption")}
                      </label>
                      <textarea
                        id="caption"
                        name="caption"
                        minLength={1}
                        className="px-4 h-32 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.caption ?? ""}
                      />
                      {errors.caption && touched.caption && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.caption}
                        </div>
                      )}
                    </div> */}
                    {/* <div className="grid grid-cols-1 gap-x-5 gap-y-3 "> */}
                    {/* {values.otherCaptions &&
                        values.otherCaptions.map((caption, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-start justify-start w-full"
                          >
                            <label
                              className="mb-2 text-sm font-medium text-gray-700"
                              htmlFor={`otherCaptions-${index}`}
                            >
                              {t(`caption for image ${index + 2}`)}
                            </label>
                            <textarea
                              id={`otherCaptions-${index}`}
                              name={`otherCaptions[${index}]`}
                              minLength={1}
                              className="px-4 h-32 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={caption}
                            />
                            {errors.otherCaptions && touched.otherCaptions && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.otherCaptions}
                              </div>
                            )}
                          </div>
                        ))} */}

                    {/* {values.otherCaptions &&
                        values.otherCaptions?.length <
                          croppedImages.length - 1 && (
                          <button
                            type="button"
                            className="bg-secondary text-navBackground font-semibold py-2 px-4 rounded-lg hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transform ease-in-out duration-300"
                            onClick={() => {
                              if (values.otherCaptions) {
                                setFieldValue("otherCaptions", [
                                  ...values.otherCaptions,
                                  "",
                                ]);
                              }
                            }}
                          >
                            {t("add_another_caption")}
                          </button>
                        )} */}
                    {/* </div> */}

                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="link"
                      >
                        {t("link")}
                      </label>
                      <input
                        id="link"
                        name="link"
                        type="url"
                        minLength={2}
                        className="px-4 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.link ?? ""}
                      />
                      {errors.link && touched.link && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.link}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="whatsAppNumber"
                      >
                        {t("whatsApp_number")}
                      </label>
                      <input
                        id="whatsAppNumber"
                        name="whatsAppNumber"
                        type="text"
                        minLength={2}
                        className="px-4 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.whatsAppNumber ?? ""}
                      />
                      {errors.whatsAppNumber && touched.whatsAppNumber && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.whatsAppNumber}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="mobileNumber"
                      >
                        {t("mobile_number")}
                      </label>
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="text"
                        minLength={2}
                        className="px-4 py-2 w-full border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.mobileNumber ?? ""}
                      />
                      {errors.mobileNumber && touched.mobileNumber && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.mobileNumber}
                        </div>
                      )}
                    </div>
                    {fileType !== "folder" && (
                      <div className="flex flex-col items-start justify-start w-full">
                        <label
                          className="mb-2 text-sm font-medium text-gray-700"
                          htmlFor="HashTags"
                        >
                          {t("hashTags")}
                        </label>
                        <HashtagsInput
                          value={values.tags ?? []}
                          onChange={newTags => setFieldValue("tags", newTags)}
                        />
                      </div>
                    )}
                    {user.user.isBusiness && fileType !== "folder" && (
                      <div className="flex flex-col items-start justify-start w-full">
                        <label
                          className="mb-1 text-sm font-medium text-gray-700"
                          htmlFor="discountPercentage"
                        >
                          {t("discount_percentage")}
                        </label>
                        <p className="text-xs mb-1 text-blue-500">
                          {t(
                            "This discount for this service will be given to all users who have a Sii card"
                          )}
                        </p>
                        <div className="w-full flex justify-start items-center gap-x-5">
                          <input
                            id="discountPercentage"
                            name="discountPercentage"
                            placeholder="Enter discount percentage"
                            type="number"
                            min={1}
                            max={99}
                            inputMode="numeric"
                            pattern="\d*"
                            className="px-4 py-2 w-1/5 md:w-1/2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                            onBlur={handleBlur}
                            onChange={e => {
                              const { value } = e.currentTarget;
                              const numericValue = parseInt(value, 10);

                              // Ensure the value is a valid two-digit number
                              if (
                                (numericValue >= 1 && numericValue <= 99) ||
                                value == ""
                              ) {
                                handleChange(e);
                              }
                            }}
                            value={values.discountPercentage ?? ""}
                          />
                          {values.discountPercentage &&
                            values.discountPercentage > 0 && (
                              <div className="flex flex-row items-center gap-x-8 ">
                                <label className="flex items-center gap-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="discountFunctionType"
                                    value="get_offer"
                                    checked={
                                      discountFunctionType === "get_offer"
                                    }
                                    onChange={() => {
                                      setDiscountFunctionType("get_offer");
                                      setFieldValue(
                                        "discountFunctionType",
                                        "get_offer"
                                      );
                                    }}
                                    className="form-radio h-4 w-4 text-seconBackground "
                                  />
                                  <span className="text-gray-700 font-medium text-xs md:text-base">
                                    {t("get_offer")}
                                  </span>
                                </label>
                                <label className="flex items-center gap-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="discountFunctionType"
                                    value="send_message"
                                    checked={
                                      discountFunctionType === "send_message"
                                    }
                                    onChange={() => {
                                      setDiscountFunctionType("send_message");
                                      setFieldValue(
                                        "discountFunctionType",
                                        "send_message"
                                      );
                                    }}
                                    className="form-radio h-4 w-4 text-seconBackground "
                                  />
                                  <span className="text-gray-700 font-medium text-xs md:text-base">
                                    {t("send_message")}
                                  </span>
                                </label>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transform ease-in-out duration-300"
                >
                  {isSubmitting ? `${t("saving")}..` : t("save")}
                </button>
              </form>
            )}
          </Formik>
        </Modal>
      )}
      {isLoginModalOpen && (
        <Modal
          isOpen={isLoginModalOpen}
          setIsOpen={handleCloseModal}
          title={t("login")}
          size="md"
        >
          <LoginModalContent />
        </Modal>
      )}
      {isQrModalOpen && (
        <Modal
          isOpen={isQrModalOpen}
          setIsOpen={setIsQrModalOpen}
          title={t("qr_code")}
          size="md"
        >
          <div className="flex flex-col justify-center items-center w-full">
            <QrCodeUser
              qrCodeUrl={user.user.qrCodeUrl}
              userName={user.user.fullName}
              qrCodeRef={qrCodeRef}
            />

            <div className="flex flex-row items-center w-full justify-center gap-x-2 md:gap-x-3">
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `https://www.siiapp.net/${user.user.userName}/qrcode-info`
                    )
                    .then(() => {
                      toast.info("copy to clipboard");
                    });
                }}
                className="flex items-center justify-center bg-secondary w-40 gap-x-2 px-4 py-2 rounded-lg text-black hover:bg-black hover:text-secondary transition duration-200 "
              >
                {t("share_qrcode")}
              </button>
              <button
                onClick={() => {
                  navigate(`/${user.user.userName}/qrcode-info`);
                }}
                className="flex items-center justify-center bg-secondary w-40 gap-x-2 px-4 py-2 rounded-lg text-black hover:bg-black hover:text-secondary transition duration-200"
              >
                {t("view_qrcode")}
              </button>
            </div>
            <p
              className="underline text-blue-500 text-sm mt-4 cursor-pointer"
              onClick={handleSaveAsImage}
            >
              {t("click_here_to_download_the_Qr_Code")}
            </p>
          </div>
        </Modal>
      )}
      {isAddAccountModalOpen && (
        <Modal
          isOpen={isAddAccountModalOpen}
          setIsOpen={setIsAddAccountModalOpen}
          title={t("your_accounts")}
          size="md"
        >
          <div className="flex flex-col justify-start items-center w-full min-w-[300px] gap-y-4 min-h-[400px]">
            <div className="flex flex-col flex-1 justify-start items-center w-full min-w-[300px] ">
              {isLoadingUserAccounts && (
                <div className="flex justify-center items-center min-h-[50px]  bg-gray-100">
                  <LoadingComponent />
                </div>
              )}
              {isErrorUserAccounts && <div>Error occurred</div>}
              {users &&
                users.length > 0 &&
                users.map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-start md:gap-x-3 gap-x-2 w-full md:w-1/2 bg-navBackground/90  shadow-lg py-2 px-3 rounded-lg cursor-pointer"
                    onClick={() => {
                      switchAccount({ email: user.email });
                    }}
                  >
                    <img
                      src={user.profileImage ?? defaultImage}
                      alt="profile"
                      className=" object-cover rounded-md border-2 border-gray-200 shadow-md shadow-secondary/50 md:h-[40px] md:w-[40px] h-[40px] w-[40px]"
                    />
                    <p className="text-navBackground text-sm font-header text-white">
                      {user.fullName}
                    </p>
                  </div>
                ))}
            </div>
            <div
              className="w-full text-sm md:text-base md:w-1/2 bg-secondary text-navBackground font-serif px-3 py-2 rounded-lg shadow-md cursor-pointer"
              onClick={() => {
                setIsAddAccountModalOpen(false);

                setIsNewLoginFormModalOpen(true);
              }}
            >
              {t("log_in_to_onther_account")}
            </div>
            <div
              className="w-full text-sm md:text-base md:w-1/2 bg-navBackground text-secondary font-serif px-3 py-2 rounded-lg shadow-md cursor-pointer"
              onClick={() => {
                setIsAddAccountModalOpen(false);
                setIsNewAccountModalOpen(true);
              }}
            >
              {t("create_new_account")}
            </div>
          </div>
        </Modal>
      )}
      {isNewAccountModalOpen && (
        <Modal
          isOpen={isNewAccountModalOpen}
          setIsOpen={setIsNewAccountModalOpen}
          title={t("signup")}
          size="md"
        >
          <SignUpModal
            onClose={() => {
              setIsNewAccountModalOpen(false);
            }}
          />
        </Modal>
      )}
      {isNewLoginModalOpen && (
        <Modal
          isOpen={isNewLoginModalOpen}
          setIsOpen={setIsNewLoginModalOpen}
          title={t("your_accounts")}
          size="md"
        >
          <UserAccountsModal
            onClose={() => {
              setIsNewLoginModalOpen(false);
              setIsNewLoginFormModalOpen(true);
            }}
          />
        </Modal>
      )}
      {isNewLoginFormModalOpen && (
        <Modal
          isOpen={isNewLoginFormModalOpen}
          setIsOpen={setIsNewLoginFormModalOpen}
          title={t("switch_account")}
          size="md"
        >
          <LogInModalForm />
        </Modal>
      )}
    </div>
  );
};

export default ProfileHeader;
