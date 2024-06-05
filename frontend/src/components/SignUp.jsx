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
      <div>
        <form action="">
          <input
            onChange={() => navigate("/doctor/signup")}
            type="radio"
            name="user"
          />
          Doctor &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            onChange={() => navigate("/patient/signup")}
            type="radio"
            name="user"
          />
          Patient
        </form>
      </div>
      {/* {user == "doctor" ? <DoctorSignUp /> : <PatientSignUp />} */}
    </>
  );
}

export default SignUp;
