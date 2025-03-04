import { Pdf } from "../models/pdf.model.js";
import { Router } from "express";
import { createPdf, fetchPdfById, fetchPdfs, fetchByPdfId, removePdf } from "../controllers/pdf.controller.js";
import { verifyDoctorJWT } from "../middlewares/doctor.middleware.js";
import { verifyPatientJWT } from "../middlewares/patient.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = new Router();

// router.route("").post(verifyDoctorJWT, createPdf);

router.route("/createPdf/:patientId/:recordId").post(
    upload.fields([{
        name: "pdf",
        maxCount: 1
    }]), verifyDoctorJWT, createPdf
)

router.route("/fetchPdf").get(verifyPatientJWT, fetchPdfs);

router.route("/fetchById/:recordId").get(fetchPdfById)

router.route("/fetchByPdfId/:pdfId").get(fetchByPdfId);

router.route("/removePdf/:pdfId").delete(removePdf);

export default router;