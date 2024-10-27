import React, { useEffect, useState } from "react";
import DoctorSignIn from "./DoctorSignIn";
import PatientSignIn from "./PatientSignIn";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [user, setUser] = useState("");
  useEffect(() => { }, [user]);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Selection Cards */}
        <div className="mb-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
            Choose Account Type
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mx-auto max-w-2xl">
            {/* Doctor Card */}
            <label
              className={`relative flex flex-col items-center p-6 cursor-pointer border-2 rounded-xl transition-all duration-200 hover:shadow-md
                ${user === "doctor"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-200"
                }`}>
              <input
                type="radio"
                name="user"
                id="doctor"
                value="doctor"
                className="sr-only"
                onChange={(e) => setUser(e.target.value)}
                checked={user === "doctor"}
              />
              <div className="w-24 h-24 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719652748/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31_byrpfl.jpg"
                  alt="Doctor"
                  className="w-16 h-16  "
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Doctor
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Healthcare provider account with access to patient management
              </p>

              {/* Selection Indicator */}
              <div
                className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${user === "doctor" ? "border-blue-500" : "border-gray-300"}`}>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200
                  ${user === "doctor" ? "bg-blue-500" : "bg-transparent"}`}
                />
              </div>
            </label>

            {/* Patient Card */}
            <label
              className={`relative flex flex-col items-center p-6 cursor-pointer border-2 rounded-xl transition-all duration-200 hover:shadow-md
                ${user === "patient"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-200"
                }`}>
              <input
                type="radio"
                name="user"
                id="patient"
                value="patient"
                className="sr-only"
                onChange={(e) => setUser(e.target.value)}
                checked={user === "patient"}
              />
              <div className="w-24 h-24 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719814310/1430453_heabgf.png"
                  alt="Patient"
                  className="w-16 h-16  "
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Patient
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Book appointments and manage your healthcare journey
              </p>

              {/* Selection Indicator */}
              <div
                className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${user === "patient" ? "border-blue-500" : "border-gray-300"}`}>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200
                  ${user === "patient" ? "bg-blue-500" : "bg-transparent"}`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Render Sign In Components */}
        <div className="mt-8">
          {user === "doctor" ? <DoctorSignIn /> : null}
          {user === "patient" ? <PatientSignIn /> : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
