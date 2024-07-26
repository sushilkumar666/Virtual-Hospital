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
    <div className="bg-white p-6 rounded-lg shadow-lg md:w-[30vw] w-[90vw] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Patient Sign-in</h2>
      <div className="p-4">
        Don't have an account?
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          &nbsp;Sign up
        </span>
      </div>
      {errors.general && (
        <div className="border text-[12px] border-none text-red-600 text-center">
          {errors.general}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col">
          <label className="block text-left text-gray-700">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
          {errors.email && (
            <div className="border text-[11px] border-none text-red-600 text-left">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block text-left text-gray-700">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            className="w-full border p-2 rounded"
            placeholder="Password"
          />
          {errors.password && (
            <div className="border text-[11px] border-none text-red-600 text-left">
              {errors.password}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 mb-8 text-white p-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default PatientSignIn;
