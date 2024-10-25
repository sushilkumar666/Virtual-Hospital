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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/3 bg-gray-50 p-6">
            <div className="aspect-square overflow-hidden rounded-xl shadow-md">
              <img
                className="w-full h-full object-cover"
                src={doctor?.profileImage}
                alt={doctor?.name}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-2/3 p-8">
            {/* Name and Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Dr. {doctor?.name}
              </h2>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {doctor?.specialty}
                </span>
                <span className="ml-3 text-sm text-gray-500">
                  {doctor?.experience} years experience
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{doctor?.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{doctor?.phone}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 leading-relaxed">
                {doctor?.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Link
                to={`/patient/consultationform/${doctor?._id}`}
                className="inline-flex items-center px-6 py-3 border border-transparent 
                         text-base font-medium rounded-lg shadow-sm text-white 
                         bg-green-600 hover:bg-green-700 
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
