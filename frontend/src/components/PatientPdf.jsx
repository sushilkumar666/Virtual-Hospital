

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { FileText, Eye, Search, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientPdfs = () => {
    const navigate = useNavigate();
    const [pdfFiles, setPdfFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/api/v1/pdf/fetchPdf`, {
                    withCredentials: true,
                    "Custom-Header": "CustomValue"
                });
                console.log(data?.patientPdfs);
                setPdfFiles(data?.patientPdfs || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        // Handle the delete logic here
        console.log('Item deleted');
        setIsModalOpen(false); // Close the modal after deletion
        setPdfFiles(pdfFiles.filter(pdf => pdf._id !== selectedId));
        await axios.delete(`${BACKEND_URL}/api/v1/pdf/removePdf/${selectedId}`);
    };

    const handleCancel = () => {
        // Handle the cancel logic here
        console.log('Deletion cancelled');
        setIsModalOpen(false); // Close the modal
    };


    // Filter PDFs based on search term
    const filteredPdfs = pdfFiles.filter((pdf) =>
        pdf?.doctorId?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    // Sort PDFs
    const sortedPdfs = [...filteredPdfs].sort((a, b) => {
        if (sortBy === "name") {
            return sortDirection === "asc"
                ? a.doctorId.name.localeCompare(b.doctorId.name)
                : b.doctorId.name.localeCompare(a.doctorId.name);
        } else {
            return sortDirection === "asc"
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    // Toggle sort
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortDirection("asc");
        }
    };

    const openModal = (pdfId) => {
        setIsModalOpen(true);
        setSelectedId(pdfId);
    }


    const navigateToPdf = (pdfId) => {
        navigate(`/patient/prescription/${pdfId}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">PDF Documents</h1>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">
                            Are you sure you want to delete?
                        </h2>
                        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="flex items-center mb-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="w-full p-2 pl-10 border rounded-lg text-sm"
                        placeholder="Search PDFs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* PDF List */}
            <div className="overflow-x-auto">
                <table className="w-full border border-2 text-sm">
                    <thead className="bg-gray-100 text-center">
                        <tr>
                            <th className="px-4 py-2 text-left">
                                <button className="flex items-center font-medium" onClick={() => handleSort("name")}>
                                    Name {sortBy === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </button>
                            </th>

                            <th className="px-4 py-2 text-center ">
                                <button className="flex   items-center text-center  mx-auto font-medium" onClick={() => handleSort("createdAt")}>
                                    Date Added {sortBy === "createdAt" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </button>
                            </th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPdfs.length > 0 ? (
                            sortedPdfs.map((pdf) => (
                                <tr key={pdf._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <FileText className="w-5 h-5 text-blue-500 mr-2" />
                                            <span className="font-medium">{pdf.doctorId.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{new Date(pdf.createdAt).toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center space-x-2">
                                            <button onClick={() => navigateToPdf(pdf._id)} className="p-1 text-blue-600 hover:text-blue-800" title="View">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="p-1 text-red-600 hover:text-red-800"
                                                title="Delete"
                                                onClick={() => openModal(pdf._id)}
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                                    No PDF documents found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default PatientPdfs;
