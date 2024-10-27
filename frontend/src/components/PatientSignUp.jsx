import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

function PatientSignUp() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
    historyOfSurgery: "",
    historyOfIllness: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    profileImage: "",
    historyOfSurgery: "",
    historyOfIllness: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      age: "",
      email: "",
      phone: "",
      password: "",
      profileImage: "",
      historyOfSurgery: "",
      historyOfIllness: "",
      general: "",
    };

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required.";
      isValid = false;
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = "Age must be a valid number greater than 0.";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    // Profile Image validation
    if (!formData.profileImage) {
      newErrors.profileImage = "Profile picture is required.";
      isValid = false;
    }

    // History of Surgery validation
    if (!formData.historyOfSurgery) {
      newErrors.historyOfSurgery = "History of Surgery is required.";
      isValid = false;
    }

    // History of Illness validation
    if (!formData.historyOfIllness) {
      newErrors.historyOfIllness = "History of Illness is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      console.log(formData[key]);
      formDataToSend.append(key, formData[key]);
    }

    try {
      const { data } = await axios.post(
        "https://virtual-hospital-0gwt.onrender.com/api/v1/patient/register",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",

          },
        }
      );
      console.log(JSON.stringify(data) + " ye hamar adata hai");
      if (data?.user) {
        const identity = data.user.identity;
        dispatch(login({ identity }));
        navigate("/");
      } else {
        console.log("Error while registering patient");
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: error.response.data.error }));
    }
  };
  // console.log(errors);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl">
        {/* Header Section */}
        <div className="border-b border-gray-100">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Patient Sign-up
            </h2>
            <div className="text-sm text-gray-600">
              Already have an account?
              <span
                className="ml-1 text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors duration-200"
                onClick={() => navigate("/login")}>
                Login
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-600 text-center">
                  {errors.general}
                </p>
              </div>
            )}

            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Age Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your age"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical History Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Medical History
              </h3>
              <div className="space-y-6">
                {/* History of Surgery Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    History of Surgery
                  </label>
                  <input
                    type="text"
                    name="historyOfSurgery"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter any previous surgeries"
                  />
                  {errors.historyOfSurgery && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.historyOfSurgery}
                    </p>
                  )}
                </div>

                {/* History of Illness Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    History of Illness
                  </label>
                  <input
                    type="text"
                    name="historyOfIllness"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter medical conditions (separated by ',')"
                  />
                  {errors.historyOfIllness && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.historyOfIllness}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Profile Details
              </h3>
              <div className="space-y-6">
                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors duration-200">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <input
                          accept="image/*"
                          name="profileImage"
                          onChange={handleFileChange}
                          type="file"
                          required
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {errors.profileImage && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.profileImage}
                    </p>
                  )}
                </div>

                {/* Identity Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Identity
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                    value="patient"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientSignUp;
