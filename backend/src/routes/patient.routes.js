import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    getConsultation
} from "../controllers/patient.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/patient.middleware.js";
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
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/doctorlist").get(verifyJWT, getDoctorList);

router.route("/doctorlist/:doctorId").get(verifyJWT, getDoctor);

router.route("/consult/:doctorId").post(verifyJWT, getConsultation);



export default router