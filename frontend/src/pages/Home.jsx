import React from "react";

// import DoctorProfile from "../components/DoctorProfile";
import PatientList from "../components/PatientList";
import { useSelector } from "react-redux";
import DoctorList from "../components/DoctorList";

function Home() {
  console.log("insdie home page");
  const state = useSelector((state) => state.auth);
  // console.log(identity);
  return (
    <div>{state.identity == "doctor" ? <PatientList /> : <DoctorList />}</div>
  );
}

export default Home;
