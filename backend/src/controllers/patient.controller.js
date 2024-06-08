import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";


const generateAccessToken = async (patientId) => {
    try {
        const patient = await Patient.findById(patientId)
        const accessToken = patient.generateAccessToken()
      
        return accessToken 

    } catch (error) {
        throw new Error(500, "Something went wrong while generating access token")
    }
}

const registerUser = async (req, res) => {

    const { name, email, phone, password, age, historyOfSurgery, historyOfIllness} = req.body

    const existedUser = await Patient.findOne(
        { email }
    )

    if (existedUser) {
        throw new Error(409, "User with email  already exists")
    }
    //console.log(req.files);

    const profileImagePath = req.files?.profileImage[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!profileImagePath) {
        throw new Error(400, "profile file is required")
    }

    const profile = await uploadOnCloudinary(profileImagePath);
    if (!profile) {
        throw new ApiError(400, "profile file is required")
    }

    const patient = await Patient.create({
        name,
        profileImage: profile.url,
        email, phone, password, age, historyOfSurgery, historyOfIllness, identity:  "doctor" 
    })

   
    const createdPatient = await Patient.findById(patient._id).select(
        "-password "
    )

    if (!createdPatient) {
        throw new Error(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdPatient, "User registered Successfully")
    )

}

const loginUser = async (req, res) => {
    

    const { email, password } = req.body
    console.log(email);

    if (!email) {
        throw new Error(400, " email is required")
    }


    const patient = await Patient.findOne({
        email
    })

    if (!patient) {
        throw new Error(404, "patient does not exist")
    }

    const isPasswordValid = await patient.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new Error(401, "Invalid user credentials")
    }

    const  accessToken  = await generateAccessToken(patient._id)

    const loggedInUser = await Patient.findById(patient._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options).json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken
                },
                "User logged In Successfully"
            )
        )

}

const logoutUser = async (req, res) => {


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
}

const getCurrentUser = async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.patient,
            "User fetched successfully"
        ))
}

const getDoctorList = async (req,res) => {
    try {
        const doctorList = await Doctor.find({});
        console.log(doctorList);
        res.status(200).json({
            success:true,
            doctorList}
        )
    } catch (error) {
        throw new Error("error while fetching doctorList" + error);
    }
   
}
const getDoctor = async (req,res) => {
    try {
        const doctor = await Doctor.findById("6662a064c6ba29d9705afd2a");
        console.log(doctor);
        res.status(200).json({
            success:true,
            doctor}
        )
    } catch (error) {
        throw new Error("Error while fetching doctor detail " + error)
    }
   
}

const getConsultation = async(req, res) => {
    try {
        const {currentIllnesssHistory, recentSurgery, diabeticOrNot, allergies, others, transactionId} = req.body;
        const {doctorId} = req.params;
        
        const patientDetails = await Patient.findByIdAndUpdate(req.patient._id, {$set:{currentIllnesssHistory, recentSurgery, diabeticOrNot, allergies, others, doctor: doctorId, transactionId}}, { new: true });
        const patientUpdatedDetails = await Patient.findById(req.patient._id);

        res.status(200).json({patientUpdatedDetails, success:true, message:'consultation Form submitted successfully'});
        
    } catch (error) {
        throw new error("error in consultation" + error);
    }

}

export {
    registerUser,
    loginUser,
    logoutUser,
    getDoctorList,
    getCurrentUser,
    getDoctor,
    getConsultation

}