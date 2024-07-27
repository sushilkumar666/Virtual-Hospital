import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const UpdateDoctorProfile = () => {
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

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/doctor/updateProfile",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Custom-Header": "CustomValue",
          },
        }
      );

      if (data.success) {
        const identity = data.data.user.identity;
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
    <div>
      <div className="text-2xl p-4 text-blue-700">Doctor's Signup</div>
      <div className="p-4">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          &nbsp; Login
        </span>
      </div>
      <form
        className="w-[90vw] md:w-[30vw] mb-10 mx-auto border border-gray p-4 text-left"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full border p-2 rounded"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="text-red-500">{errors.phone}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Specialty</label>
          <input
            type="text"
            name="specialty"
            className="w-full border p-2 rounded"
            placeholder="Specialty"
            onChange={handleChange}
            required
          />
          {errors.specialty && (
            <div className="text-red-500">{errors.specialty}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Experience</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            name="experience"
            placeholder="Years of Experience"
            step="0.1"
            onChange={handleChange}
            required
          />
          {errors.experience && (
            <div className="text-red-500">{errors.experience}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            className="w-full border p-2 rounded"
            onChange={handleFileChange}
            required
          />
          {errors.profileImage && (
            <div className="text-red-500">{errors.profileImage}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Identity</label>
          <input
            type="text"
            name="identity"
            value={"doctor"}
            className="w-full border p-2 rounded"
            disabled
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mb-10 bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
        {errors.general && <div className="text-red-500">{errors.general}</div>}
      </form>
    </div>
  );
};

export default UpdateDoctorProfile;
