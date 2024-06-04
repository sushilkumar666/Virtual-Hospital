import React, { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <img
                  src="/path-to-your-logo.png"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-semibold text-gray-500 text-lg">
                  YourBrand
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-4 px-2 text-gray-500 border-b-4 border-blue-500 font-semibold"
              >
                Doctors
              </a>
              <a
                href="#"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
              >
                Prescriptions
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a
              href="#"
              className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
            >
              Profile
            </a>
            <a
              href="#"
              className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
            >
              Sign In
            </a>
            <a
              href="#"
              className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
            >
              Sign Out
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "block" : "hidden"}`}>
        <ul>
          <li className="active">
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white bg-blue-500 font-semibold"
            >
              Doctors
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
            >
              Prescriptions
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
            >
              Sign In
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
            >
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
