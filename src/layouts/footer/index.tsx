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
        currentPath === "/forget-password" ||
        currentPath === `/${userName}/edit-qr-code` ||
        currentPath === `/${userName}/qrcode-info` ||
        currentPath === `/privacy-policy` ||
        currentPath === `/info-help` ||
        currentPath === `/sii-card`
          ? "flex"
          : "hidden"
      } w-full bg-navBackground`}
    >
      <div className="flex flex-col w-full">
        <div className="max-w-7xl md:mx-auto p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-44 w-full">
            <div className="flex md:flex-col flex-row justify-between gap-x-8 w-full items-center">
              <img
                src={logo}
                alt="Sii Logo"
                className="w-24 h-24  object-contain"
              />
              <img
                src={sii_qr}
                alt="Sii QR"
                className="bg-secondary rounded w-24 h-24"
              />
            </div>
            <div className="mb-8 lg:mb-0">
              <h4 className="pb-3 text-xl text-secondary font-bold">
                {t("useful_links")}
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
                {t("contact_us")}
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
                    (window.location.href = `mailto:help@siiapp.net`)
                  }
                >
                  <FiMail className="mr-2 text-xl text-gray-200" />
                  <span className="text-gray-200 hover:text-secondary transition-colors">
                    help@siiapp.net
                  </span>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    (window.location.href = `mailto:support@siiapp.net`)
                  }
                >
                  <FiMail className="mr-2 text-xl text-gray-200" />
                  <span className="text-gray-200 hover:text-secondary transition-colors">
                    support@siiapp.net
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
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary p-2 flex justify-center font-body text-2xl">
          © 2024 Sii App from Sii Company
        </div>
      </div>
    </footer>
  );
};

export default Footer;
