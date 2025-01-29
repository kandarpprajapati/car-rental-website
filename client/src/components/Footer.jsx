import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaGoogle,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetProductsByCategory } from "../hooks/products/useGetProductByCategory";
import useAuthStore from "../store/authStore";

const Footer = () => {
  const { mutateAsync } = useGetProductsByCategory();
  const { t, i18n } = useTranslation("translation", { keyPrefix: "nav" });
  const { isAuthenticated, title, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      await mutateAsync(category); // Pass the category to the API call
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <footer className="bg-secondary-foreground text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold tracking-wider">
              FAITHLINE ENTERPRISE
            </h2>
          </div>

          {/* Navigation Links (same as Navbar but without social media icons) */}
          <div className="flex justify-between w-full md:w-auto md:gap-12 first-letter:capitalize">
            <div>
              <NavLink to="/" className="text-lg font-semibold mb-4">
                {t("home")}
              </NavLink>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("menu.name")}</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/services"
                    className="text-primary-foreground hover:underline"
                  >
                    &gt; {t("menu.orders")}
                  </NavLink>
                </li>
                <li>
                  <p className="text-primary-foreground">
                    &gt; {t("menu.contactDetails.name")}
                  </p>
                  <p className="text-sm">
                    {t("menu.contactDetails.phone")}:
                    <a
                      href="tel:+1234567890"
                      className="text-foreground ml-1 hover:underline"
                    >
                      +1 234 567 890
                    </a>
                  </p>
                  <p className="text-sm">
                    {t("menu.contactDetails.email")}:
                    <a
                      href="mailto:info@example.com"
                      className="text-foreground ml-1 hover:underline"
                    >
                      info@example.com
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-900 mt-8 pt-4 flex justify-between items-center flex-wrap">
          {/* Login/Logout */}
          <button onClick={handleAction} className="font-semibold">
            {isAuthenticated
              ? t("logout", { ns: "translation" }).toUpperCase()
              : t("login", { ns: "translation" }).toUpperCase()}
          </button>

          {/* Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiInstagramFill className="text-2xl cursor-pointer hover:text-pink-800" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-2xl cursor-pointer hover:text-blue-600" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-2xl cursor-pointer hover:text-black" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
            </a>
            <a
              href="https://www.youtube.com/shorts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiYoutubeshorts className="text-2xl cursor-pointer hover:text-red-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-400" />
            </a>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle className="text-2xl cursor-pointer hover:text-orange-800" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
              <RiWhatsappFill className="text-2xl cursor-pointer hover:text-green-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
