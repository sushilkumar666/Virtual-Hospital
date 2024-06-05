import React from "react";

import Doctors from "../components/Doctors";
import DoctorProfile from "../components/DoctorProfile";

import { useSelector } from "react-redux";


function Home() {
    const identity = useSelector((state) => state.auth.identity)
    console.log(identity);
    return (
        <div>
            {identity == 'doctor' ? <DoctorProfile /> : <Doctors />}




        </div>
    );
}

export default Home;
