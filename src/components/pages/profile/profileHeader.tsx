import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLink,
  FaLinkedin,
  FaSnapchat,
} from "react-icons/fa";
import { FaThreads, FaX } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  faAdd,
  faArrowRight,
  faEdit,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

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

interface ProfileHeaderProps {
  user: UserModel;
}

const validationSchema = Yup.object().shape({
  caption: Yup.string().required("Please enter your caption"),
});

const ProfileHeader: React.FC<ProfileHeaderProps> = user => {
  // const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socialMediaIcons = [
    { icon: <FaLink className="w-5 h-5 md:w-9 md:h-9" />, field: "webSite" },
    {
      icon: <FaFacebook className="w-5 h-5 md:w-9 md:h-9" />,
      field: "faceBook",
    },
    {
      icon: <FaInstagram className="w-5 h-5 md:w-9 md:h-9" />,
      field: "instagram",
    },
    {
      icon: <BsWhatsapp className="w-5 h-5 md:w-9 md:h-9" />,
      field: "whatsApp",
    },
    { icon: <FaYoutube className="w-5 h-5 md:w-9 md:h-9" />, field: "youtube" },
    { icon: <FaThreads className="w-5 h-5 md:w-9 md:h-9" />, field: "threads" },
    { icon: <FaX className="w-5 h-5 md:w-9 md:h-9" />, field: "x" },
    {
      icon: <FaLinkedin className="w-5 h-5 md:w-9 md:h-9" />,
      field: "linkedIn",
    },
    {
      icon: <FaSnapchat className="w-5 h-5 md:w-9 md:h-9" />,
      field: "snapChat",
    },
    { icon: <MdAdd className="w-5 h-5 md:w-9 md:h-9" />, field: "add" },
  ];
  const filterSocialMediaIcons = (user: UserModel): typeof socialMediaIcons => {
    return socialMediaIcons.filter(
      icon =>
        user.socialMedia &&
        user.socialMedia[icon.field as keyof typeof user.socialMedia]
    );
  };

  const filteredIcons = filterSocialMediaIcons(user.user);
  const [fileType, setFileType] = useState("image");
  const [isFollowed, setIsFollowed] = useState(false);

  const [followersCount, setFollowersCount] = useState<number>(
    user.user.followers.length ?? 0
  );

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
    setIsFollowed(!isFollowed);
    setFollowersCount(prevCount =>
      isFollowed ? prevCount - 1 : prevCount + 1
    );
    toggleFollow(user.user._id);
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
          className="md:hidden rounded-lg border border-gray-300 shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[100px]"
        />
        <div className="hidden md:flex md:flex-col">
          <img
            src={
              user.user?.profileImage ??
              "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
            }
            alt="profile"
            className="rounded-lg border border-gray-300 shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[100px]"
          />
          <div className="font-header mt-4 text-lg md:max-h-[112px] w-[240px] overflow-hidden whitespace-pre-wrap">
            <p className="text-sm  font-bold">{user?.user?.fullName}</p>
            <p className="text-base">
              {user?.user?.bio ? user.user.bio : "write your bio in settings"}
            </p>
          </div>
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
                <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
                  <FontAwesomeIcon icon={faQrcode} className="" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm  font-semibold ">{user.user?.userName}</p>
              <div
                className=" px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
                onClick={handleToggleFollow}
              >
                <p className="font-serif text-navBackground font-semibold text-sm">
                  {isFollowed ? "Following" : "Follow"}
                </p>
              </div>
            </div>
          )}
          <div className="md:hidden justify-start items-start mt-3">
            <div className="flex flex-row justify-around mt-3 capitalize space-x-6 w-full">
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

            {userId === user.user._id && (
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
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden font-header mt-4 text-lg md:h-[135px] w-[140px] overflow-ellipsis">
        {/* <p className="text-sm  font-semibold">wissam_98</p> */}
        <p className="md:text-2xl text-lg   font-header font-semibold min-w-[270px]">
          sii advertising & media company
        </p>
        <p className="text-sm font-header text-secondary font-bold">
          Media Agency
        </p>
        <p className="text-base">
          this is bio <br />
          Software Engineer <br />
          Master Web Science
        </p>
      </div>
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
              return null;
            })}
          </Swiper>
        )}
      </div>

      {/* <div className="md:my-12 mt-3 w-full md:px-64 ">
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
          {filteredIcons.map((item, index) => (
            <SwiperSlide>
              <div
                key={index}
                className="rounded-lg md:w-20 md:h-20 w-12 h-12 bg-secondary cursor-pointer  flex justify-center items-center"
              >
                <div>{item.icon}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-start space-x-4 mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fileType"
                        value="image"
                        checked={fileType === "image"}
                        onChange={() => {
                          setFileType("image");
                          setFieldValue("postType", "image");
                        }}
                      />
                      <span className="ml-2">Image</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fileType"
                        value="video"
                        checked={fileType === "video"}
                        onChange={() => {
                          setFileType("video");
                          setFieldValue("postType", "video");
                        }}
                      />
                      <span className="ml-2">Video</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fileType"
                        value="doc"
                        checked={fileType === "doc"}
                        onChange={() => {
                          setFileType("doc");
                          setFieldValue("postType", "doc");
                        }}
                      />
                      <span className="ml-2">doc</span>
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
                        onChange={event =>
                          setFieldValue(
                            "video",
                            event.currentTarget.files![0] ?? null
                          )
                        }
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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

                  <div className="grid grid-cols-2 gap-x-5 gap-y-3">
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
                        className="px-4 h-10 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
};

export default ProfileHeader;
