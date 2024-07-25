// components/ConsultationForm.js
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ConsultationForm = () => {
  const { doctorId } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    currentIllnessHistory: "",
    diabeticOrNot: "",
    recentSurgery: "",
    allergies: "",
    others: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData) + " this form data");
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/patient/consult/${doctorId}`,
        formData,
        { withCredentials: true }
      );
      //   console.log(
      //     data.data.name + " data returned aftr consultation for submitted"
      //   );
      // Handle success (e.g., redirect to doctor's profile)
      console.log(JSON.stringify(data) + " form data that reutrn from backedn");
      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your form has been submitted. soon the doctor will connect with you.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <div className="flex flex-col border border-black w-[80vw] mx-auto my-4 p-4">
            <div className="w-[70vw] mx-auto">
              <p className="text-left mb-2">Current illness History</p>
              <textarea
                rows={"6"}
                className="border border-black max-w-[70vw] h-32 p-2 "
                cols={"100"}
                type="text"
                name="currentIllnessHistory"
                placeholder="Current Illness History"
                onChange={handleChange}
                required
              />{" "}
              <br />
            </div>
            <div className="w-[70vw] mx-auto">
              <p className="text-left mt-4 mb-2">Recent Surgery</p>
              <textarea
                rows={"6"}
                className="border border-black max-w-[70vw]"
                cols={"100"}
                type="text"
                name="recentSurgery"
                placeholder="Recent Surgery"
                onChange={handleChange}
              />
            </div>

            <div className="mt-5">
              <button
                className="px-4 py-2 rounded-lg bg-green-500"
                type="button"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="flex flex-col w-[80vw] border border-black px-10 mx-auto my-10 text-left">
            <div className="mt-5">
              <div className="mt-5">
                <label>
                  <input
                    type="radio"
                    name="diabeticOrNot"
                    value="Diabetics"
                    onChange={handleChange}
                    required
                  />{" "}
                  Diabetics
                </label>
              </div>
              <div className="mt-5">
                <label>
                  <input
                    type="radio"
                    name="familyMedicalHistory"
                    value="Non-Diabetics"
                    onChange={handleChange}
                    required
                  />{" "}
                  Non-Diabetics
                </label>
              </div>
            </div>
            <div className="mt-5">
              <p className="flex flex-col">
                {" "}
                Allergies &nbsp;{" "}
                <textarea
                  cols={80}
                  className="border border-black max-w-[70vw]"
                  rows={6}
                  type="text"
                  name="allergies"
                  placeholder="Allergies"
                  onChange={handleChange}
                  required
                />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex flex-col">
                {" "}
                Others &nbsp; &nbsp; &nbsp;
                <textarea
                  className="border border-black max-w-[70vw]"
                  cols={80}
                  rows={6}
                  type="text"
                  name="others"
                  placeholder="Others"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex mx-auto  my-8">
              <div className=" flex gap-10">
                <div>
                  <button
                    className="bg-green-500 px-4   py-2  rounded-lg"
                    type="button"
                    onClick={handlePrevStep}
                  >
                    Previous
                  </button>
                </div>
                <div>
                  <button
                    className="bg-green-500 px-7  py-2 rounded-lg"
                    type="button"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="flex flex-col md:flex-row  border mt-20 border-black p-4 justify-evenly items-center w-[80vw] mx-auto">
            <div>
              <img
                width={"200px"}
                src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
                alt="QR code"
              />
            </div>
            <div className="text-left ml-8 mt-8">
              <p className="my-2"> Transaction Id: &nbsp;</p>
              <input
                type="text"
                name="transactionId"
                placeholder="Transaction ID"
                onChange={handleChange}
                required
                className="border border-black w-"
              />
              {/* QR Code for payment can be displayed here */}
            </div>
          </div>

          <div className="flex mx-auto       my-8">
            <div className=" mx-auto">
              <button
                className="bg-green-500 px-4 mx-6 py-2  rounded-lg"
                type="button"
                onClick={handlePrevStep}
              >
                Previous
              </button>

              <button
                className="bg-green-500 px-4 mx-6 py-2  rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default ConsultationForm;
