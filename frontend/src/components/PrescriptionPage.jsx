import React, { useState } from "react";

const PrescriptionPage = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    care: "",
    medicines: "",
  });

  const handleChange = (e) => {
    setPrescriptionData({
      ...prescriptionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/prescription", prescriptionData);
      // Handle success (e.g., show success message or redirect)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[90vw] mx-auto border border-black m-4">
        <div className="flex justify-between p-4 ">
          <div className="flex flex-col">
            <div>Dr. lorem ipsum</div>
            <div>Address: </div>
            <div>addess will go here</div>
          </div>
          <div>Date : Feb 2, 2024</div>
        </div>
        <p className="bg-[#0f9015] leading-4">&nbsp;</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2 px-8 text-left">
            <label htmlFor="care">Care to be taken</label>
            <textarea
              className="border mt-2 w-[85vw] border-black"
              id="care"
              rows={8}
              type="text"
              name="care"
              placeholder="Care to be taken"
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="flex flex-col px-8 text-left">
            <label htmlFor="care">Medicines</label>
            <textarea
              className="border mt-2 w-[85vw] border-black"
              id="care"
              rows={8}
              type="text"
              name="care"
              placeholder="Medicines"
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-8 mb-5 bg-[#0f9015] text-white p-2 rounded-lg"
            type="submit"
          >
            Submit Prescription
          </button>
          <p className="bg-[#0f9015] leading-4">&nbsp;</p>
        </form>
      </div>
    </>
  );
};

export default PrescriptionPage;
