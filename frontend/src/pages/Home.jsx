import React from "react";

// import DoctorProfile from "../components/DoctorProfile";
import PatientList from "../components/PatientList";
import { useSelector } from "react-redux";
import DoctorList from "../components/DoctorList";
import AuthLayout from "./../components/AuthLayout";

function Home() {
  console.log("insdie home page");
  const state = useSelector((state) => state.auth);
  console.log(JSON.stringify(state.identity) + " this is identy i home");
  return (
    <>
      <div>{state.identity == "doctor" && <PatientList />}</div>
      <div> {state.identity == "patient" && <DoctorList />} </div>
    </>
  );
}

export default Home;
