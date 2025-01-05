import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetProductsByCategory } from "../hooks/products/useGetProductByCategory";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // For category dropdown

  const { mutateAsync } = useGetProductsByCategory();

  const handleCategoryClick = async (category) => {
    try {
      await mutateAsync(category); // Pass the category to the API call
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
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
            HOME
          </NavLink>

          {/* CATEGORY with Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="text-blue-800 font-semibold hover:text-orange-500 transition"
            >
              CATEGORY
            </button>
            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-sm shadow-gray rounded-lg">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() =>
                        handleCategoryClick("Moving and Transportation")
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray-100"
                    >
                      Muutto ja Kuljetus
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        handleCategoryClick("Long distance travel")
                      }
                      className="block w-full text-left px-4 py-2 text-blue-800 hover:bg-gray-100"
                    >
                      Pitkän matkan liikkuminen
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center Logo */}
        <div className="text-2xl font-bold text-blue-800">LOGO</div>

        {/* Right Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="#menu"
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            MENU
          </NavLink>
          <a
            href="/auth"
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            LOGIN
          </a>
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
                HOME
              </NavLink>
            </li>
            <li>
              {/* CATEGORY with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className="text-blue-800 font-semibold hover:text-orange-500 transition"
                >
                  CATEGORY
                </button>
                {isCategoryOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li>
                        <NavLink
                          to="/muutto"
                          className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                        >
                          Muutto ja Kuljetus
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pitkanmatkan"
                          className="block px-4 py-2 text-blue-800 hover:bg-gray-100"
                        >
                          Pitkän matkan liikkuminen
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
                MENU
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#finnish"
                className="text-blue-800 font-semibold hover:text-orange-500 transition"
              >
                FINNISH
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
