import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsColumnsGap } from "react-icons/bs";

function DoctorProfile() {
  const [user, setUser] = useState({}); // Initialize to null to handle loading state
  const [isEdit, setIsEdit] = useState(true);
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editDetails = async (user) => {
    try {
      let { data } = await axios.put(
        "http://localhost:8000/api/v1/doctor/editDetails",
        user,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      console.log(data);
      if (data.success) {
        console.log("doctor's data updated successfully");
      }
    } catch (error) {
      console.log("error while update doctor's detail " + error);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    editDetails(user);
  };

  useEffect(() => {
    const getuserDetails = async () => {
      await fetchuserDetails();
    };
    getuserDetails();
  }, []);
  return (
    <div>
      <form onSubmit={formSubmit}>
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
            {/* <p className="text-4xl ">Dr.&nbsp;{user?.name}</p> */}
            <p>
              <span className="text-4xl md:w-[100vw]"> Dr. </span>
              <input
                className="text-4xl w-[100vw]"
                value={user?.name}
                type="text"
                name="name"
                disabled="true"
              />
            </p>
            {/* <p>
            Specialty: <span>{user?.specialty}</span>
          </p> */}
            Specialty:{" "}
            <input
              onChange={handleChange}
              value={user?.specialty}
              type="text"
              disabled={isEdit}
              name="specialty"
            />
            {/* <p>
            Experience: <span>{user?.experience}</span>
          </p> */}
            <p>
              Experience:{" "}
              <input
                onChange={handleChange}
                value={user?.experience}
                type="number"
                disabled={isEdit}
                name="experience"
              />
            </p>
            {/* <p>
            Email: <span>{user?.email}</span>
          </p> */}
            <p>
              Email:{" "}
              <input
                onChange={handleChange}
                value={user?.email}
                type="email"
                disabled={isEdit}
                name="email"
              />
            </p>
            <p>
              Phone:{" "}
              <input
                onChange={handleChange}
                value={user?.phone}
                type="mobile"
                disabled={isEdit}
                name="phone"
              />
            </p>
            Description:{" "}
            <p>
              <textarea
                className="w-full md:w-3/4 lg:w-1/2 h-32 md:h-48 lg:h-64 p-4 resize-y border rounded-lg focus:outline-none"
                cols="100"
                rows="6"
                onChange={handleChange}
                maxLength="1500"
                name="description"
                disabled={isEdit}
                value={user?.description || ""}
              />
            </p>
            <div className="my-5 mx-auto mb-10">
              {/* <Link
                className="px-4  py-2 border border-black bg-green-500 rounded-lg text-white"
                to={`/doctor/editDetails`}
              > */}
              {isEdit ? (
                <button
                  onClick={() => setIsEdit((prev) => !prev)}
                  className="px-4  py-2 border border-black bg-green-500 rounded-lg text-white"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit((prev) => !prev)}
                  className="px-4  py-2 border border-black bg-green-500 rounded-lg text-white"
                >
                  update
                </button>
              )}
              {/* </Link> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DoctorProfile;
