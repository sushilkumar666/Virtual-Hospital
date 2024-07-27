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
    updateProfile
    
} from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/doctor.middleware.js";
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
        name:"pdf",
        maxCount: 1
    }]), uploadPdf
)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/patientlist").get(verifyJWT, getPatientList);

router.route("/patientlist/:patientId").get( getPatient);

router.route("/prescibe/:patientId").post(verifyJWT, prescribe);

router.route("/profile").get(verifyJWT, getCurrentUser);

router.route("/patienthistory").get(verifyJWT, patientHistory);

router.route("/deletepatient/:patientId").patch( deletePatient);

router.route("/updateProfile").patch( updateProfile);



 






export default router