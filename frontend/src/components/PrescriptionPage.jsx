import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const generatePDF = () => {
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
      formData.append("file", pdfBlob, "prescription.pdf");

      fetch("http://localhost:8000/upload", {
        // Replace with your backend URL
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Successfully uploaded to Cloudinary:", data);
        })
        .catch((error) => {
          console.error("Error uploading to Cloudinary:", error);
        });
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
        </div>
      </form>
    </div>
  );
};

export default PrescriptionPage;
