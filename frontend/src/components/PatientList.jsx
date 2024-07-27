// components/DoctorProfile.js
// components/PrescriptionPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const search = useSelector((state) => state.search.searchQuery);
  const [searchState, setSearchState] = useState(search);
  //redux se aa raha ahi

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/doctor/patientlist",
        {
          withCredentials: true,
          headers: {
            "Custom-Header": "CustomValue",
          },
        }
      );
      setPatients(data.data.patientList);
      console.log("all patinet vlae sesach");
    } catch (error) {
      console.log("error while fetching patients data");
      console.error(error);
    }
  };

  // const changeSearchState = async () => {
  //   await setSearchState(search);
  //   console.log("inside chang serach sate funtion");
  // };

  useEffect(() => {
    // changeSearchState();
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
  }, [search]);

  // useEffect(() => {
  //   setSearchState();
  // }, [search]);

  return (
    <div>
      <div className="p-4">
        {patients?.map((patient) => (
          <div className="p-4" key={patient._id}>
            <div className="border border-gray-500 rounded-lg flex  flex-col md:flex-row px-5 py-3">
              <div className="mx-auto md:mx-0">
                <img width={"230px"} src={patient.profileImage} alt="" />
              </div>

              <div className="text-left pl-4">
                <div className="text-xl">
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
                  Diabetic: <span>{patient?.diabeticOrNot}</span>
                </div>

                <div>
                  Illness History: &nbsp;{" "}
                  <span>{patient.historyOfIllness}</span>
                </div>
                <div>
                  Surgery History:&nbsp; <span>{patient.historyOfSurgery}</span>
                </div>

                <div>
                  {" "}
                  Current Illness History:{" "}
                  <span>{patient.currentIllnessHistory}</span>
                </div>
                <div>
                  Recent Surgery: <span>{patient.recentSurgery}</span>
                </div>
              </div>
              <div className="mx-auto md:ml-auto my-10 ">
                <span
                  onClick={() => {
                    navigate(`/doctor/prescription/${patient._id}`);
                  }}
                  className=" ml-auto p-4   bg-[#0f9015] border cursor-pointer text-white rounded-xl"
                >
                  prescribe
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
