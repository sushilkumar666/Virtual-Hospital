import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/authSlice";
import axios from "axios";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./../index.css";
import { optionClose, optionOpen } from "../store/optionSlice";
import { BACKEND_URL } from "../config";

import { Menu, X, Search, User, LogOut } from "lucide-react";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const identity = useSelector((state) => state.auth.identity);
  const option = useSelector((state) => state.option.open);
  const [isOpen, setIsOpen] = useState(option);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const profileRef = useRef(null);
  const [searchResults, setSearchResults] = useState({
    patients: [],
    doctors: [],
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const profileIconRef = useRef(null);


  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = (e) => {

    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("nadle outside click sushil")
      console.log(identity + " this is identity from navbar");
      console.log(identity == "doctor")
      if (option) {
        dispatch(optionClose());
      }
      // console.log(isProfileDropdownOpen + " isProfileDropdownOpen")
      // console.log(profileRef?.current?.contains(event.target) + " profileRef.current.contains(event.target)")
      // console.log(profileIconRef?.current.contains(event.target) + " profileIconRef.current.contains(event.target)")
      if (
        isProfileDropdownOpen &&

        !profileRef?.current?.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(() => false);

        console.log("Clicked outside dropdown");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [option, dispatch, isProfileDropdownOpen]);

  const handleOptionClick = (event) => {
    event.stopPropagation(); // Prevents the click from propagating to the document
    if (option) {
      dispatch(optionClose());
    } else {
      dispatch(optionOpen());
    }
  };

  const logout = async () => {
    console.log("logout ubtton clicked");
    // alert("button clicked");
    const { data } = await axios.get(
      `${BACKEND_URL}/logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",

      },
    }
    );
    if (data.success) {
      console.log("after succesffully logged out from backed");
      console.log(data + "data after log out");
      dispatch(logoutAction());
      navigate("/login");
    }
  };
  console.log(authStatus + " authstatus value ffrom doctor signup");
  return (
    authStatus && (
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Primary Navigation */}
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="flex items-center">
                  <span className="text-xl font-bold text-blue-600">
                    Virtual Hospital
                  </span>
                </Link>
              </div>

              {/* Primary Navigation - Desktop */}
              <div className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                    }`
                  }>
                  {/* {identity == "doctor" ? "Patients" : "Doctors"} */}
                  {identity === "doctor" ? "Patients" : "Doctors"}


                </NavLink>

                <NavLink
                  to={
                    identity === "doctor"
                      ? "doctor/patienthistory"
                      : "/patient/prescription"
                  }
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                    }`
                  }>
                  {identity === "doctor" ? "History" : "Prescriptions"}
                </NavLink>
              </div>
            </div>

            {/* Search and Profile - Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <div className="w-64">
                <SearchBar setSearchResults={setSearchResults} />
              </div>

              {/* Profile Dropdown */}
              <div ref={profileIconRef} className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150">
                  <User className="h-5 w-5 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div ref={profileRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate(
                            identity === "doctor"
                              ? "doctor/doctorprofile"
                              : "patient/patientprofile"
                          );
                          toggleProfileDropdown();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          toggleProfileDropdown();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                {identity === "doctor" ? "Patients" : "Doctors"}
              </NavLink>

              <NavLink
                to={
                  identity === "doctor"
                    ? "doctor/patienthistory"
                    : "/patient/prescription"
                }
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                {identity === "doctor" ? "History" : "Prescriptions"}
              </NavLink>

              <div className="px-3 py-2">
                <SearchBar setSearchResults={setSearchResults} />
              </div>

              <button
                onClick={() =>
                  navigate(
                    identity === "doctor"
                      ? "doctor/doctorprofile"
                      : "patient/patientprofile"
                  )
                }
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Profile
              </button>

              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Log Out
              </button>
            </div>
          </div>
        )}
      </nav>
    )
  );
}

export default Navbar;
