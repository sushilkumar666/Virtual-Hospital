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
        "https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/patienthistory",
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
        `https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/deletepatient/${patientId}`,
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

  const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-gray-800">{value || "Not provided"}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 border-b pb-4">
            Patient History
          </h1>
        </div>

        <div className="grid gap-6">
          {patients
            ?.filter((patient) => patient.presentInHistory === true)
            .map((patient) => (
              <div
                key={patient._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/3 p-6 bg-gray-50">
                    <img
                      src={patient.profileImage}
                      alt={patient.name}
                      className="w-full h-[300px] object-cover rounded-lg shadow-sm"
                    />
                  </div>

                  {/* Information Section */}
                  <div className="md:w-2/3 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <InfoItem
                          label="Patient Name"
                          value={patient.name}
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

                      <div className="space-y-4">
                        <InfoItem
                          label="Family Medical History"
                          value={patient.familyMedicalHistory}
                        />
                        <InfoItem
                          label="Illness History"
                          value={patient.historyOfIllness}
                        />
                        <InfoItem
                          label="Surgery History"
                          value={patient.historyOfSurgery}
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <InfoItem
                        label="Current Illness History"
                        value={patient.currentIllnessHistory}
                      />
                      <InfoItem
                        label="Recent Surgery"
                        value={patient.recentSurgery}
                      />
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
  );
};

export default PatientHistory;
