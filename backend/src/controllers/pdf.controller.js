import { Pdf } from "../models/pdf.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { Record } from "../models/record.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const createPdf = async (req, res) => {
    try {

        const recordId = req.params.recordId;
        const patientId = req.params.patientId;
        const doctorId = req.doctor._id;

        const pdf = req.files?.pdf[0]?.path;
        console.log("multer handle the file")
        console.log(pdf);

        console.log("checkpoint 1")

        // const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if (!pdf) {
            throw new Error(400, "pdf file is required")
        }

        console.log("checkpoint 2");

        const cloudinaryPdf = await uploadOnCloudinary(pdf);
        console.log("cloudnary pdf :" + cloudinaryPdf);
        if (!cloudinaryPdf) {
            throw new ApiError(400, "error while uploading on cloudinary")
        }
        console.log("check pint 3")

        // const { patientId } = req.params;

        // const uploadPdf = await Patient.findByIdAndUpdate(patientId, { $set: { pdf: cloudinaryPdf, prescribed: true, presentInHistory: true } }, { new: true })



        const newPdf = await Pdf.create({
            patientId, doctorId, recordId, pdf: cloudinaryPdf
        })

        const updateRecord = await Record.findByIdAndUpdate(
            recordId,
            { $set: { pdf: cloudinaryPdf, presentInHistory: true, prescribed: true } },
            { new: true } // This returns the updated document
        );


        console.log("checkpoint 4")


        res.status(200).json({
            success: true,
            message: "presciption uploaded successfully",
            newPdf
        })
    } catch (error) {
        console.error("Error while uploading PDF");
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while uplaoding pdf"
        });
    }
}


const fetchPdfs = async (req, res) => {

    try {
        const patientId = req.patient._id;
        const patientPdfs = await Pdf.find({ patientId }).populate('doctorId', 'name');

        res.json({
            success: true,
            patientPdfs
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: "error while fetching patient  PDFs",
            error: error.message
        })
    }

}

const fetchPdfById = async (req, res) => {
    try {
        console.log("checkpoint 1")
        const { recordId } = req.params;
        if (!recordId) {
            console.log("no recordId specified");
            return;
        }
        console.log(recordId + " this is value of record Id")
        console.log("checkpoint 2")
        const pdfData = await Record.findById(recordId);
        if (!pdfData) {
            console.log("no pdfData found");
            throw new Error("no pdfData found");
        }
        console.log("checkpoint 3")
        res.json({
            success: true,
            message: "pdfData fetched successfully",
            pdfData
        })

    } catch (error) {
        res.json({
            sucess: false,
            message: "error while fetching PDF: ",
            error: error.message
        })
    }
}


const fetchByPdfId = async (req, res) => {
    try {
        console.log("checkpoint 1")
        const { pdfId } = req.params;
        if (!pdfId) {
            console.log("no recordId specified");
            return;
        }
        console.log(pdfId + " this is value of record Id")
        console.log("checkpoint 2")
        const pdfData = await Pdf.findById(pdfId);
        if (!pdfData) {
            console.log("no pdfData found");
            throw new Error("no pdfData found");
        }
        console.log("checkpoint 3")

        res.json({
            success: true,
            message: "pdfData fetched successfully",
            pdfData
        })

    } catch (error) {
        res.json({
            sucess: false,
            message: "error while fetching PDF: ",
            error: error.message
        })
    }
}


const removePdf = async (req, res) => {
    try {
        const { pdfId } = req.params;

        const deletedPdf = await Pdf.findByIdAndDelete(pdfId);
        if (!deletedPdf) {
            throw new Error("Error while deleting PDF: " + pdfId)
        }
        res.json({
            success: true,
            message: 'PDF deleted successfully',
            deletedPdf
        })

    } catch (error) {
        res.json({
            sucess: false,
            message: "error while deleting pdf",
            error: error.message
        })
    }

}

export {
    createPdf, fetchPdfs, fetchPdfById, fetchByPdfId, removePdf
}