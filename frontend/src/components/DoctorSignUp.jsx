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
    phoneNumber: "",
    yearsOfExperience: "",
    profileImage: "",
    password: "",
    identity: "doctor",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/doctor/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Custom-Header": "CustomValue",
          },
        }
      );
      console.log(data);
      if (data.success) {
        console.log("sign up success");
        navigate("/doctor/doctorprofile");
        const identity = data.data.user.identity;
        dispatch(login({ identity }));
      } else {
        console.log("error while registering doctor");
      }
    } catch (error) {
      console.error(error.response.data);
    }

    // You can add your axios call or other logic here to submit the form data
  };

  return (
    <>
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
          className="w-[30vw] mb-10 mx-auto border border-gray p-4 text-left"
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, profileImage: e.target.files[0] })
              }
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
              disabled
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
      </div>
    </>
  );
};

export default DoctorSignUp;
