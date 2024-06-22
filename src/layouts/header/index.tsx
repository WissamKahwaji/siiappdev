import { useEffect, useState } from "react";
import {
  AiOutlineCloseSquare,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineDown,
} from "react-icons/ai";
import logo_video from "../../assets/video_logo_black.mp4";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetUserSearchQuery } from "../../apis/account/queries";
import LanguageButton from "../../components/const/LanguageButton";
import { useTranslation } from "react-i18next";
import { IoMdPersonAdd } from "react-icons/io";
import logo from "../../assets/guest-01-01.png";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const userName = localStorage.getItem("userName");
  const profileImage = localStorage.getItem("profileImage");

  const navItems = [
    { title: "home", path: "/home" },
    { title: "account", path: `/${userName}` },
    {
      title: "info&help",
      path: "#",
      subNav: [
        { title: "info_help", path: "/info-help" },
        { title: "privacy_policy", path: "/privacy-policy" },
      ],
    },
  ];

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
    if (!showDrawer) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
  };

  const { data: suggestions, refetch } = useGetUserSearchQuery(searchQuery);

  useEffect(() => {
    const video = document.getElementById("logoVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.log("Auto-play was prevented, trying to play manually", error);
      });
    }
    if (searchQuery.length > 2 && searchQuery !== "") {
      refetch();
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, refetch]);

  return (
    <header className="fixed left-0 top-0 z-[1001] w-full bg-navBackground border-b border-border shadow-sm">
      <nav className="flex flex-row md:items-center justify-around md:px-32 px-5 w-full py-2">
        <div className="flex items-center justify-between w-full lg:w-auto md:w-auto lg:justify-start gap-x-8 md:gap-x-0 md:justify-center">
          <div className="text-2xl md:text-4xl font-bold text-primary flex items-center">
            <Link to="/home">
              <video
                id="logoVideo"
                autoPlay
                playsInline
                muted
                className="h-auto w-16 sm:h-auto sm:w-24 md:h-auto md:w-24 lg:h-auto lg:w-20 object-cover"
              >
                <source src={logo_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center w-1/2 h-10 justify-center bg-white rounded-lg p-2 relative">
          <div className="flex w-full">
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border-none outline-none font-body text-lg flex-grow"
            />
            <button
              onClick={handleSearch}
              className="bg-secondary text-white px-4 py-2 rounded-lg"
            >
              <AiOutlineSearch className="text-navBackground" />
            </button>
          </div>
          {showSuggestions && suggestions && (
            <div className="absolute top-full left-0 w-full max-h-[300px] overflow-y-scroll font-body bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
              {suggestions.users.map((user, index) => (
                <Link key={index} to={`/${user.userName}`} reloadDocument>
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    <img
                      src={user.profileImage}
                      alt=""
                      className="w-8 h-auto rounded-lg border-2 border-secondary shadow-md shadow-secondary/50"
                    />
                    <p> {user.fullName}</p>
                  </div>
                </Link>
              ))}
              {suggestions.posts.map((post, index) => (
                <Link
                  key={index}
                  to={`/${post.owner.userName}/${post._id}`}
                  reloadDocument
                >
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer line-clamp-2"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                    }}
                  >
                    {post.caption}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="hidden text-white md:flex md:flex-row md:gap-x-10 justify-between items-center font-header capitalize">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onClick={() =>
                item.subNav && setDropdownVisible(!dropdownVisible)
              }
            >
              <div className="flex items-center cursor-pointer">
                {item.subNav ? (
                  <div
                    className={`${
                      item.path === currentPath
                        ? "text-secondary"
                        : "text-white"
                    }`}
                  >
                    {t(item.title)}
                  </div>
                ) : (
                  <Link
                    className={`${
                      item.path === currentPath
                        ? "text-secondary"
                        : "text-white"
                    }`}
                    to={
                      isAuthenticated
                        ? item.path
                        : item.title == "account"
                        ? "/login"
                        : item.path
                    }
                    reloadDocument
                  >
                    {t(item.title)}
                  </Link>
                )}
                {item.subNav && <AiOutlineDown className="mx-2" />}
              </div>
              {item.subNav && dropdownVisible && (
                <div className="absolute left-0 mt-4 w-48 bg-secondary shadow-lg rounded-lg z-20">
                  {item.subNav.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      reloadDocument
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {t(subItem.title)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isAuthenticated ? (
            <p
              className="cursor-pointer"
              onClick={() => {
                window.localStorage.removeItem("userName");
                window.localStorage.removeItem("userId");
                window.localStorage.removeItem("token");

                window.location.href = "/login";
              }}
            >
              {t("signout")}
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              {t("login")}
            </p>
          )}
          <LanguageButton className="relative flex flex-col items-center rounded-lg" />
        </div>
        <div className="md:hidden flex flex-row items-center gap-x-4">
          {!isAuthenticated ? (
            <div className="md:hidden text-secondary hover:text-white transition duration-300 text-2xl focus:outline-none">
              <IoMdPersonAdd
                className="cursor-pointer text-secondary"
                onClick={() => {
                  window.location.href = "/login";
                }}
              />
            </div>
          ) : (
            <img
              src={profileImage ?? logo}
              alt=""
              className="md:hidden w-6 h-6 rounded-lg border-2 border-secondary shadow-md shadow-secondary/50"
              onClick={() => {
                window.location.href = `/${userName}`;
              }}
            />
          )}
          <button
            onClick={toggleDrawer}
            className="md:hidden text-secondary hover:text-white transition duration-300 text-2xl focus:outline-none"
          >
            <AiOutlineMenu />
          </button>
        </div>
        {showDrawer && (
          <div className="md:hidden fixed inset-0 bg-transparent bg-opacity-90 flex flex-row w-full backdrop-filter backdrop-blur-sm z-[1002]">
            <div className="bg-navBackground bg-opacity-80 z-[1003] transition duration-300 transform translate-x-0 w-[75%]">
              <div className="flex flex-col items-start mx-2 space-y-4 py-8">
                <video
                  autoPlay
                  muted
                  playsInline
                  className="h-auto w-16 sm:h-auto sm:w-24 md:h-auto md:w-24 lg:h-auto lg:w-20 object-cover mb-4"
                >
                  <source src={logo_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <LanguageButton
                  className="relative flex flex-col items-center rounded-lg w-full"
                  title={`${t("change_language")}`}
                />
                {navItems.map((item, index) => (
                  <div key={index} className="w-full">
                    <div
                      className={`font-header hover:text-hoverColor transition duration-300 text-base border-b-2 w-full border-b-secondary/20 capitalize text-navBackground bg-secondary px-2 py-1 rounded-lg shadow-sm shadow-secondary ${
                        item.subNav ? "flex justify-between items-center" : ""
                      }`}
                      onClick={() =>
                        item.subNav && setDropdownVisible(!dropdownVisible)
                      }
                    >
                      {item.subNav ? (
                        <div>{t(item.title)}</div>
                      ) : (
                        <Link
                          to={
                            isAuthenticated
                              ? item.path
                              : item.title == "account"
                              ? "/login"
                              : item.path
                          }
                          reloadDocument
                        >
                          {t(item.title)}
                        </Link>
                      )}
                      {item.subNav && <AiOutlineDown />}
                    </div>
                    {item.subNav && dropdownVisible && (
                      <div className="ml-4 mt-2 bg-secondary rounded-lg">
                        {item.subNav.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            reloadDocument
                            className="block px-4 py-2 text-navBackground "
                          >
                            {t(subItem.title)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isAuthenticated ? (
                  <div
                    className="cursor-pointer text-secondary border-2 border-secondary w-full px-2 py-2 rounded-lg"
                    onClick={() => {
                      window.localStorage.removeItem("userName");
                      window.localStorage.removeItem("userId");
                      window.localStorage.removeItem("token");
                      window.localStorage.removeItem("profileImage");
                      window.location.href = "/login";
                    }}
                  >
                    <p>{t("signout")}</p>
                  </div>
                ) : (
                  <p
                    className="cursor-pointer text-white"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    {t("login")}
                  </p>
                )}
              </div>
            </div>
            <div className="h-[60px] w-[15%] bg-transparent flex justify-center items-center mx-3 mt-3">
              <button
                onClick={toggleDrawer}
                className="text-white text-lg focus:outline-none"
              >
                <AiOutlineCloseSquare className="text-6xl text-secondary" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
