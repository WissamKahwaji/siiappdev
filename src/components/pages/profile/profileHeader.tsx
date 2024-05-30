import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLink,
  FaLinkedin,
  FaSnapchat,
  FaTiktok,
  FaPaintBrush,
} from "react-icons/fa";
import { FaThreads, FaX } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  faAdd,
  faArrowRight,
  faBell,
  faEdit,
  faList,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import qrCode from "../../../assets/qrCode.png";
import yellowCardBack from "../../../assets/card.png";
import logo from "../../../assets/logo_sii_black.png";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import { UserModel } from "../../../apis/account/type";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../const/Modal";
import ImageDragDropField from "../../const/ImageDragDrop";
import { PostInputProps } from "../../../apis/posts/type";
import { useAddPostMutation } from "../../../apis/posts/queries";
import { Formik, FormikHelpers } from "formik";
import { useToggleFollowMutaion } from "../../../apis/account/queries";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import LoginToast from "../../const/LoginToast";
import LoginModalContent from "../../const/LoginModalContent";
import HashtagsInput from "../../const/HashtagsInput";

interface ProfileHeaderProps {
  user: UserModel;
}

const validationSchema = Yup.object().shape({
  caption: Yup.string().required("Please enter your caption"),
});

const ProfileHeader: React.FC<ProfileHeaderProps> = user => {
  const { isAuthenticated } = useAuth();
  // const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const socialMediaIcons = [
    { icon: <FaLink className="w-5 h-5 md:w-9 md:h-9" />, field: "webSite" },
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
      field: "tikTok",
    },
    {
      icon: <FaX className="w-5 h-5 md:w-9 md:h-9" />,
      field: "xPlatform",
    },
    {
      icon: <FaPaintBrush className="w-5 h-5 md:w-9 md:h-9" />,
      field: "painterest",
    },

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
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [followersCount, setFollowersCount] = useState<number>(
    user.user.followers.length ?? 0
  );

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  // const handleCoverImageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   setCoverImage(file ?? null);
  // };
  const initialValues: PostInputProps = {
    caption: "",
    link: "",
    mobileNumber: "",
    whatsAppNumber: "",
    tags: [],
    postType: fileType,
  };
  const { mutate: addPostInfo } = useAddPostMutation();
  const { mutate: toggleFollow } = useToggleFollowMutaion();

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
    values: PostInputProps,
    { setSubmitting }: FormikHelpers<PostInputProps>
  ) => {
    addPostInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
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
      <div className="flex flex-row space-x-1 md:space-x-8 md:justify-center w-full">
        <img
          src={
            user.user?.profileImage ??
            "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          }
          alt="profile"
          className="md:hidden object-contain rounded-lg border border-gray-300 shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[130px]"
        />
        <div className="hidden md:flex md:flex-col">
          <img
            src={
              user.user?.profileImage ??
              "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
            }
            alt="profile"
            className="rounded-lg object-contain  border border-gray-300 shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[100px]"
          />
          <div className="font-header mt-4 text-lg   max-w-[240px]  overflow-hidden whitespace-pre-wrap">
            <p className="text-sm  font-bold">{user?.user?.fullName}</p>
            <Link to={`/users/${user.user.userCategory}`} className="w-auto">
              <p className="text-sm font-header text-blue-500 font-bold cursor-pointer w-auto">
                {user.user.userCategory}
              </p>
            </Link>
            <p className="text-base">
              {user?.user?.bio ? user.user.bio : "write your bio in settings"}
            </p>
          </div>
          {user.user.userAbout &&
            user.user.userAbout.aboutUs &&
            user.user.userAbout.ourMission &&
            user.user.userAbout.ourVision && (
              <Link to={`/${user.user.userName}/about`}>
                <p className="underline text-secondary font-serif font-semibold text-sm my-2 cursor-pointer w-fit">
                  Read more About us
                </p>
              </Link>
            )}
        </div>
        <div className="flex flex-col w-full md:w-auto">
          {userId === user.user._id ? (
            <div className="flex flex-row  md:space-x-10 h-fit md:items-center md:justify-between items-center  justify-between ">
              <p className="text-sm ml-4 md:ml-0 font-semibold ">
                {user.user?.userName}
              </p>

              <div className="flex flex-row md:space-x-5 space-x-2">
                <Link to="/account/edit-profile">
                  <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                    <FontAwesomeIcon icon={faEdit} className="" />
                  </div>
                </Link>
                <div
                  className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faAdd} className="" />
                </div>
                <div
                  className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => setIsQrModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faQrcode} className="" />
                </div>
                <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faBell} className="" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm  font-semibold ">{user.user?.userName}</p>
              <div className="flex flex-row space-x-2 md:space-x-3">
                <div
                  className=" px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={handleToggleFollow}
                >
                  <p className="font-serif text-navBackground font-semibold text-xs md:text-sm">
                    {isFollowed ? "Following" : "Follow"}
                  </p>
                </div>
                <div
                  className=" px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                  onClick={() => {
                    setIsMoreModalOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faList} className="" />
                </div>
                <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faBell} className="" />
                </div>
              </div>
            </div>
          )}
          <div className="md:hidden justify-start items-start mt-3">
            <div className="flex flex-row justify-center mt-3 capitalize space-x-8 w-full">
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold text-sm">
                  {user.user?.posts.length}
                </p>
                <p className="text-xs">posts</p>
              </div>
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold text-sm">
                  {user.user?.followings.length}
                </p>
                <p className="text-xs">followings</p>
              </div>
              <div className="text-primary font-header flex flex-col items-center justify-center">
                <p className="font-semibold text-sm">{followersCount}</p>
                <p className="text-xs">followers</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:flex-col  group perspective-1000  items-center justify-center my-2 md:min-w-[530px]">
            <div
              className={`hidden ${
                userId === user.user._id ? "justify-center" : "md:justify-start"
              } md:w-full items-start md:flex md:mt-2`}
            >
              <div className="flex flex-row space-x-12  mb-2 capitalize">
                <div className="text-primary font-header flex flex-col items-center justify-center">
                  <p className="font-semibold">{user?.user?.posts.length}</p>
                  <p className="text-sm">posts</p>
                </div>
                <div className="text-primary font-header flex flex-col items-center justify-center">
                  <p className="font-semibold">
                    {user?.user?.followings.length}
                  </p>
                  <p className="text-sm">followings</p>
                </div>
                <div className="text-primary font-header flex flex-col items-center justify-center">
                  <p className="font-semibold">{followersCount}</p>
                  <p className="text-sm">followers</p>
                </div>
              </div>
            </div>

            {userId === user.user._id ? (
              <div className=" bg-secondary rounded-xl px-4 py-8 ">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col w-1/2">
                    <h2 className="text-navBackground font-serif text-lg font-bold flex items-center">
                      <img src={logo} alt="" className="w-7 h-7 mr-1" /> Premiem
                      Card
                    </h2>
                    <p className="text-navBackground text-base font-semibold mt-1">
                      improve your life, and get the sii card now to make your
                      life easier
                    </p>
                    <div
                      className="mt-3 text-sm flex items-center space-x-2 cursor-pointer w-fit p-2 bg-navBackground rounded-xl text-secondary font-serif font-semibold"
                      onClick={() => {
                        user.user?.siiCard
                          ? navigate("/sii-card")
                          : navigate(`/get-sii-card/${user.user?.userName}`);
                      }}
                    >
                      <p>
                        {user.user?.siiCard
                          ? "Show Details .."
                          : "Get Sii Card Now"}
                      </p>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                  <img src={yellowCardBack} alt="" className="w-36 mr-3" />
                </div>
              </div>
            ) : (
              <div className="flex flex-row space-x-8 mt-10 w-full">
                <div
                  className="w-40  px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
                  onClick={handleShareClick}
                >
                  <p className="font-serif  font-semibold text-sm">
                    Share Profile
                  </p>
                </div>
                <div
                  className="w-40 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
                  onClick={() => {
                    setIsMoreModalOpen(true);
                  }}
                >
                  <p className="font-serif font-semibold text-sm ">Message</p>
                </div>
              </div>
            )}
          </div>
        </div>
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
        {user.user.userAbout &&
          user.user.userAbout.aboutUs &&
          user.user.userAbout.ourMission &&
          user.user.userAbout.ourVision && (
            <Link to={`/${user.user.userName}/about`}>
              <p className="underline text-secondary font-serif font-semibold text-xs my-1 cursor-pointer w-fit">
                read more About us
              </p>
            </Link>
          )}
      </div>
      {userId === user.user._id && (
        <div className="md:hidden bg-secondary rounded-xl px-4 py-8 my-3">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col w-1/2">
              <h2 className="text-navBackground font-serif text-lg font-bold flex items-center">
                <img src={logo} alt="" className="w-7 h-7 mr-1" /> Premiem Card
              </h2>
              <p className="text-navBackground text-base font-semibold mt-1">
                improve your life, and get the sii card now to make your life
                easier
              </p>
              <div
                className="mt-3 text-sm flex items-center space-x-2 cursor-pointer w-fit p-2 bg-navBackground rounded-xl text-secondary font-serif font-semibold"
                onClick={() => {
                  user.user?.siiCard
                    ? navigate("/sii-card")
                    : navigate(`/get-sii-card/${user.user?.userName}`);
                }}
              >
                <p>
                  {user.user?.siiCard ? "Show Details .." : "Get Sii Card Now"}
                </p>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
            <img src={yellowCardBack} alt="" className="w-36" />
          </div>
        </div>
      )}
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
                slidesPerView: 4,
              },
              468: {
                spaceBetween: 4,
                slidesPerView: 4,
              },
              768: {
                spaceBetween: 4,
                slidesPerView: 4,
              },
              1024: {
                spaceBetween: 1,
                slidesPerView: 6,
              },
              1280: {
                spaceBetween: 1,
                slidesPerView: 6,
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
                          window.open(`https://wa.me/${socialLink}`, "_blank");
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
          title="Options"
          size="md"
        >
          <div className="flex flex-col space-y-2 font-semibold font-serif w-[300px] md:w-full">
            <p
              className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
              onClick={handleShareClick}
            >
              Share
            </p>
            <Link to={`tel:${user.user.mobileNumber}`}>
              <p className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out">
                Call
              </p>
            </Link>
            <p
              className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
              onClick={() => {
                window.open(
                  `https://wa.me/${user.user.socialMedia?.whatsApp}`,
                  "_blank"
                );
              }}
            >
              WhatsApp
            </p>
            <Link to={`mailto:${user.user.email}`}>
              <p className="w-full rounded bg-secondary py-2 cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out">
                Email
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
            setVideoFile(null);
            setCoverImage(null);
            setShowVideoPreview(false);
          }}
          title="Create Post"
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
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-around space-x-4 mb-4 bg-secondary p-4 rounded-lg shadow-md">
                    <label className="flex items-center space-x-2 cursor-pointer">
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
                      <span className="text-gray-700 font-medium">Image</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
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
                      <span className="text-gray-700 font-medium">Video</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
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
                      <span className="text-gray-700 font-medium">Doc</span>
                    </label>
                  </div>

                  {fileType === "image" && (
                    <ImageDragDropField
                      name="postImages"
                      label="Add post image"
                      oldImg=""
                    />
                  )}
                  {fileType === "video" && (
                    <div className="flex flex-col">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="postVideo"
                      >
                        Add post video
                      </label>
                      <input
                        id="postVideo"
                        name="postVideo"
                        type="file"
                        accept="video/*"
                        onBlur={handleBlur}
                        onChange={event => {
                          setFieldValue(
                            "video",
                            event.currentTarget.files![0] ?? null
                          );
                          setVideoFile(event.currentTarget.files![0] ?? null);
                          setShowVideoPreview(true);
                        }}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {showVideoPreview && videoFile && (
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 border border-secondary p-2 md:max-h-[450px]">
                          <div className="mb-4 flex-1">
                            <video
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
                                Cover Video Image
                              </label>
                              <input
                                id="coverVideoImage"
                                name="coverVideoImage"
                                type="file"
                                accept="image/*"
                                onChange={event => {
                                  const file = event.target.files?.[0];
                                  setFieldValue("coverVideoImage", file);
                                  setCoverImage(file ?? null);
                                }}
                                className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            {coverImage && (
                              <div className="mb-4">
                                <img
                                  src={URL.createObjectURL(coverImage)}
                                  alt="Cover Image"
                                  className="w-full h-full md:h-auto object-contain border border-secondary"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {fileType === "doc" && (
                    <div className="flex flex-col">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="postPDF"
                      >
                        Add post doc
                      </label>
                      <input
                        id="postPDF"
                        name="postPDF"
                        type="file"
                        accept="application/pdf"
                        onBlur={handleBlur}
                        onChange={event =>
                          setFieldValue(
                            "doc",
                            event.currentTarget.files![0] ?? null
                          )
                        }
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-x-5 gap-y-3 mx-2">
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="caption"
                      >
                        Caption
                      </label>
                      <textarea
                        id="caption"
                        name="caption"
                        minLength={1}
                        className="px-4 h-32 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.caption ?? ""}
                      />
                      {errors.caption && touched.caption && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.caption}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="link"
                      >
                        Link
                      </label>
                      <input
                        id="link"
                        name="link"
                        type="url"
                        minLength={2}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        WhatsApp Number
                      </label>
                      <input
                        id="whatsAppNumber"
                        name="whatsAppNumber"
                        type="text"
                        minLength={2}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        Mobile Number
                      </label>
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="text"
                        minLength={2}
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div className="flex flex-col items-start justify-start w-full">
                      <label
                        className="mb-2 text-sm font-medium text-gray-700"
                        htmlFor="HashTags"
                      >
                        HashTags
                      </label>
                      <HashtagsInput
                        value={values.tags ?? []}
                        onChange={newTags => setFieldValue("tags", newTags)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-navBackground text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? "Saving..." : "Save"}
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
          title="LogIn"
          size="md"
        >
          <LoginModalContent />
        </Modal>
      )}
      {isQrModalOpen && (
        <Modal
          isOpen={isQrModalOpen}
          setIsOpen={setIsQrModalOpen}
          title="Share Profile"
          size="md"
        >
          <div className="flex flex-col justify-center items-center w-full">
            <img src={qrCode} alt="" className="w-52 h-fit" />
            <button
              onClick={handleShareClick}
              className="flex items-center justify-center bg-secondary w-1/2 space-x-2 px-4 py-2 rounded-lg text-black hover:bg-black hover:text-secondary transition duration-200"
            >
              Share Profile
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileHeader;
