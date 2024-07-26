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
      formDataToSend.append(key, formData[key]);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/patient/register",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Custom-Header": "CustomValue",
          },
        }
      );
      console.log(JSON.stringify(data) + " ye hamar adata hai");
      if (data.success) {
        const identity = data.data.user.identity;
        dispatch(login({ identity }));
        navigate("/");
      } else {
        console.log("Error while registering patient");
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: error.response.data.error }));
    }
  };
  console.log(errors);
  return (
    <div className="bg-white p-6 rounded-lg md:w-[30vw] w-[90vw] mx-auto shadow-lg">
      <div className="p-4">
        Already have an account?
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          &nbsp; Login
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-4">Patient Sign-up</h2>
      <form className="text-left" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="text-red-600 text-center text-sm mt-1">
            {errors.general}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Name"
          />
          {errors.name && (
            <div className="text-red-600 text-sm mt-1">{errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
          {errors.email && (
            <div className="text-red-600 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-600 text-sm mt-1">{errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Age"
          />
          {errors.age && (
            <div className="text-red-600 text-sm mt-1">{errors.age}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History of Surgery</label>
          <input
            type="text"
            name="historyOfSurgery"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="History of Surgery"
          />
          {errors.historyOfSurgery && (
            <div className="text-red-600 text-sm mt-1">
              {errors.historyOfSurgery}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History of Illness</label>
          <input
            type="text"
            name="historyOfIllness"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="History of Illness (separated by ',')"
          />
          {errors.historyOfIllness && (
            <div className="text-red-600 text-sm mt-1">
              {errors.historyOfIllness}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            accept="image/*"
            name="profileImage"
            onChange={handleFileChange}
            type="file"
            className="w-full border p-2 rounded"
          />
          {errors.profileImage && (
            <div className="text-red-600 text-sm mt-1">
              {errors.profileImage}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Identity</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="patient"
            value={"patient"}
            disabled
          />
        </div>
        <button
          type="submit"
          className="w-full mb-10 bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default PatientSignUp;
