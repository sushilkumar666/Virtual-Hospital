import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PresciptionPdf() {
  const { patientId } = useParams();
  const [pdfPath, setPdfPath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://virtual-hospital-0gwt.onrender.com/api/v1/doctor/patientlist/${patientId}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          },
        }
        );
        // console.log(data + " this is data insdie prescription pdfjsx");
        setPdfPath(data.patient.pdf);
        console.log("inside prescription pdf");
        console.log(
          JSON.stringify(data.patient.pdf) + " this is our patient data"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId]);
  return (
    <div className="h-[100vh] ">
      <iframe
        src={`${pdfPath}`}
        width="100%"
        height="100%">
        This browser does not support PDFs. Please download the PDF to view it:
        <a href="#">Download PDF</a>.
      </iframe>
    </div>
  );
}

export default PresciptionPdf;
