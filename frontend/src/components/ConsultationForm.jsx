// components/ConsultationForm.js
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";

const ConsultationForm = () => {
  const { doctorId } = useParams();
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    currentIllness: "",
    diabeticOrNot: "",
    historyOfSurgery: "",
    recentSurgery: "",
    allergies: "",
    others: "",
    transactionId: ""
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep = () => {
    let newErrors = {};
    console.log("inside validate step")
    if (step === 1) {
      console.log("i am going int ostep 1")
      if (!formData.currentIllness) newErrors.currentIllness = "Required";
      if (!formData.recentSurgery) newErrors.recentSurgery = "Required";
    }

    if (step === 2) {
      if (!formData.historyOfSurgery) newErrors.historyOfSurgery = "Required";
      if (!formData.diabeticOrNot) newErrors.diabeticOrNot = "Required";
    }

    if (step === 3) {
      if (!formData.allergies) newErrors.allergies = "Required";
      if (!formData.others) newErrors.others = "Required";
    }

    if (step === 4) {
      if (!formData.transactionId) newErrors.transactionId = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) { setStep((prev) => prev + 1) };
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {

    setLoading(true);
    // e.preventDefault();
    console.log(JSON.stringify(formData) + " this form data");
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/record/createRecord/${doctorId}`,
        formData,
        { withCredentials: true }
      );
      //   console.log(
      //     data.data.name + " data returned aftr consultation for submitted"
      //   );
      // Handle success (e.g., redirect to doctor's profile)
      console.log(JSON.stringify(data) + " form data that reutrn from backedn");
      if (data.success) {
        setLoading(false);
        Swal.fire({
          title: "Success!",
          text: "Your form has been submitted. soon the doctor will connect with you.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };


  const [order, setOrder] = useState(null);

  const createOrder = async () => {
    const response = await fetch(`${BACKEND_URL}/api/v1/payment/order`, {
      method: "POST",
      credentials: "include", // Cookies ko include karne ke liye
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ amount: 1, currency: "INR" }),
    });
    const data = await response.json();
    setOrder(data.order);
    setFormData((prev) => ({ ...prev, transactionId: data.dbOrder._id }));
    console.log(formData.transactionId + " this is value of trasacnto id");
  };

  const payNow = async () => {

    let { data } = await axios.get(
      `${BACKEND_URL}/api/v1/patient/profile`,
      {
        withCredentials: true,
        "Custom-Header": "CustomValue",
      }
    );

    console.log(data)
    const options = {
      key: "rzp_test_GuwOwWZNaYQQkA",
      amount: order.amount,
      currency: order.currency,
      name: "Virtual Hospital",
      description: "Medical Payment",
      order_id: order.id,
      handler: async function (response) {
        console.log("Payment Started, waiting for webhook...");
        handleSubmit();
      },
      prefill: { name: data.data.name, email: data.data.email, phone: data.data.phone },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  return (
    <form
      // onSubmit={handleSubmit}
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
                  Current Illness
                </label>
                <textarea
                  rows="6"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  name="currentIllness"
                  value={formData.currentIllness}
                  placeholder="Please describe your current medical condition..."
                  onChange={handleChange}
                  required
                />
                {errors.currentIllness && <p className="text-red-500 text-sm">{errors.currentIllness}</p>}
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
                  value={formData.recentSurgery}
                  required
                />
                {errors.recentSurgery && <p className="text-red-500 text-sm">{errors.recentSurgery}</p>}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNextStep}

                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
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
              Medical History
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  History of Surgery
                </label>
                <textarea
                  rows="6"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  name="historyOfSurgery"
                  placeholder="Please describe your current medical condition..."
                  onChange={handleChange}
                  value={formData.historyOfSurgery}
                  required
                />
                {errors.historyOfSurgery && <p className="text-red-500 text-sm">{errors.historyOfSurgery}</p>}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 block">
                  Diabetes Status
                </label>
                <div className="flex items-center ">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="diabeticOrNot"
                        value="Diabetics"
                        onChange={handleChange}
                        required
                        checked={formData.diabeticOrNot === "Diabetics"}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Diabetic</span>
                    </label>
                  </div>
                  <div className="pl-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="diabeticOrNot"
                        value="Non-Diabetics"
                        onChange={handleChange}
                        checked={formData.diabeticOrNot === "Non-Diabetics"}
                        required
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Non-Diabetic</span>
                    </label>
                  </div>
                </div>
                {errors.diabeticOrNot && <p className="text-red-500 text-sm">{errors.diabeticOrNot}</p>}
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
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Medical Conditions
            </h2>

            <div className="space-y-6">


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
                  value={formData.allergies}
                  required
                />
                {errors.allergies && <p className="text-red-500 text-sm">{errors.allergies}</p>}
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
                  value={formData.others}
                  required
                />
                {errors.others && <p className="text-red-500 text-sm">{errors.others}</p>}
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

      {step === 4 && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Payment Information
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  className="max-w-full max-h-full"
                  src="/api/placeholder/200/200"
                  alt="QR code for payment"
                />
              </div> */}


              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  placeholder="autofill formsubmit"
                  onChange={handleChange}
                  value={formData.transactionId}
                  required
                  disabled
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-center">
              {!order && <div className="bg-blue-600 mt-10 text-white px-4 py-3 cursor-pointer rounded-lg" onClick={createOrder}>Submit Form</div>}
              {order && <div className="bg-green-600 mt-10 text-white cursor-pointer px-4 py-3 rounded-lg" onClick={payNow}>Pay Now</div>}
            </div>

            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                Previous
              </button>
              {/* <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                {loading ? "processing..." : "Submit Form"}
              </button> */}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ConsultationForm;
