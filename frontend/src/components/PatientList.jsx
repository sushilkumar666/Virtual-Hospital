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
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken + "got the ccess gtoken inside ptinetlist.jsx");
      const { data } = await axios.get(
        "https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/patientlist",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
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

  // const fetchPatients = async () => {
  //   try {
  //     const accessToken =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYyYTA2NGM2YmEyOWQ5NzA1YWZkMmEiLCJlbWFpbCI6ImRvY3RvcjFAZ21haWwuY29tIiwiaWF0IjoxNzI5OTQxNDUyLCJleHAiOjE3MzAwMjc4NTJ9.RACsG-bWzTVoXvWaZEyrrht8wmFIgfSUe0i9Cw_WUjM";

  //     const { data } = await axios.get(
  //       "https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/patientlist",
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`, // Use accessToken here
  //         },
  //       }
  //     );

  //     setPatients(data.data.patientList);
  //     console.log("All patient values fetched successfully");
  //   } catch (error) {
  //     console.log("Error while fetching patients data");
  //     console.error(error);
  //   }
  // };

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

  const InfoItem = ({ label, value, isTitle = false, isHighlight = false }) => (
    <div className="flex flex-col">
      <span className="text-sm  font-medium text-gray-500">{label}</span>
      <span
        className={`
          ${isTitle ? "text-xl font-semibold text-gray-800" : "text-gray-700"} 
          ${isHighlight ? "text-red-600 font-medium" : ""}
        w-[150px] `}>
        {value || "Not provided"}
      </span>
    </div>
  );

  // useEffect(() => {
  //   setSearchState();
  // }, [search]);

  return (
    <div className="min-h-screen  bg-gray-50 p-6 ">
      <div className="   border-2  border-green-500">
        <div className="space-y-6        justify-between">
          {patients?.map((patient) => (
            <div
              key={patient._id}
              className="bg-gray-10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row justify-around p-6 gap-6">
                {/* Image Section */}
                <div >
                  <img
                    src={patient.profileImage}
                    alt={patient.name}
                    className="w-auto h-[200px] object-cover rounded-lg shadow-sm"
                  />
                </div>

                {/* Patient Information */}
                <div className="  space-y-3  ">
                  <div className="  grid grid-cols-1 text-left md:grid-cols-[30%_70%] gap-4">
                    {/* Left Column */}

                    <div className="space-y-3 max-h-64  border-gray-200 p-4 rounded-2xl border-2">
                      {/* <div className="text-xl">Patient Details</div> */}
                      <InfoItem
                        label="Patient Name"
                        value={patient.name}
                        isTitle={true}
                      />
                      <InfoItem
                        label="Email"
                        value={patient.email}
                      />
                      <InfoItem
                        label="Phone"
                        value={patient.phone}
                      />
                      <InfoItem
                        label="Age"
                        value={patient.age}
                      />

                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 flex flex-col md:max-h-64 gap-x-4 overflow-y-auto overflow-x-hidden  w-[500px]   flex-wrap   border-gray-200 p-4 rounded-2xl border-2">
                      <InfoItem
                        label="Diabetic"
                        value={patient.diabeticOrNot}
                        isHighlight={patient.diabeticOrNot === "Yes"}
                      />
                      <InfoItem
                        label="Illness History"
                        value={patient.historyOfIllness}
                      />
                      <InfoItem
                        label="Surgery History"
                        value={patient.historyOfSurgery}
                      />
                      <InfoItem
                        label="Current Illness"
                        value={patient.currentIllnessHistory}
                      />
                      <InfoItem
                        label="Recent Surgery"
                        value={patient.recentSurgery}
                      />

                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="     flex items-center justify-center md:justify-end">
                  <button
                    onClick={() =>
                      navigate(`/doctor/prescription/${patient._id}`)
                    }
                    className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 shadow-sm">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Prescribe</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
