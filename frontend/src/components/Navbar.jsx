import React, { useEffect, useState } from "react";
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

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const identity = useSelector((state) => state.auth.identity);
  const option = useSelector((state) => state.option.open);
  const [isOpen, setIsOpen] = useState(option);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState({
    patients: [],
    doctors: [],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (option) {
        dispatch(optionClose());
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [option, dispatch]);

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
    const { data } = await axios.get("http://localhost:8000/logout");
    if (data.success) {
      console.log("after succesffully logged out from backed");
      console.log(data + "data after log out");
      navigate("/login");

      dispatch(logoutAction());
    }
  };
  console.log(authStatus + " authstatus value ffrom doctor signup");
  return (
    authStatus && (
      <nav className="bg-green-600  index items-center md:flex justify-between px-12 border border-black w-[98vw] shadow-lg">
        <div
          style={{ zIndex: 20 }}
          className="flex z-20  items-center justify-between"
        >
          <div>
            <Link to="/">
              <p className="text-xl  font-bold text-white">Virtual Hosptial</p>
            </Link>
          </div>
          <div className="md:flex    md:ml-12 ">
            <div className="   flex items-center  ">
              <NavLink
                to="/"
                activeclassname="active"
                className="py-4 mx-6 px-2 text-white *: border-white hover:text-black transition duration-300   font-semibold"
              >
                Doctors
              </NavLink>

              {identity == "doctor" ? (
                <NavLink
                  activeclassname="active"
                  to="doctor/patienthistory"
                  className="py-4 px-2 text-white font-semibold hover:text-black transition duration-300"
                >
                  History
                </NavLink>
              ) : (
                <NavLink
                  activeclassname="active"
                  to="/patient/prescription"
                  className="py-4 px-2 text-white font-semibold hover:text-black transition duration-300"
                >
                  Prescriptions
                </NavLink>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="md:flex  items-center ml-auto ">
            <div className="flex ml-auto my-4 md:my-0  md:mr-12 items-center">
              <SearchBar setSearchResults={setSearchResults} />
              <div className="ml-10">
                <div className="md:hidden block" onClick={handleOptionClick}>
                  <BsThreeDotsVertical size={30} />
                </div>
                {option && (
                  <ul className="absolute right-6 ">
                    {identity == "doctor" ? (
                      <li className="bg-white border border-gray-300 p-3">
                        {" "}
                        <a
                          onClick={() => navigate(`doctor/doctorprofile`)}
                          href=""
                          className="py-2 px-4 font-medium text-black rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                        >
                          Profile
                        </a>
                      </li>
                    ) : (
                      <li className="bg-white border border-gray-300 p-3">
                        {" "}
                        <a
                          onClick={() => navigate(`patient/patientprofile`)}
                          href=""
                          className="py-2 px-4 font-medium text-black rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                        >
                          Profile
                        </a>
                      </li>
                    )}
                    <li className="bg-white border border-gray-300 p-3">
                      <a
                        onClick={logout}
                        href="#"
                        className="py-2 px-4 font-medium text-black rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {authStatus && (
              <div className="hideinmoble">
                <div>
                  <a
                    href="/profile"
                    className="py-2 px-4 font-medium text-white rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                  >
                    Profile
                  </a>
                  <a
                    onClick={logout}
                    href="#"
                    className="py-2 px-4 font-medium text-white rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  );
}

export default Navbar;
