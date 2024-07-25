import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState({}); // Initialize to null to handle loading state
  const identity = useSelector((state) => state.auth.identity);
  console.log(identity + "idnentity vlaue");

  const fetchuserDetails = async () => {
    try {
      let data;
      identity == "doctor"
        ? (data = await axios.get(
            `http://localhost:8000/api/v1/doctor/profile`,
            { withCredentials: true, "Custom-Header": "CustomValue" }
          ))
        : (data = await axios.get(
            `http://localhost:8000/api/v1/patient/profile`,
            { withCredentials: true, "Custom-Header": "CustomValue" }
          ));
      setUser(data.data.data);
      console.log(data.data.data.name + " this is the value of data.data");
      //   console.log(data.name + " this is the value of data");

      console.log(data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error (e.g., set error state)
    }
  };

  useEffect(() => {
    const getuserDetails = async () => {
      await fetchuserDetails();
    };
    getuserDetails();
  }, []);
  return (
    <div>
      <div className="card  md:flex  items-center">
        <div className="md:mr-10 ">
          <img
            width={"100%"}
            className="w-[60vw] md:w-[100%] mx-auto mb-4"
            src={user?.profileImage}
            alt={user?.name}
          />
        </div>
        <div className="text-left">
          <p className="text-4xl ">r.&nbsp;{user?.name}</p>
          <p>
            Specialty: <span>{user?.specialty}</span>
          </p>
          <p>
            Experience: <span>{user?.experience}</span>
          </p>
          <p>
            Email: <span>{user?.email}</span>
          </p>
          <p>
            Phone: <span>{user?.phone}</span>
          </p>
          <p>
            Description: users diagnose disease, provide treatment, counsel
            patients with injuries, diseases or illnesses. The specific duties
            depend upon the speciality you pursue in your MBBS. Some users work
            in cardiology, whereas others may work in surgery, neurology,
            pulmonology or rheumatology.
          </p>

          <div className="my-5 mx-auto mb-10">
            <Link
              className="px-4  py-2 border border-black bg-green-500 rounded-lg text-white"
              to={`/patient/consultationform/${user?._id}`}
            >
              Consult
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
