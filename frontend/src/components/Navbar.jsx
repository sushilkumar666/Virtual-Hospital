import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import axios from "axios";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    const { data } = await axios.get("http://localhost:8000/logout", {
      withCredentials: true,
    });
    if (data.success) {
      console.log("after succesffully logged out from backed");
      console.log(data);
      dispatch(logout());

      // console.log("logged out successfullY");
      // navigate("/login");
    }
  };

  return (
    <nav className="bg-green-600  shadow-lg">
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
                <span className="font-semibold text-white text-lg">
                  YourBrand
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-4 px-2 text-white border-b-4 border-blue-500 font-semibold"
              >
                Doctors
              </a>
              <a
                href="#"
                className="py-4 px-2 text-white font-semibold hover:text-blue-500 transition duration-300"
              >
                Prescriptions
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {authStatus && (
              <>
                <a
                  href="#"
                  className="py-2 px-2 font-medium text-white rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                >
                  Profile
                </a>
                <a
                  onClick={logout}
                  href="#"
                  className="py-2 px-2 font-medium text-white rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                >
                  Log Out
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
