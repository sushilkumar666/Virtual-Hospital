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

  // console.log(state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("isnde handlesumit");
      console.log(data.data);
      if (data.success) {
        console.log(data.data.user.identity);
        const identity = data.data.user.identity;
        dispatch(login({ identity: identity }));
        navigate("/");
      } else {
        console.log("error while login patient");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[30vw] mx-auto">
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
