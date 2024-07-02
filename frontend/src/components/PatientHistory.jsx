// components/DoctorProfile.js
// components/PrescriptionPage.js
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientHistory = () => {
  //   const [patients, setpatients] = useState([]);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const search = useSelector((state) => state.search.searchQuery);
  const [searchState, setSearchState] = useState(search);

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get(
        "https://virtual-hospital.vercel.app/api/v1/doctor/patienthistory",
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      setPatients(data.patientHistory);

      console.log(typeof data, "this is patient history data", data);
    } catch (error) {
      console.log("error while fetching patients data");
      console.error(error);
    }
  };

  useEffect(() => {
    const calling = async () => {
      await fetchPatients();
      console.log(search + " this is search value from query in redux");
      if (search && search.trim()) {
        console.log(search + " inside there exists a query");
        const filterPatients = patients.filter((patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase())
        );
        setPatients(filterPatients);
      } else {
        console.log("inside empty function call");
        fetchPatients();
      }
    };
    calling();
    // fetchPatients();
  }, [search]);

  const deleteRecord = async (patientId) => {
    try {
      console.log(patientId + " this pateint id");
      const data = await axios.patch(
        `https://virtual-hospital.vercel.app/api/v1/doctor/deletepatient/${patientId}`,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      if (data.success) {
        console.log(typeof data, "this is patient history data", data);
      }
    } catch (error) {
      console.log("error  wile deleting");
      console.error(error);
    }

    const filterPatients = patients.filter(
      (patient) => patient._id !== patientId
    );
    setPatients(filterPatients);
  };

  return (
    <div>
      <h2>Doctor Profile</h2>
      <Link to="/prescription">Go to Prescription Page</Link>
      <div>
        {patients
          ?.filter((patient) => patient.presentInHistory == true)
          .map((patient) => (
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
                  Illness History: &nbsp;{" "}
                  <span>{patient.historyOfIllness}</span>
                </div>
                <div>
                  Surgeory History:&nbsp;{" "}
                  <span>{patient.historyOfSurgery}</span>
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
                    navigate(`/doctor/patientlist/${patient._id}`);
                  }}
                  className="ml-auto p-4 px-8 m-2 bg-[#0f9015] border  cursor-pointer text-white rounded-xl"
                >
                  pdf
                </span>
                <span
                  onClick={() => deleteRecord(patient._id)}
                  className="ml-auto p-4 bg-red-600 border  cursor-pointer text-white rounded-xl"
                >
                  remove
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientHistory;
