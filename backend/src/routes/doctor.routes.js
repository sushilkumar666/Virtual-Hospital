import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    getPatientList,
    getPatient,
    prescribe,
    uploadPdf,
    deletePatient,
    updateProfile,
    editDoctorDetails

} from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyDoctorJWT } from "../middlewares/doctor.middleware.js";
import { patientHistory } from "../controllers/doctor.controller.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        },


    ]),
    registerUser
)

router.route("/upload/:patientId").post(
    upload.fields([{
        name: "pdf",
        maxCount: 1
    }]), uploadPdf
)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyDoctorJWT, logoutUser)

router.route("/current-user").get(verifyDoctorJWT, getCurrentUser)

router.route("/patientlist").get(verifyDoctorJWT, getPatientList);

router.route("/patientlist/:patientId").get(verifyDoctorJWT, getPatient);

router.route("/prescibe/:patientId").post(verifyDoctorJWT, prescribe);

router.route("/profile").get(verifyDoctorJWT, getCurrentUser);

router.route("/patienthistory").get(verifyDoctorJWT, patientHistory);

router.route("/deletepatient/:patientId").patch(deletePatient);

router.route("/updateProfile").patch(updateProfile);

router.route("/editDetails").put(verifyDoctorJWT, editDoctorDetails);


export default router