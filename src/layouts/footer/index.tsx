import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo_sii_new_2.png";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { FiMail, FiPhone } from "react-icons/fi";
import sii_qr from "../../assets/Sii_qr_black.png";

const Footer = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const userName = localStorage.getItem("userName");
  const navItems = [
    { title: "home", path: "/home" },
    { title: "account", path: `/${userName}` },
    { title: "info_help", path: `/info-help` },
    { title: "privacy_policy", path: `/privacy-policy` },
  ];

  return (
    <footer
      className={`${
        currentPath === "/home" || currentPath === `/${userName}`
          ? "hidden"
          : "flex"
      } w-full bg-navBackground`}
    >
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-20 md:gap-2">
          <img
            src={logo}
            alt=""
            className="w-auto lg:w-auto mb-4 object-cover"
          />
          <div className="mb-8 lg:mb-0">
            <h4 className="pb-3 text-xl text-secondary font-bold">
              Useful Links
            </h4>
            <ul>
              {navItems.map(navItem => (
                <li key={navItem.title} className="pb-3">
                  <Link
                    to={
                      isAuthenticated
                        ? navItem.path
                        : navItem.title === "account"
                        ? "/login"
                        : navItem.path
                    }
                    className="text-white hover:text-secondary transition-colors"
                  >
                    {t(navItem.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <h4 className="pb-3 text-xl text-secondary font-bold">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>
                  (window.location.href = `mailto:info@siimedia.net`)
                }
              >
                <FiMail className="mr-2 text-xl text-gray-200" />
                <span className="text-gray-200 hover:text-secondary transition-colors">
                  info@siiapp.net
                </span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>
                  (window.location.href = `mailto:help@siimedia.net`)
                }
              >
                <FiMail className="mr-2 text-xl text-gray-200" />
                <span className="text-gray-200 hover:text-secondary transition-colors">
                  help@siimedia.net
                </span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => (window.location.href = `tel:+971545615757`)}
              >
                <FiPhone className="mr-2 text-xl text-gray-200" />
                <span className="text-gray-200 hover:text-secondary transition-colors">
                  +971 54 561 5757
                </span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => (window.location.href = `tel:+971542998757`)}
              >
                <FiPhone className="mr-2 text-xl text-gray-200" />
                <span className="text-gray-200 hover:text-secondary transition-colors">
                  +971 54 299 8757
                </span>
              </div>
            </div>
          </div>
          <img src={sii_qr} alt="" className="bg-secondary rounded" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
