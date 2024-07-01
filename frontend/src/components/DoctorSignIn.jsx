import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function DoctorSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("inside doctor signin");
    e.preventDefault();
    try {
      console.log(formData);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/doctor/login",
        formData,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );
      // console.log("isnde handlesumit");
      // console.log(JSON.stringify(data.data.doctor) + " data value ");
      if (data.success) {
        const identity = data.data.doctor.identity;
        console.log(identity + " this identity value");
        dispatch(login({ identity }));
        navigate("/doctor/doctorprofile");
      } else {
        console.log("error while login patient");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[30vw] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Doctor Sign-in</h2>
      <div className="p-4 ">
        Don't have an account?
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          &nbsp; Sign up
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
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

export default DoctorSignIn;
