
import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, _, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        console.log(token, "Token Coming" + " req.cookies " + req?.cookies);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const doctor = await Doctor.findById(decodedToken?._id).select("-password")

        if (!doctor) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.doctor = doctor;
        next()
    } catch (error) {
        // throw new ApiError(401, error?.message || "Invalid access token")
        throw new Error(error);
        console.log("JWT Error:", error);
    }

}