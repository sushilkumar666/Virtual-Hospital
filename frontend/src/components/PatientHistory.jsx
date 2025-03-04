// components/DoctorProfile.js
// components/PrescriptionPage.js
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Ban } from "lucide-react";

const PatientHistory = () => {
  //   const [patients, setpatients] = useState([]);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const search = useSelector((state) => state.search.searchQuery);
  const [searchState, setSearchState] = useState(search);

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/record/patientHistory`,
        { withCredentials: true }
      );
      console.log(JSON.stringify(data.patientHistory));
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

  const deleteRecord = async (recordId) => {
    try {

      const filterPatients = patients.filter(
        (patient) => patient._id !== recordId
      );
      setPatients(filterPatients);
      console.log(recordId + " this patient id");
      const data = await axios.patch(
        `${BACKEND_URL}/api/v1/record/removeRecord/${recordId}`, {},
        { withCredentials: true }
      );
      if (data.success) {
        console.log(typeof data, "this is patient history data", data);
      }
    } catch (error) {
      console.log("error  wile deleting");
      console.error(error);
    }


  };

  const InfoItem = ({ label, value }) => (
    <div className="flex text-left flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-gray-800">{value || "Not provided"}</span>
    </div>
  );

  return (
    patients.length === 0 ? (
      <div className="h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Ban className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No History
            </h2>
            <p className="text-gray-600">
              There are no prescriptions to display at this time.
            </p>
          </div>
        </div>
      </div>)
      :
      (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold   pb-4">
                Patient History
              </h1>
            </div>



            <div className="grid   gap-6">
              {patients
                ?.filter((patient) => patient.presentInHistory === true)
                .map((patient) => (
                  <div
                    key={patient._id}
                    className="bg-white  rounded-lg shadow-md overflow-auto transition-transform hover:shadow-lg">
                    <div className="flex flex-col  md:flex-row">
                      {/* Image Section */}
                      <div className="md:w-1/6 m-6  border-2 h-fit bg-white">
                        <img
                          src={patient.patientId.profileImage}
                          alt={patient.name}
                          className="w-auto mx-auto p-2 h-[200px] object-cover rounded-lg shadow-sm"
                        />
                      </div>

                      {/* Information Section */}
                      <div className="md:w-2/3     max-h-[240px] overflow-auto      p-6">
                        <div className="grid grid-cols-1  p-4  border-2 md:flex justify-between md:flex-wrap gap-4">
                          <div className="space-y-4">
                            <InfoItem
                              label="Patient Name"
                              value={patient.patientId.name}
                            />
                            <InfoItem
                              label="Email"
                              value={patient.patientId.email}
                            />
                            <InfoItem
                              label="Phone"
                              value={patient.patientId.phone}
                            />
                            <InfoItem
                              label="Age"
                              value={patient.patientId.age}
                            />
                          </div>

                          <div className="space-y-4">
                            <InfoItem
                              label="Current Illness"
                              value={patient.currentIllness}
                            />
                            <InfoItem
                              label="Recent Surgery"
                              value={patient.recentSurgery}
                            />
                            <InfoItem
                              label="Surgery History"
                              value={patient.historyOfSurgery}
                            />
                          </div>
                          <div className="mt-6 space-y-4">
                            <InfoItem
                              label="Diabetic or Not"
                              value={patient.diabeticOrNot}
                            />
                            <InfoItem
                              label="Others"
                              value={patient.others}
                            />
                          </div>
                        </div>



                        {/* Actions */}
                        <div className="mt-6 flex justify-end space-x-4">
                          <button
                            onClick={() =>
                              navigate(`/doctor/patientlist/${patient._id}`)
                            }
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            Generate PDF
                          </button>
                          <button
                            onClick={() => deleteRecord(patient._id)}
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove Record
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )
  );
};

export default PatientHistory;
