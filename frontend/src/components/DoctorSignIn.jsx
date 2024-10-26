import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

function DoctorSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataValue = useSelector((state) => state.auth.identity);
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
        "https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Custom-Header": "CustomValue",
          },
        }
      );
      // console.log("isnde handlesumit");
      // console.log(JSON.stringify(data.data.doctor) + " data value ");
      console.log(data, "data coming from dr login");
      if (data.success) {
        console.log(JSON.stringify(data));

        const identity = data.data.doctor.identity;

        console.log(identity + " this identity value");
        dispatch(login({ identity: identity }));
        console.log(dataValue + " value of data vlue");
        navigate("/doctor/doctorprofile");
        // navigate("/dummy");
      } else {
        console.log("error while login patient");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Sign in to your doctor account
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors focus:outline-none focus:underline">
                Create one now
              </button>
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors focus:outline-none focus:underline">
                Forgot your password?
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-colors duration-200">
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-colors duration-200">
                <span className="sr-only">Sign in with Google</span>
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-colors duration-200">
                <span className="sr-only">Sign in with Microsoft</span>
                Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSignIn;
