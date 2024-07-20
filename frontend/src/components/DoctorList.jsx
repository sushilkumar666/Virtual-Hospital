import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function DoctorList() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const limit = 6;
  const search = useSelector((state) => state.search.searchQuery);

  const searchResult = async () => {
    try {
      const { data } = await axios.get(
        `https://virtual-hospital.vercel.app/api/v1/patient/search/${search}`
      );
      console.log(JSON.stringify(data.data) + " this is searched data");
      if (data.success) {
        setDoctors(data.data);
      } else {
        setDoctors([]); // Reset doctors if no results are found
      }
    } catch (error) {
      console.error("Error while searching in frontend part ", error);
    }
  };

  const details = (_id) => {
    navigate(`/patient/doctordetails/${_id}`);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(count / limit)) {
      setPage((nextPage) => nextPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("this is useEffect of fetch doctor");
        const { data } = await axios.get(
          `https://virtual-hospital.vercel.app/api/v1/patient/doctorlist/${page}`,
          {
            withCredentials: true,
            headers: {
              "Custom-Header": "CustomValue",
            },
          }
        );
        console.log("this is useEffect of fetch doctor");
        setDoctors(data.data.doctorList);
        setCount(data.data.count);
      } catch (error) {
        console.error("Error while fetching doctors data", error);
      }
    };

    if (search) {
      searchResult();
    } else {
      fetchDoctors();
    }
  }, [page, search]); // Ensure dependencies are correct

  return (
    <>
      <div className="flex justify-between p-4 mx-4">
        <button
          className={`bg-green-600 ${
            page <= 1 ? "bg-green-300" : ""
          } text-white p-2 rounded-sm`}
          onClick={handlePrevPage}
          disabled={page <= 1} // Disable button when not applicable
        >
          Previous
        </button>
        <button
          className={`bg-green-600 ${
            page >= Math.ceil(count / limit) ? "bg-green-300" : ""
          } text-white px-6 rounded-sm`}
          onClick={handleNextPage}
          disabled={page >= Math.ceil(count / limit)} // Disable button when not applicable
        >
          Next
        </button>
      </div>
      <div>
        <div className="mx-auto flex flex-wrap justify-evenly">
          {doctors?.map((doctor) => (
            <div key={doctor._id} className="px-3 mx-auto flex flex-wrap">
              <div className="w-[350px] card m-5 rounded-3xl border border-gray cursor-pointer p-4">
                <img width={"300px"} src={doctor.profileImage} alt="doctor" />
                <div className="text-center">
                  <div className="text-lg font-semibold">{doctor.name}</div>
                  <div>{doctor.speciality}</div>
                  <div>Experience: {doctor.experience}</div>
                  <div>{doctor.speciality}</div>
                  <div
                    onClick={() => details(doctor._id)}
                    className="border mx-auto border-gray text-white w-[100px] bg-green-500 text-center rounded-full font-semibold cursor-pointer mt-2 hover:border-2 py-2"
                  >
                    Details
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorList;
