import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    getConsultation,
    getSearchDoctor,
    getPrescriptionPdf,
    editPatientDetails
} from "../controllers/patient.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyPatientJWT } from "../middlewares/patient.middleware.js";
import { getDoctorList } from "../controllers/patient.controller.js";
import { getDoctor } from "../controllers/patient.controller.js";



const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        }

    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyPatientJWT, logoutUser)


router.route("/doctorlist/:page").get(verifyPatientJWT, getDoctorList);

router.route("/doctordetails/:doctorId").get(verifyPatientJWT, getDoctor);

router.route("/consult/:doctorId").post(verifyPatientJWT, getConsultation);

router.route("/profile").get(verifyPatientJWT, getCurrentUser);

router.route("/search/:query").get(getSearchDoctor);

router.route("/editDetails").put(verifyPatientJWT, editPatientDetails);


export default router;