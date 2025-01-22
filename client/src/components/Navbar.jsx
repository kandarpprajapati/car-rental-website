import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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

          {/* CATEGORY with Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="text-blue-800 font-semibold hover:text-orange-500 transition"
            >
              {t("category.name").toUpperCase()}
            </button>
            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-sm shadow-gray rounded-lg">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() =>
                        handleCategoryClick("Moving and Transportation")
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray hover:text-white"
                    >
                      {t("category.category1")}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        handleCategoryClick("Long distance travel")
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray hover:text-white"
                    >
                      {t("category.category2")}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center Logo */}
        <div className="text-2xl font-semibold text-blue-800 tracking-wider">
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
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <NavLink
                to="/"
                className="text-blue-800 font-semibold hover:text-orange-500 transition"
              >
                {t("home").toUpperCase()}
              </NavLink>
            </li>
            <li>
              {/* CATEGORY with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className="text-blue-800 font-semibold hover:text-orange-500 transition"
                >
                  {t("category.name").toUpperCase()}
                </button>
                {isCategoryOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li>
                        <NavLink
                          to="/muutto"
                          className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                        >
                          {t("category.category1")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pitkanmatkan"
                          className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                        >
                          {t("category.category2")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li>
              <NavLink
                to="#menu"
                className="text-blue-800 font-semibold hover:text-orange-500 transition"
              >
                {t("menu").toUpperCase()}
              </NavLink>
            </li>
            <li>
              <div className="relative flex justify-center">
                <select
                  id="language"
                  class="bg-white border-none appearance-none text-blue-800 font-semibold flex justify-center text-center"
                  onChange={handleLanguageSelection}
                >
                  <option value="en" selected={i18n.language === "en"}>
                    ENGLISH
                  </option>
                  <option value="fi" selected={i18n.language === "fi"}>
                    FINNISH
                  </option>
                  <option value="sv" selected={i18n.language === "sv"}>
                    SWIDISH
                  </option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
