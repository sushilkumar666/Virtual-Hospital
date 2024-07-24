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
   

    if (!profileImagePath) {
        throw new Error(400, "profile file is required")
    }

    const profile = await uploadOnCloudinary(profileImagePath);
    if (!profile) {
        throw new ApiError(400, "profile file is required")
    }
    console.log(profile.url + " this is the cloudinary url of the signup doctor")

    const patient = await Patient.create({
        name,
        profileImage: profile.url,
        email, phone, password, age, historyOfSurgery, historyOfIllness, identity:  "patient" 
    })


    if (!patient) {
        throw new Error(500, "Something went wrong while registering the user")
    }
    const createdPatient = await Patient.findById(patient._id).select(
        "-password "
    )

    const  accessToken  = await generateAccessToken(patient._id)
     
     

    const options = {
        httpOnly: true,
        secure: true,
         
    }
    res.cookie("accessToken", accessToken, options);
    
    return res
        .status(200)
         .json(
            new ApiResponse(
                200,
                {
                    user: createdPatient, accessToken
                },
                "User registered Successfully"
            )
        )

}

const loginUser = async (req, res) => {
    
    
    const { email, password } = req.body
    console.log(email);

    if (!email) {
        throw new Error(400, " email is required")
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
    console.log(accessToken + "this is accesstokenbeforesetting cookies");
    const loggedInUser = await Patient.findById(patient._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }
    res.cookie("accessToken", accessToken, options);
   
    return res
        .status(200)
        .json(
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
    const pdf = req.patient;
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            pdf,
            "User fetched successfully"
        ))
}

const getDoctorList = async (req,res) => {
    const page = req.params.page;
    try {
        const doctorList = await Doctor.find({}).skip((page - 1) * 6).limit(6);
        const count = await Doctor.countDocuments({});
        console.log(doctorList);
        res.status(200).json(
            new ApiResponse(
            200, {doctorList, count}, "all Doctors"
            )
        )
    } catch (error) {
        throw new Error("error while fetching doctorList" + error);
    }
   
}


// const getDoctorList = async (req, res) => {
//     const page = parseInt(req.params.page, 10);
//     const limit = 6;
  
//     // Validate page number
//     if (isNaN(page) || page < 1) {
//       return res.status(400).json({ error: "Invalid page number" });
//     }
  
//     try {
//       // Fetch the doctor list with pagination
//       const doctorList = await Doctor.find({})
//         .skip((page - 1) * limit)
//         .limit(limit);
  
//       // Get the total count of doctors
//       const count = await Doctor.countDocuments({});
  
//       // Log doctor list to console (for debugging purposes)
//       console.log(doctorList);
  
//       // Return the response
//       res.status(200).json(new ApiResponse(200, { doctorList, count }, "All Doctors"));
//     } catch (error) {
//       // Log the error and return a 500 status code with error message
//       console.error("Error while fetching doctorList:", error);
//       res.status(500).json({ error: "Error while fetching doctorList: " + error.message });
//     }
//   };
  
  

const getDoctor = async (req,res) => {
    try {
        const {doctorId} = req.params
        console.log(req.params + "reqest docteor id");
        const doctor = await Doctor.findById(doctorId);
        console.log(doctor);
        res.status(200).json(
            new ApiResponse(200,
            
            doctor, "doctor's data fetched successfully"
            )
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
        const patientUpdatedDetails = await Patient.findById(req.patient._id).select("-password");
        // console.log(patientUpdatedDetails)
        res.status(200).json(new ApiResponse(200, patientUpdatedDetails,'consultation Form submitted successfully'));
        // res.status(200).json({success:true, data: patientUpdatedDetails})
        
    } catch (error) {
        throw new Error("error in consultation" + error);
    }

}

const getSearchDoctor = async (req, res) => {
    try {
      console.log('Inside search Doctor');
      const query = req.params.query;
  
      const searchResult = await Doctor.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive partial match for name
          { specialty: { $regex: query, $options: 'i' } } // Case-insensitive partial match for specialty
        ]
      });
  
      res.status(200).json(new ApiResponse(200, searchResult, "Doctor search successful"));
    } catch (error) {
      throw new Error("Error while searching doctor: " + error);
    }
  }


const getPrescriptionPdf = async (req, res) => {
    try {
        const pdf = req.patient;
        res.status(200).json( new ApiResponse(200, pdf, "presciption result"))
        
    } catch (error) {
      throw new Error("Error while fetching pdf " + error);
    }
  }
  



export {
    registerUser,
    loginUser,
    logoutUser,
    getDoctorList,
    getCurrentUser,
    getDoctor,
    getConsultation,
    getSearchDoctor,
    getPrescriptionPdf

}