import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

function PatientSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const state = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be 8 characters or more.";
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

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/patient/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        const identity = data.data.user.identity;
        dispatch(login({ identity: identity }));
        navigate("/");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Invalid Credentials",
        }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Invalid Credentials",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Patient Sign-in
          </h2>
          <div className="mt-4 text-sm text-gray-600">
            Don't have an account?
            <span
              className="ml-1 text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors duration-200"
              onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </div>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm
                         placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-colors duration-200"
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm
                         placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-colors duration-200"
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 
                       text-white font-medium shadow-sm transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientSignIn;
