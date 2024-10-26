import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PrescriptionPage = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    care: "",
    medicines: "",
  });
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [user, setUser] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  const generatePDF = async () => {
    const input = document.getElementById("formData");
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = 210;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const xOffset = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
      const yOffset = 20; // Top offset for better spacing

      pdf.addImage(imgData, "PNG", xOffset, yOffset, pdfWidth, pdfHeight);
      // pdf.save("formData.pdf");

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, "prescription.pdf");
      axios
        .post(
          `https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/upload/${patientId}`,
          formData,
          {
            withCredentials: true,
            "Custom-Header": "CustomValue",
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setPrescriptionData({
              care: "",
              medicines: "",
            });

            Swal.fire({
              title: "Success!",
              text: "Get Well Soon!",
              icon: "success",
              confirmButtonText: "OK",
            });

            navigate("/");
          }
        });
    });
  };

  const handleChange = (e) => {
    setPrescriptionData({
      ...prescriptionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(prescriptionData);
    generatePDF();
  };

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/profile`,
        { withCredentials: true, "Custom-Header": "CustomValue" }
      );

      setUser(data.data);
      console.log(JSON.stringify(data.data) + " this is vlaue of data.data");
      console.log(data.data.name + " this is the value of data.data");
      //   console.log(data.name + " this is the value of data");

      console.log(data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error (e.g., set error state)
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return today.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div
            id="formData"
            className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="border-b border-gray-200">
              <div className="px-8 py-6 flex justify-between items-start">
                {/* Doctor/Patient Info */}
                <div className="space-y-2">
                  <div className="text-xl font-semibold text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {user.phone}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">{currentDate}</span>
                </div>
              </div>
            </div>

            {/* Accent Line */}
            <div className="h-1 bg-gradient-to-r from-green-500 to-green-600"></div>

            {/* Form Content */}
            <div className="px-8 py-6 space-y-8">
              {/* Care Instructions */}
              <div className="space-y-2">
                <label
                  htmlFor="care"
                  className="block text-sm font-medium text-gray-700">
                  Care Instructions
                </label>
                <textarea
                  id="care"
                  name="care"
                  rows={6}
                  value={prescriptionData.care}
                  onChange={handleChange}
                  placeholder="Enter detailed care instructions..."
                  required
                  className="w-full rounded-lg border border-gray-300 shadow-sm 
                           focus:ring-2 focus:ring-green-500 focus:border-green-500
                           placeholder:text-gray-400 p-4 text-gray-900
                           transition-colors duration-200"
                />
              </div>

              {/* Medicines */}
              <div className="space-y-2">
                <label
                  htmlFor="medicines"
                  className="block text-sm font-medium text-gray-700">
                  Prescribed Medicines
                </label>
                <textarea
                  id="medicines"
                  name="medicines"
                  rows={6}
                  value={prescriptionData.medicines}
                  onChange={handleChange}
                  placeholder="Enter prescribed medicines and dosage..."
                  className="w-full rounded-lg border border-gray-300 shadow-sm 
                           focus:ring-2 focus:ring-green-500 focus:border-green-500
                           placeholder:text-gray-400 p-4 text-gray-900
                           transition-colors duration-200"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 
                         text-white font-medium rounded-lg shadow-sm 
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Submit Prescription
              </button>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionPage;
