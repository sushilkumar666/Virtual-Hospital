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
        `https://virtual-hospital-0gwt.onrender.com/api/v1/patient/consult/${doctorId}`,
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
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gray-50 py-8">
      {step === 1 && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Medical History
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Illness History
                </label>
                <textarea
                  rows="6"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  name="currentIllnessHistory"
                  placeholder="Please describe your current medical condition..."
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recent Surgery
                </label>
                <textarea
                  rows="6"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  name="recentSurgery"
                  placeholder="List any surgeries in the past year..."
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Next Step
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Medical Conditions
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 block">
                  Diabetes Status
                </label>
                <div className="space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="diabeticOrNot"
                      value="Diabetics"
                      onChange={handleChange}
                      required
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Diabetic</span>
                  </label>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="familyMedicalHistory"
                        value="Non-Diabetics"
                        onChange={handleChange}
                        required
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Non-Diabetic</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  rows="4"
                  name="allergies"
                  placeholder="List any known allergies..."
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  rows="4"
                  name="others"
                  placeholder="Any other relevant medical information..."
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Next Step
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Payment Information
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  className="max-w-full max-h-full"
                  src="/api/placeholder/200/200"
                  alt="QR code for payment"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  placeholder="Enter transaction ID"
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                Previous
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Submit Form
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ConsultationForm;
