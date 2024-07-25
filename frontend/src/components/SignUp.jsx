import React, { useEffect, useState } from "react";
import DoctorSignUp from "./DoctorSignUp";
import PatientSignUp from "./PatientSignUp";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState("patient");
  const navigate = useNavigate();
  useEffect(() => {}, [user]);
  return (
    <>
      <div className="border border-black rounded-lg mt-20 md:w-[50vw] w-[75vw]  mx-auto p-4 ">
        <form action="">
          <div className="flex justify-evenly">
            <div className="text-xl  w-[600px] border-r-2 border-black  text-black">
              <input
                id="doctor"
                onChange={() => navigate("/doctor/signup")}
                type="radio"
                name="user"
              />
              <label htmlFor="doctor">
                <img
                  width={400}
                  src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719652748/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31_byrpfl.jpg"
                />{" "}
                <p>Doctor</p>
              </label>
            </div>
            <div className="text-xl  w-[600px]  rounded-lg pt-8  text-black">
              <input
                id="patient"
                onChange={() => navigate("/patient/signup")}
                type="radio"
                name="user"
              />
              <label htmlFor="patient">
                <img
                  className="mx-auto"
                  width={310}
                  src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719814310/1430453_heabgf.png"
                />

                <p className="mt-10  ">Patient</p>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="p-4 text-xl ">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          &nbsp; Login
        </span>
      </div>
      {/* {user == "doctor" ? <DoctorSignUp /> : <PatientSignUp />} */}
    </>
  );
}

export default SignUp;
