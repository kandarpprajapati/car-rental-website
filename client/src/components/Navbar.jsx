import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            HOME
          </NavLink>
          <NavLink
            to="#category"
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            CATEGORY
          </NavLink>
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
            href="#finnish"
            className="text-blue-800 font-semibold hover:text-orange-500 transition"
          >
            FINNISH
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
              <NavLink
                to="#category"
                className="text-blue-800 font-semibold hover:text-orange-500 transition"
              >
                CATEGORY
              </NavLink>
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
