import React, { useEffect, useState } from "react";
import DoctorSignUp from "./DoctorSignUp";
import PatientSignUp from "./PatientSignUp";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [selectedType, setSelectedType] = useState(null);
  const [user, setUser] = useState("patient");
  const navigate = useNavigate();
  useEffect(() => { }, [user]);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Choose Account Type
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Doctor Option */}
            <label
              className={`relative cursor-pointer group ${selectedType === "doctor" ? "ring-2 ring-blue-500" : ""
                }`}>
              <input
                type="radio"
                name="userType"
                className="sr-only"
                onChange={() => {
                  setSelectedType("doctor");
                  navigate("/doctor/signup");
                }}
              />
              <div className="rounded-lg p-6 transition-all duration-200 hover:shadow-md border-2 border-gray-200 hover:border-blue-500">
                <div className="flex flex-col items-center">
                  <div className="w-[200px] h-[200px] mb-4 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center">
                    <img
                      src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719652748/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31_byrpfl.jpg"
                      alt="Doctor"
                      className=" w-[120px] h-[120px]"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Doctor
                  </h3>
                  <p className="text-gray-500 text-center text-sm">
                    Register as a healthcare provider
                  </p>
                </div>
              </div>
            </label>

            {/* Patient Option */}
            <label
              className={`relative cursor-pointer group ${selectedType === "patient" ? "ring-2 ring-blue-500" : ""
                }`}>
              <input
                type="radio"
                name="userType"
                className="sr-only"
                onChange={() => {
                  setSelectedType("patient");
                  navigate("/patient/signup");
                }}
              />
              <div className="rounded-lg p-6 transition-all duration-200 hover:shadow-md border-2 border-gray-200 hover:border-blue-500">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 mb-4 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center">
                    <img
                      src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719814310/1430453_heabgf.png"
                      alt="Patient"
                      className="  w-[120px] h-[120px]"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Patient
                  </h3>
                  <p className="text-gray-500 text-center text-sm">
                    Register as a patient
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
