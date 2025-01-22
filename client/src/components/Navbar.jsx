import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaGoogle,
  FaInstagramSquare,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useGetProductsByCategory } from "../hooks/products/useGetProductByCategory";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "nav" });
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // For category dropdown
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // For category dropdown
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, title, logout } = useAuthStore();

  const handleAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  const { mutateAsync } = useGetProductsByCategory();

  const handleCategoryClick = async (category) => {
    try {
      await mutateAsync(category); // Pass the category to the API call
      setIsCategoryOpen(false);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleLanguageSelection = (event) => {
    i18n.changeLanguage(event.target.value);
    // navigate(`${pathname !== "/" ? pathname : ""}?lang=${event.target.value}`);
    navigate("/");
    setIsLanguageOpen(false);
  };

  return (
    <header className="bg-white shadow-md text-primary">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            {t("home").toUpperCase()}
          </NavLink>

          {/* MENU with Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="text-blue-800 font-semibold hover:text-orange-500 transition"
            >
              MENU
            </button>
            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-sm shadow-gray rounded-lg">
                <ul className="py-2">
                  <li className="border-b border-gray-300">
                    <NavLink
                      to="/orders"
                      className="block w-full text-left px-4 py-2 text-blue-800 font-semibold hover:bg-gray hover:text-white"
                    >
                      Orders
                    </NavLink>
                  </li>

                  {/* Social Media Icons */}
                  <li className="border-b border-gray-300">
                    <div className="flex items-center gap-4 flex-wrap px-4 py-4 text-blue-800">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiInstagramFill className="text-xl cursor-pointer text-pink-500" />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF className="text-xl cursor-pointer text-blue-600" />
                      </a>
                      <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTiktok className="text-xl cursor-pointer text-black" />
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube className="text-xl cursor-pointer text-red-600" />
                      </a>
                      <a
                        href="https://www.youtube.com/shorts"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiYoutubeshorts className="text-xl cursor-pointer text-red-600" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="text-xl cursor-pointer text-blue-400" />
                      </a>
                      <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGoogle className="text-xl cursor-pointer text-red-500" />
                      </a>
                      <a
                        href="https://wa.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiWhatsappFill className="text-xl cursor-pointer text-green-500" />
                      </a>
                    </div>
                  </li>

                  {/* Contact Details */}
                  <li>
                    <div className="px-4 py-2 text-blue-800">
                      <p className="font-semibold">Contact Details</p>
                      <p className="text-sm">
                        Phone:{" "}
                        <a
                          href="tel:+1234567890"
                          className="text-blue-800 hover:text-orange-500"
                        >
                          +1 234 567 890
                        </a>
                      </p>
                      <p className="text-sm">
                        Email:{" "}
                        <a
                          href="mailto:info@example.com"
                          className="text-blue-800 hover:text-orange-500"
                        >
                          info@example.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center Logo/Name */}
        <div className="text-2xl font-semibold text-blue-800 tracking-wider text-center">
          FAITHLINE ENTERPRISE
        </div>

        {/* Right Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={handleAction}
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            {title.toUpperCase()}
          </button>
          {/* LANGUAGE Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              className="text-blue-800 font-semibold hover:text-orange-500 transition"
            >
              {i18n.language === "en"
                ? "ENGLISH"
                : i18n.language === "fi"
                ? "FINNISH"
                : "SWEDISH"}
            </button>
            {isLanguageOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-sm shadow-gray rounded-lg">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() =>
                        handleLanguageSelection({ target: { value: "en" } })
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray hover:text-white"
                    >
                      ENGLISH
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        handleLanguageSelection({ target: { value: "fi" } })
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray hover:text-white"
                    >
                      FINNISH
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        handleLanguageSelection({ target: { value: "sv" } })
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray hover:text-white"
                    >
                      SWEDISH
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu Icon (Visible on Mobile) */}
        <div
          className="flex items-center md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <NavLink
                to="/"
                className="text-blue-800 font-semibold hover:text-orange-500 transition py-2"
              >
                {t("home").toUpperCase()}
              </NavLink>
            </li>

            {/* Menu with Social Media Icons */}
            <li>
              <div className="flex flex-wrap gap-4 px-4 py-2 text-blue-800">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiInstagramFill className="text-xl cursor-pointer text-pink-500" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-xl cursor-pointer text-blue-600" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="text-xl cursor-pointer text-black" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-xl cursor-pointer text-red-600" />
                </a>
                <a
                  href="https://www.youtube.com/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiYoutubeshorts className="text-xl cursor-pointer text-red-600" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-xl cursor-pointer text-blue-400" />
                </a>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGoogle className="text-xl cursor-pointer text-red-500" />
                </a>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiWhatsappFill className="text-xl cursor-pointer text-green-500" />
                </a>
              </div>
            </li>

            {/* Contact Details */}
            <li>
              <div className="px-4 py-2 text-blue-800">
                <p className="font-semibold">Contact Details</p>
                <p className="text-sm">
                  Phone:{" "}
                  <a
                    href="tel:+1234567890"
                    className="text-blue-800 hover:text-orange-500"
                  >
                    +1 234 567 890
                  </a>
                </p>
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href="mailto:info@example.com"
                    className="text-blue-800 hover:text-orange-500"
                  >
                    info@example.com
                  </a>
                </p>
              </div>
            </li>

            {/* Login / Logout Button */}
            <li>
              <button
                onClick={handleAction}
                className="text-blue-800 font-semibold hover:text-orange-500 transition py-2"
              >
                {isAuthenticated ? "LOG OUT" : "LOG IN"}
              </button>
            </li>

            {/* Language Dropdown */}
            <li>
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen((prev) => !prev)}
                  className="text-blue-800 font-semibold hover:text-orange-500 py-2"
                >
                  {i18n.language === "en"
                    ? "ENGLISH"
                    : i18n.language === "fi"
                    ? "FINNISH"
                    : "SWEDISH"}
                </button>
                {isLanguageOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-sm shadow-gray rounded-lg z-50">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={() =>
                            handleLanguageSelection({ target: { value: "en" } })
                          }
                          className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray-200"
                        >
                          ENGLISH
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleLanguageSelection({ target: { value: "fi" } })
                          }
                          className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray-200"
                        >
                          FINNISH
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleLanguageSelection({ target: { value: "sv" } })
                          }
                          className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray-200"
                        >
                          SWEDISH
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
