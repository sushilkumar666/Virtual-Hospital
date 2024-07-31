import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { doctorId } = useParams();
  console.log(doctorId);
  const [doctor, setDoctor] = useState({}); // Initialize to null to handle loading state

  const fetchDoctorDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/patient/doctordetails/${doctorId}`,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      setDoctor(data.data);

      console.log(data.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      // Handle error (e.g., set error state)
    }
  };

  useEffect(() => {
    const getDoctorDetails = async () => {
      await fetchDoctorDetails();
    };
    getDoctorDetails();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <div className="card   md:flex items-center">
        <div className="md:mr-10 ">
          <img
            className="w-[60vw] md:w-[200px] mx-auto mb-4"
            src={doctor?.profileImage}
            alt={doctor?.name}
          />
        </div>
        <div className="text-left">
          <p className="text-4xl ">Dr.&nbsp;{doctor?.name}</p>
          <p>
            Specialty: <span>{doctor?.specialty}</span>
          </p>
          <p>
            Experience: <span>{doctor?.experience}</span>
          </p>
          <p>
            Email: <span>{doctor?.email}</span>
          </p>
          <p>
            Phone: <span>{doctor?.phone}</span>
          </p>
          <p>{doctor?.description}</p>

          <div className="mt-5">
            <Link
              className="px-4 py-2 border border-black bg-green-600 rounded-lg text-white"
              to={`/patient/consultationform/${doctor?._id}`}
            >
              Consult
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
