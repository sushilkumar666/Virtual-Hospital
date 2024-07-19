import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/authSlice";
import axios from "axios";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const identity = useSelector((state) => state.auth.identity);
  console.log(identity + "this is the value of identity in navabar");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState({
    patients: [],
    doctors: [],
  });

  const logout = async () => {
    console.log("logout ubtton clicked");
    // alert("button clicked");
    const { data } = await axios.get(
      "https://virtual-hospital.vercel.app/logout",
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      console.log("after succesffully logged out from backed");
      console.log(data + "data after log out");
      navigate("/login");

      dispatch(logoutAction());
    }
  };

  return (
    <nav className="bg-green-600 flex  px-10  shadow-lg">
      <div>
        <Link to="/" className="  py-4 px-2">
          <p className="text-xl font-bold text-white">Virtual Hosptial</p>
        </Link>
      </div>

      <div className="   flex  ml-12    items-center  ">
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

      <div className="flex ml-auto mr-12 items-center">
        <div className="ml-11">
          <SearchBar setSearchResults={setSearchResults} />
        </div>
      </div>
      <div className="  md:flex    items-center  ">
        {authStatus && (
          <>
            <a
              onClick={() => navigate("/profile")}
              href="#"
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
