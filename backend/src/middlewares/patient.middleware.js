import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
         console.log(" this si stoken sushil "  + token)
        if (!token) {
            console.log("Token not found in cookies or headers.");
            throw new ApiError(401, "Unauthorized request");
        }           

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            console.log("Error decoding token:", error);
            throw new ApiError(401, "Invalid access token");
        }

        console.log("Decoded token:", decodedToken);

        const patient = await Patient.findById(decodedToken?._id);
        if (!patient) {
            console.log("Patient not found for token ID:", decodedToken?._id);
            throw new ApiError(401, "Invalid access token");
        }

        console.log("Patient found:", patient);

        req.patient = patient;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ error: "Unauthorized request: " + error.message });
    }
};
