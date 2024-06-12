import React from "react";

import DoctorProfile from "../components/DoctorProfile";

import { useSelector } from "react-redux";
import DoctorList from "../components/DoctorList";

function Home() {
  console.log("insdie home page");
  const identity = useSelector((state) => state.auth.identity);
  console.log(identity);
  return <div>{identity == "doctor" ? <DoctorProfile /> : <DoctorList />}</div>;
}

export default Home;
