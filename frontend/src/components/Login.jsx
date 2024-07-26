import React, { useEffect, useState } from "react";
import DoctorSignIn from "./DoctorSignIn";
import PatientSignIn from "./PatientSignIn";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [user, setUser] = useState("");
  useEffect(() => {}, [user]);
  return (
    <>
      <div>
        {/* <form action="">
          <input onChange={(e) => setUser("doctor")} type="radio" name="user" />
          Doctor &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            onChange={(e) => setUser("patient")}
            type="radio"
            name="user"
          />
          Patient
        </form> */}
        <div className=" rounded-lg md:mt-20 mt-8 md:w-[30vw] w-[90vw] mx-auto pb-4 px-4 ">
          <form action="">
            <div className="flex border  border-black justify-evenly">
              <div className="text-xl  w-[300px] border-r-2 border-black  text-black">
                <input
                  id="doctor"
                  onChange={(e) => setUser("doctor")}
                  type="radio"
                  name="user"
                />
                <label htmlFor="doctor">
                  <p>
                    <img
                      className="mx-auto"
                      width="100px"
                      height="100px"
                      src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719652748/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31_byrpfl.jpg"
                    />
                  </p>
                  <p>Doctor</p>
                </label>
              </div>
              <div className="text-xl rounded-lg w-[300px]   text-black">
                <input
                  id="patient"
                  onChange={(e) => setUser("patient")}
                  type="radio"
                  name="user"
                />
                <label htmlFor="patient">
                  <p>
                    <img
                      className="mx-auto"
                      width="100px"
                      height="100px"
                      src="https://res.cloudinary.com/dgjqrdpbq/image/upload/v1719814310/1430453_heabgf.png"
                    />
                  </p>
                  <p>Patient</p>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      {user == "doctor" ? <DoctorSignIn /> : <PatientSignIn />}
    </>
  );
}

export default Login;
