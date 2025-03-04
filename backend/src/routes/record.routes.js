import { Router } from "express";
import { createRecord, prescribed, patientHistory, getPatientList, removeRecord } from "../controllers/record.controller.js";
import { verifyPatientJWT } from "../middlewares/patient.middleware.js";
import { verifyDoctorJWT } from "../middlewares/doctor.middleware.js";


const router = new Router();

router.route('/createRecord/:doctorId').post(verifyPatientJWT, createRecord);

router.route('/updatePrescribeStatus/:recordId').patch(verifyDoctorJWT, prescribed);

router.route('/patientHistory').get(verifyDoctorJWT, patientHistory);

router.route('/patientList').get(verifyDoctorJWT, getPatientList);

router.route('/removeRecord/:recordId').patch(verifyDoctorJWT, removeRecord);

export default router;
