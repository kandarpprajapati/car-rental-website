import React from "react";

const Footer = () => {
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
              <h3 className="text-lg font-semibold mb-4">Home</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Category</h3>
              <ul className="space-y-2">
                <li>&gt; Muutto ja Kuljetus</li>
                <li>&gt; Pitkän matkan liikkuminen</li>
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
