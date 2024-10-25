import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const DoctorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    experience: "",
    profileImage: null,
    password: "",
    identity: "doctor",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.specialty) newErrors.specialty = "Specialty is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.experience) newErrors.experience = "Experience is required.";
    if (!formData.profileImage)
      newErrors.profileImage = "Profile image is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/doctor/register",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Custom-Header": "CustomValue",
          },
        }
      );
      console.log("data outside success " + JSON.stringify(data));
      if (data.success) {
        console.log("data " + data);

        const identity = data.data.doctor.identity;
        dispatch(login({ identity }));
        navigate("/doctor/doctorprofile");
      } else {
        console.log("Error while registering doctor");
      }
    } catch (error) {
      console.error(error.response.data);
      setErrors({ general: error.response.data.error });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Doctor's Signup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <span
              className="ml-1 font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-150"
              onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-8 space-y-6 bg-white shadow-lg rounded-lg p-8"
          onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Dr. John Doe"
                onChange={handleChange}
                required
              />
              {errors?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="doctor@example.com"
                onChange={handleChange}
                required
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
              {errors?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 000-0000"
                onChange={handleChange}
                required
              />
              {errors?.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Specialty Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medical Specialty
              </label>
              <input
                type="text"
                name="specialty"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Cardiology"
                onChange={handleChange}
                required
              />
              {errors?.specialty && (
                <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>
              )}
            </div>

            {/* Experience Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.0"
                step="0.1"
                onChange={handleChange}
                required
              />
              {errors?.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            {/* Profile Image Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="profileImage"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {errors?.profileImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profileImage}
                </p>
              )}
            </div>

            {/* Identity Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Identity
              </label>
              <input
                type="text"
                name="identity"
                value="doctor"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                disabled
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150">
              Sign Up
            </button>
          </div>

          {/* General Error Message */}
          {errors?.general && (
            <div className="text-center text-red-600 text-sm mt-2">
              {errors.general}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DoctorSignUp;
