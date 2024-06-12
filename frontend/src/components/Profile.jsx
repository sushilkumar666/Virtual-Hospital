import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { patientId } = useParams();
  const [doctor, setDoctor] = useState(null); // Initialize to null to handle loading state

  const fetchDoctorDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/patient/doctorlist/${patientId}`,
        { withCredentials: true }
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

  if (!doctor) {
    return <div>Loading...</div>; // Render loading state if doctor data is not yet available
  }

  return (
    <div>
      <div className="card flex items-center">
        <div className="w-[80vw]">
          <img width={"100%"} src={doctor?.profileImage} alt={doctor?.name} />
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
          <p>
            Description: Doctors diagnose disease, provide treatment, counsel
            patients with injuries, diseases or illnesses. The specific duties
            depend upon the speciality you pursue in your MBBS. Some doctors
            work in cardiology, whereas others may work in surgery, neurology,
            pulmonology or rheumatology.
          </p>

          <div className="mt-5">
            <Link
              className="px-4 py-2 border border-black bg-[#44B678] rounded-lg text-white"
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
