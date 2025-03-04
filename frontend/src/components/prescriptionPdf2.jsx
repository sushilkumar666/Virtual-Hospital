import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";

function PresciptionPdf2() {
    const { pdfId } = useParams();
    const [pdfPath, setPdfPath] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${BACKEND_URL}/api/v1/pdf/fetchByPdfId/${pdfId}`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
                );
                console.log(JSON.stringify(data) + " this is pdf data");
                // console.log(data + " this is data insdie prescription pdfjsx");
                setPdfPath(data.pdfData.pdf);
                console.log("inside prescription pdf");

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [pdfId]);
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

export default PresciptionPdf2;
