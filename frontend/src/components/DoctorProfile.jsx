import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsColumnsGap } from "react-icons/bs";
import { BACKEND_URL } from "../config";

function DoctorProfile() {
  const [user, setUser] = useState({}); // Initialize to null to handle loading state
  const [isEdit, setIsEdit] = useState(true);
  const identity = useSelector((state) => state.auth.identity);
  console.log(identity + "idnentity vlaue");

  const fetchuserDetails = async () => {
    try {
      console.log("check1");
      let data = await axios.get(
        `${BACKEND_URL}/api/v1/doctor/profile`,
        {
          withCredentials: true,
          "Custom-Header": "CustomValue",
        }
      );

      setUser(data.data.data);
      console.log("check2");
      console.log(data.data.data.name + " this is the value of data.data");
      //   console.log(data.name + " this is the value of data");
      console.log("check3");
      console.log(data.data + " this is my check for doctor detail data");
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
        `${BACKEND_URL}/api/v1/doctor/editDetails`,
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 ">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={formSubmit}>
          <div className="bg-white text-left px-8 rounded-xl shadow-lg overflow-hidden">
            <div className="md:grid md:grid-cols-[20%_80%] md:gap-8">
              {/* Profile Image Section */}
              <div className="  bg-gray-50 p-6">
                <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={user?.profileImage}
                    alt={user?.name}
                    className="w-auto h-[300px] object-cover"
                  />
                </div>
              </div>

              {/* Profile Details Section */}
              <div className="p-8">
                <div className="space-y-6 ">
                  {/* Name Field */}
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      Dr.
                    </span>

                    <div className="text-4xl font-bold text-gray-900 bg-transparent border-none">{user?.name}</div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    {/* Specialty Field */}
                    <div className="grid   gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">
                        Specialty
                      </label>
                      <input
                        className="col-span-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                        onChange={handleChange}
                        value={user?.specialty}
                        type="text"
                        disabled={isEdit}
                        name="specialty"
                      />
                    </div>

                    {/* Experience Field */}
                    <div className="grid gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <input
                        className="col-span-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                        onChange={handleChange}
                        value={user?.experience}
                        type="number"
                        disabled={isEdit}
                        name="experience"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="grid  gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        className="col-span-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                        onChange={handleChange}
                        value={user?.email}
                        type="email"
                        disabled={isEdit}
                        name="email"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="grid  gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        className="col-span-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                        onChange={handleChange}
                        value={user?.phone}
                        type="tel"
                        disabled={isEdit}
                        name="phone"
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      className="w-full h-[100px] px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 resize-none"
                      onChange={handleChange}
                      maxLength="1000"
                      name="description"
                      disabled={isEdit}
                      value={user?.description || ""}
                      placeholder="Enter your professional description..."
                    />
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    {isEdit ? (
                      <button
                        onClick={() => setIsEdit((prev) => !prev)}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={() => setIsEdit((prev) => !prev)}
                        className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                        Update Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorProfile;
