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
        `https://virtual-hospital-0gwt.onrender.com/api/v1/patient/search/${search}`
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
          `https://virtual-hospital-0gwt.onrender.com/api/v1/patient/doctorlist/${page}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("this is useEffect of fetch doctor" + data);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="relative mb-6">
                  <div className="w-48 h-40 bg-white mx-auto rounded-full overflow-hidden bg-gray-100">
                    <img
                      className="w-auto h-48 mx-auto  object-cover transform transition duration-300 hover:scale-105"
                      src={doctor.profileImage}
                      alt={`Dr. ${doctor.name}`}
                    />
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    Dr. {doctor.name}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-blue-600 font-medium">
                      {doctor.speciality}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <span className="text-sm">Experience:</span>
                      <span className="font-medium">
                        {doctor.experience} years
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => details(doctor._id)}
                    className="mt-4 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg 
                    hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200
              ${page <= 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            onClick={handlePrevPage}
            disabled={page <= 1}>
            Previous Page
          </button>

          <div className="flex items-center">
            <span className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium">
              Page {page} of {Math.ceil(count / limit)}
            </span>
          </div>

          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200
              ${page >= Math.ceil(count / limit)
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            onClick={handleNextPage}
            disabled={page >= Math.ceil(count / limit)}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
