import React from "react";
import { useState } from "react";

function PatientSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    profileImage: "",
    historyOfSurgery: "",
    historyOfIllness: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const res = await axios.post("/api/v1/auth/doctor/signup", formData);
      console.log(formData);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg w-[30vw] mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Patient Sign-up</h2>
      <form className="text-left" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            accept="image/*"
            name="profileImage"
            onChange={(e) =>
              setFormData({ ...formData, profileImage: e.target.files[0] })
            }
            type="file"
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Age"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History of Surgery</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, historyOfSurgery: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="History of Surgery"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">History of Illness</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, historyOfIllness: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="History of Illness (separated by ',')"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">identity</label>
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
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default PatientSignUp;
