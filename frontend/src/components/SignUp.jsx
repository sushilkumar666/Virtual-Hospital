import React, { useEffect, useState } from "react";
import DoctorSignUp from "./DoctorSignUp";
import PatientSignUp from "./PatientSignUp";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState("patient");
  const navigate = useNavigate();
  useEffect(() => { }, [user]);
  return (
    <>
      <div className="border border-black rounded-lg mt-20 w-[30vw] mx-auto p-4 ">
        <form action="">
          <div className="flex justify-evenly">
            <div className="text-xl px-3 py-2 rounded-lg bg-green-600 text-white">

              <input
                onChange={() => navigate("/doctor/signup")}
                type="radio"
                name="user"
              />
              <span > &nbsp;Doctor &nbsp;&nbsp;&nbsp;&nbsp; </span>
            </div>
            <div className="text-xl rounded-lg px-3 py-2 bg-blue-600 text-white">
              <input
                onChange={() => navigate("/patient/signup")}
                type="radio"
                name="user"
              />
              <span > &nbsp;Patient </span>
            </div>
          </div>
        </form>
      </div >
      {/* {user == "doctor" ? <DoctorSignUp /> : <PatientSignUp />} */}
    </>
  );
}

export default SignUp;
