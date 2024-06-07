
import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const patient = await Patient.findById(decodedToken?._id).select("-password")

        if (!patient) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.patient = patient;
        next()
    } catch (error) {
        throw new Error( "Invalid access token " + error)
    }

}