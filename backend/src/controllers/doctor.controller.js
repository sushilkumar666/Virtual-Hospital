import { Patient } from "../models/patient.model.js"
import { Doctor } from "../models/doctor.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"



const generateAccessToken = async (patientId) => {
    try {
        const doctor = await Doctor.findById(patientId)
        const accessToken = doctor.generateAccessToken()


       

        return  accessToken 
        // console.log(doctor);


    } catch (error) {
        throw new Error(500, "Something went wrong while generating access token")
    }
}

const registerUser = async (req, res) => {
    
    try {
        
    const { name, email, phone, password, experience, specialty,  identity } = req.body

    const existedUser = await Doctor.findOne(
        { email }
    )
    if (existedUser) {
        throw new Error(409, "User with email  already exists")
    }
    console.log(req.files);
   
    const profileImagePath = req.files?.profileImage[0]?.path;
   
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    if (!profileImagePath) {
        throw new Error(400, "Avatar file is required")
    }
    
        const profile = await uploadOnCloudinary(profileImagePath);
    
        if (!profile) {
            throw new ApiError(400, "profile file is required")
        }
    
    
    const doctor = await Doctor.create({
        name,
        profileImage: profile.url,
        email, phone, password, specialty, experience, identity
    })

    const createdDoctor = await Doctor.findById(doctor._id).select(
        "-password -refreshToken"
    )

    if (!createdDoctor) {
        throw new Error(500, "Something went wrong while registering the user")
    }
    console.log(req.body);
    return res.status(201).json(
        new ApiResponse(200, req.body, "User registered Successfully")
    )
   
} catch (error) {
       console.log('error in registration '  + error) 
}

}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log(email);

    if (!email) {
        throw new Error(400, " email is required")
    }

    const doctor = await Doctor.findOne({
        email
    })

    if (!doctor) {
        throw new Error(404, "User does not exist")
    }

    const isPasswordValid = await doctor.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new Error(401, "Invalid user credentials")
    }

    const  accessToken  = await generateAccessToken(doctor._id)

    const loggedInUser = await Doctor.findById(doctor._id).select("-password")

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
                    doctor: loggedInUser, accessToken
                },
                "User logged In Successfully"
            )
        )

}

const logoutUser = async (req, res) => {

    try {
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"))
    } catch (error) {
        throw new Error("error while logging out " + error );
    }

   
}

const getCurrentUser = async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.doctor,
            "User fetched successfully"
        ))
}

export {
    registerUser,
    loginUser,
    logoutUser,

    getCurrentUser,

}

