// components/DoctorProfile.js
// components/PrescriptionPage.js
import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const DoctorProfile = () => {
  //   const [consultations, setConsultations] = useState([]);
  const consultations = [
    {
      name: "arman",
      email: "arman@gmail.com",
      familyMedicalHistory: "all clear",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vdueakGImGactugJLkm9szSZD4KDT_BtlQ&s",
      phone: "98766544",
      age: "20",
      historyOfSurgery: "xyz surgery",
      historyOfIllness: "lorem, ipsum",
      currentIllnessHistory: "many illness, skin, heart, body",
      recentSurgery: "heart surgery",
    },
    {
      name: "arman",
      email: "arman@gmail.com",
      familyMedicalHistory: "all clear",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vdueakGImGactugJLkm9szSZD4KDT_BtlQ&s",
      phone: "98766544",
      age: "20",
      historyOfSurgery: "xyz surgery",
      historyOfIllness: "lorem, ipsum",
      currentIllnessHistory: "many illness, skin, heart, body",
      recentSurgery: "heart surgery",
    },
    {
      name: "arman",
      email: "arman@gmail.com",
      familyMedicalHistory: "all clear",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vdueakGImGactugJLkm9szSZD4KDT_BtlQ&s",
      phone: "98766544",
      age: "20",
      historyOfSurgery: "xyz surgery",
      historyOfIllness: "lorem, ipsum",
      currentIllnessHistory: "many illness, skin, heart, body",
      recentSurgery: "heart surgery",
    },
  ];

  useEffect(() => {
    const fetchConsultations = (async () => {}, []);
  });

  return (
    <div>
      <h2>Doctor Profile</h2>
      <Link to="/prescription">Go to Prescription Page</Link>
      <div>
        {consultations.map((consultation) => (
          <div className="flex px-5 py-3" key={consultation._id}>
            <div>
              <img width={"300px"} src={consultation.profileImage} alt="" />
            </div>
            <div className="text-left pl-4">
              <div>
                Patient Name:&nbsp; <span>{consultation.name}</span>
              </div>
              <div>
                Email: &nbsp; <span>{consultation.email}</span>
              </div>
              <div>
                Phone: &nbsp; <span>{consultation.phone}</span>
              </div>
              <div>
                Age: <span>{consultation.age}</span>
              </div>

              <div>
                Family Medical History: &nbsp;{" "}
                <span>{consultation.familyMedicalHistory}</span>
              </div>
              <div>
                Illness History: &nbsp;{" "}
                <span>{consultation.historyOfIllness}</span>
              </div>
              <div>
                Surgeory History:&nbsp;{" "}
                <span>{consultation.historyOfSurgery}</span>
              </div>

              <div>
                {" "}
                Current Illness Hisotry:{" "}
                <span>{consultation.currentIllnessHistory}</span>
              </div>
              <div>
                Recent Surgeory: <span>{consultation.recentSurgery}</span>
              </div>
            </div>
            <div className="ml-auto mr-20">
              <span className="ml-auto p-4 bg-[#0f9015] cursor-pointer text-white rounded-xl">
                prescribe
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfile;
