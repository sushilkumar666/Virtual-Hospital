import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsColumnsGap } from "react-icons/bs";

function PatientProfile() {
  const [user, setUser] = useState({}); // Initialize to null to handle loading state
  const [isEdit, setIsEdit] = useState(true);
  const identity = useSelector((state) => state.auth.identity);
  console.log(identity + "idnentity vlaue");

  const fetchuserDetails = async () => {
    try {
      let data;
      data = await axios.get(`http://localhost:8000/api/v1/patient/profile`, {
        withCredentials: true,
        "Custom-Header": "CustomValue",
      });
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
        "http://localhost:8000/api/v1/patient/editDetails",
        user,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      console.log(data);
      if (data.success) {
        console.log(data + "doctor's data updated successfully");
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formSubmit}
        className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3 p-6 bg-gray-50">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  src={user?.profileImage}
                  alt={user?.name}
                />
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none"
                    value={user?.name}
                    type="text"
                    name="name"
                    disabled={true}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                    onChange={handleChange}
                    value={user?.email}
                    type="email"
                    disabled={isEdit}
                    name="email"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                    onChange={handleChange}
                    value={user?.phone}
                    type="tel"
                    disabled={isEdit}
                    name="phone"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[12rem] resize-y disabled:bg-gray-100"
                    onChange={handleChange}
                    maxLength="1500"
                    name="description"
                    disabled={isEdit}
                    value={user?.description || ""}
                  />
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    type={isEdit ? "button" : "submit"}
                    onClick={() => setIsEdit((prev) => !prev)}
                    className="w-full md:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
                    {isEdit ? "Edit" : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PatientProfile;
