import React from "react";
import { useGetProductsByCategory } from "../hooks/products/useGetProductByCategory";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { mutateAsync } = useGetProductsByCategory();

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
            <h2 className="text-3xl font-bold tracking-wider">
              LO
              <br />
              GO
            </h2>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-between w-full md:w-auto md:gap-12">
            <div>
              <NavLink to="/" className="text-lg font-semibold mb-4">
                Home
              </NavLink>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Category</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() =>
                      handleCategoryClick("Moving and Transportation")
                    }
                    className="text-left text-primary-foreground hover:underline"
                  >
                    &gt; Muutto ja Kuljetus
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCategoryClick("Long distance travel")}
                    className="text-left text-primary-foreground hover:underline"
                  >
                    &gt; Pitkän matkan liikkuminen
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-900 mt-8 pt-4 flex justify-between items-center flex-wrap">
          {/* Login */}
          <p className="text-sm font-semibold">Login</p>

          {/* Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-xl cursor-pointer">🌐</span>
            <span className="text-xl cursor-pointer">📸</span>
            <span className="text-xl cursor-pointer">📘</span>
            <span className="text-xl cursor-pointer">📞</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
