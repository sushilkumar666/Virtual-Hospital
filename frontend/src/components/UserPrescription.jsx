import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText, AlertCircle } from "lucide-react";

function UserPrescription() {
  const [pdfPath, setPdfPath] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://virtual-hospital-0gwt.onrender.com/api/v1/patient/profile`,
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
    <div className="min-h-screen bg-gray-50">
      {pdfPath ? (
        <div className="relative h-screen">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
              <div className="text-center">
                <div className="animate-pulse">
                  <FileText className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                </div>
                <p className="text-lg text-gray-600">Loading prescription...</p>
              </div>
            </div>
          )}

          {/* PDF Viewer */}
          <iframe
            src={pdfPath}
            className="w-full h-full border-none shadow-lg"
            onLoad={handleIframeLoad}
            onError={handleIframeError}>
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                <p className="text-lg text-gray-700 mb-4">
                  This browser does not support PDFs.
                </p>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <FileText className="w-5 h-5 mr-2" />
                  Download PDF
                </a>
              </div>
            </div>
          </iframe>

          {/* Error State */}
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center p-8">
                <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Unable to load PDF
                </h3>
                <p className="text-gray-600 mb-4">
                  There was an error loading the prescription.
                </p>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <FileText className="w-5 h-5 mr-2" />
                  Download PDF Instead
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Prescription Available
              </h2>
              <p className="text-gray-600">
                There are no prescriptions to display at this time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPrescription;
