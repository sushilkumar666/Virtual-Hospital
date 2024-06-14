import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const PrescriptionPage = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    care: "",
    medicines: "",
  });
  const navigate = useNavigate();
  const { patientId } = useParams();

  const generatePDF = async () => {
    const input = document.getElementById("formData");
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth * 1.5) / imgProps.width;
      pdf.addImage(imgData, "PNG", -15, 20, pdfWidth * 1.2, pdfHeight);
      // pdf.save("formData.pdf");

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, "prescription.pdf");
      axios
        .post(
          `http://localhost:8000/api/v1/doctor/upload/${patientId}`,
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

            navigate("/doctor/doctorprofile");
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

  return (
    <div className="mt-2">
      <form id="formData" onSubmit={handleSubmit}>
        <div className="w-[70vw] mx-auto border border-black m-4">
          <div className="flex justify-between p-4 ">
            <div className="flex flex-col text-left">
              <div>Dr. lorem ipsum</div>
              <div>Address: </div>
              <div>addess will go here</div>
            </div>
            <div>Date : Feb 2, 2024</div>
          </div>
          <p className="bg-[#0f9015] leading-4">&nbsp;</p>
          <div className="flex flex-col py-2 px-8 text-left">
            <label htmlFor="care">Care to be taken</label>
            <textarea
              className="border mt-2 w-[60vw] border-black"
              id="care"
              rows={8}
              type="text"
              name="care"
              placeholder="Care to be taken"
              value={prescriptionData.care}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="flex flex-col px-8 text-left">
            <label htmlFor="care">Medicines</label>
            <textarea
              className="border mt-2 w-[60vw] border-black"
              id="care"
              rows={8}
              type="text"
              name="medicines"
              value={prescriptionData.medicines}
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
        </div>
      </form>
    </div>
  );
};

export default PrescriptionPage;
