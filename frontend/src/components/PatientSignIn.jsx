import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PatientSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/patient/login",
        formData,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      console.log("isnde handlesumit");
      console.log(data);
      if (data.success) {
        navigate("/");
      } else {
        console.log("error while registering patient");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[30vw] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Patient Sign-in</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default PatientSignIn;
