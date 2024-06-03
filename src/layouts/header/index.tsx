import { useEffect } from "react";
import {
  AiOutlineCloseSquare,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import logo_video from "../../assets/video_logo_black.mp4";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGetUserSearchQuery } from "../../apis/account/queries";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const userName = localStorage.getItem("userName");
  const navItems = [
    { title: "Home", path: "/" },
    { title: "Account", path: `/${userName}` },
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
        <div className="flex items-center justify-between w-full lg:w-auto md:w-auto lg:justify-start gap-x-8 md:space-x-0 md:justify-center">
          <div className="text-2xl md:text-4xl font-bold text-primary flex items-center">
            <Link to="/">
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
        <div className="hidden md:flex flex-col items-center w-1/3 bg-white rounded p-2 relative">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search"
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
            <div className="absolute top-full left-0 w-full font-body bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
              {suggestions.users.map((user, index) => (
                <Link key={index} to={`/${user.userName}`} reloadDocument>
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    {user.fullName}
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
        <div className="hidden text-white md:flex md:flex-row md:space-x-10 justify-between items-center font-header capitalize">
          {navItems.map((item, index) => (
            <Link
              className={`${
                item.path === currentPath ? "text-secondary" : "text-white"
              }`}
              key={index}
              to={isAuthenticated ? item.path : "/login"}
              reloadDocument
            >
              {item.title}
            </Link>
          ))}
          {isAuthenticated && (
            <p
              className="cursor-pointer"
              onClick={() => {
                window.localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Sign out
            </p>
          )}
        </div>
        <button
          onClick={toggleDrawer}
          className="md:hidden text-secondary hover:text-white transition duration-300 text-2xl focus:outline-none"
        >
          <AiOutlineMenu />
        </button>
        {showDrawer && (
          <div className="md:hidden fixed inset-0 bg-transparent bg-opacity-90 flex flex-row w-full backdrop-filter backdrop-blur-sm z-[1002]">
            <div className="bg-primary bg-opacity-80 z-[1003] transition duration-300 transform translate-x-0 w-[75%]">
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
                <div className="flex items-center font-body w-full bg-white rounded p-2">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="border-none outline-none flex-grow"
                  />
                </div>
                {showSuggestions && suggestions && (
                  <div className="absolute top-[138px] font-body w-3/4 overflow-y-scroll max-h-[430px] bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
                    {suggestions.users.map((user, index) => (
                      <Link key={index} to={`/${user.userName}`} reloadDocument>
                        <div
                          className="p-2 hover:bg-gray-200 cursor-pointer border border-b-secondary"
                          onClick={() => {
                            setSearchQuery(user.fullName);
                            setShowSuggestions(false);
                          }}
                        >
                          {user.fullName}
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
                          className="p-2 hover:bg-gray-200 cursor-pointer line-clamp-2 border border-b-secondary"
                          onClick={() => {
                            setSearchQuery(post.caption);
                            setShowSuggestions(false);
                          }}
                        >
                          {post.caption}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    className="text-white hover:text-hoverColor transition duration-300 text-lg border-b-2 w-full border-b-secondary/20"
                  >
                    {item.title}
                  </a>
                ))}
                {isAuthenticated && (
                  <p
                    className="cursor-pointer text-white"
                    onClick={() => {
                      window.localStorage.clear();
                      window.location.href = "/login";
                    }}
                  >
                    Sign out
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
