import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function DoctorList() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const state = useSelector((state) => state.auth);
  console.log(state);
  const details = (_id) => {
    navigate(`/patient/doctordetails/${_id}`);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/patient/doctorlist",
          { withCredentials: true, "Custom-Header": "CustomValue" }
        );
        setDoctors(data.data);
        console.log(typeof data, "res data", data.data);
      } catch (error) {
        console.log("error while fetching doctors data");
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <div>
        <div className="mx-auto flex flex-wrap  justify-evenly">
          {doctors?.map((doctor) => {
            return (
              <div key={doctor._id} className=" px-3    mx-auto flex flex-wrap">
                <div className="w-[350px] card m-5 rounded-3xl  border border-gray cursor-pointer  p-4">
                  <img width={"300px"} src={doctor.profileImage} alt="doctor" />

                  <div className="text-center">
                    <div className="text-lg font-semibold">{doctor.name}</div>
                    <div>{doctor.speciality}</div>
                    <div>
                      Experience: &nbsp;
                      {doctor.experience}
                    </div>
                    <div>{doctor.speciality}</div>
                    <div
                      onClick={() => details(doctor._id)}
                      className="border mx-auto border-gray text-white w-[100px] bg-green-500  text-center rounded-full font-semibold cursor-pointer mt-2 hover:border-2  py-2"
                    >
                      Details
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DoctorList;
