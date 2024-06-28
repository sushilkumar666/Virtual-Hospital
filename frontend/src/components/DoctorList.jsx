import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function DoctorList() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const limit = 6;
  const state = useSelector((state) => state.auth);
  const search = useSelector((state) => state.search.searchQuery);

  useEffect(() => {
    console.log(search + " this is squery value");
    searchResult();
  }, [search]);

  const searchResult = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/patient/search/${search}`
      );
      console.log(JSON.stringify(data.data) + " this is searched data");
      if (data.success && data.data.length) {
        setDoctors(data.data);
      }
    } catch (error) {
      throw new Error("Error while searching in frontend part " + error);
    }
  };

  const details = (_id) => {
    navigate(`/patient/doctordetails/${_id}`);
  };

  const handleNextPage = () => {
    if (page <= count / limit) {
      setPage((nextPage) => nextPage + 1);
    }

    console.log(page);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      console.log(page);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/patient/doctorlist/${page}`,
          { withCredentials: true, "Custom-Header": "CustomValue" }
        );
        setDoctors(data.data.doctorList);
        setCount(data.data.count);
      } catch (error) {
        console.log("error while fetching doctors data");
        console.error(error);
      }
    };
    fetchDoctors();
  }, [page]);

  return (
    <>
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
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
