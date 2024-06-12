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
        <form action="">
          <input onChange={(e) => setUser("doctor")} type="radio" name="user" />
          Doctor &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            onChange={(e) => setUser("patient")}
            type="radio"
            name="user"
          />
          Patient
        </form>
      </div>
      {user == "doctor" ? <DoctorSignIn /> : <PatientSignIn />}
    </>
  );
}

export default Login;
