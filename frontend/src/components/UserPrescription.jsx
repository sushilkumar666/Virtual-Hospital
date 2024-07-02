import React, { useEffect, useState } from "react";
import axios from "axios";

function UserPrescription() {
  const [pdfPath, setPdfPath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://virtual-hospital.vercel.app/api/v1/patient/profile`,
          { withCredentials: true, "Custom-Header": "CustomValue" }
        );
        console.log(data);
        setPdfPath(data?.data?.pdf);
        console.log("inside prescription pdf");
        // console.log(
        //   JSON.stringify(data.patient.pdf) + " this is our patient data"
        // );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-[100vh] ">
      {pdfPath ? (
        <iframe src={`${pdfPath}`} width="100%" height="100%">
          This browser does not support PDFs. Please download the PDF to view
          it:
          <a href={`${pdfPath}`}>Download PDF</a>.
        </iframe>
      ) : (
        <div className="flex items-center text-center text-4xl">
          <div> No Prescription Yet </div>
        </div>
      )}
    </div>
  );
}

export default UserPrescription;
