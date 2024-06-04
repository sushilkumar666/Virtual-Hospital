// components/DoctorSignUp.js
import React, { useState } from "react";
import axios from "axios";

const DoctorSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    profilePicture: "",
    password: "",
    identity: "doctor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);
    // You can add your axios call or other logic here to submit the form data
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="specialty"
            className="w-full border p-2 rounded"
            placeholder="Specialty"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full border p-2 rounded"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            step="0.1"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History of Surgery</label>
          <input
            type="file"
            name="profilePicture"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, profilePicture: e.target.files[0] })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History of Illness</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">identity</label>
          <input
            type="text"
            name="password"
            placeholder="identity"
            value={"doctor"}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default DoctorSignUp;
