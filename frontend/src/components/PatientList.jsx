// components/DoctorProfile.js
// components/PrescriptionPage.js
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";

const PatientList = () => {
  //   const [patients, setpatients] = useState([]);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/doctor/patientlist",
          { withCredentials: true, "Custom-Header": "CustomValue" }
        );
        setPatients(data.data.patientList);
        console.log(typeof data, "res data", data.data);
      } catch (error) {
        console.log("error while fetching patients data");
        console.error(error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Doctor Profile</h2>
      <Link to="/prescription">Go to Prescription Page</Link>
      <div>
        {patients?.map((patient) => (
          <div className="flex px-5 py-3" key={patient._id}>
            <div>
              <img width={"300px"} src={patient.profileImage} alt="" />
            </div>
            <div className="text-left pl-4">
              <div>
                Patient Name:&nbsp; <span>{patient.name}</span>
              </div>
              <div>
                Email: &nbsp; <span>{patient.email}</span>
              </div>
              <div>
                Phone: &nbsp; <span>{patient.phone}</span>
              </div>
              <div>
                Age: <span>{patient.age}</span>
              </div>

              <div>
                Family Medical History: &nbsp;{" "}
                <span>{patient.familyMedicalHistory}</span>
              </div>
              <div>
                Illness History: &nbsp; <span>{patient.historyOfIllness}</span>
              </div>
              <div>
                Surgeory History:&nbsp; <span>{patient.historyOfSurgery}</span>
              </div>

              <div>
                {" "}
                Current Illness Hisotry:{" "}
                <span>{patient.currentIllnessHistory}</span>
              </div>
              <div>
                Recent Surgeory: <span>{patient.recentSurgery}</span>
              </div>
            </div>
            <div className="ml-auto mr-20">
              <span
                onClick={() => {
                  navigate(`/doctor/prescription/${patient._id}`);
                }}
                className="ml-auto p-4 bg-[#0f9015] border  cursor-pointer text-white rounded-xl"
              >
                prescribe
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
