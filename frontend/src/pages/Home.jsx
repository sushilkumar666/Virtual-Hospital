import React from "react";
import DoctorSignIn from "../components/DoctorSignIn";
import DoctorSignUp from "../components/DoctorSignup";
import PatientSignIn from "../components/PatientSignIn";
import PatientSignUp from "../components/PatientSignUp";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Doctors from "../components/Doctors";
import DoctorProfile from "../components/DoctorProfile";
import PrescriptionPage from "../components/PrescriptionPage";

function Home() {
  return (
    <div>
      <Doctors />
      <DoctorProfile />
    </div>
  );
}

export default Home;
