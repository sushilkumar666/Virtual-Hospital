import { Patient } from "../models/patient.model.js"
import { Doctor } from "../models/doctor.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import CircularJSON from 'circular-json';



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
    console.log(profile + " this is the data recieve when profile is uploaded on cloudinary")
    const doctor = await Doctor.create({
        name,
        profileImage: profile,
        email, phone, password, specialty, experience, identity
    })

    const createdDoctor = await Doctor.findById(doctor._id).select(
        "-password -refreshToken"
    )

    if (!createdDoctor) {
        throw new Error(500, "Something went wrong while registering the user")
    }
    // console.log(req.body);
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
                "User registered Successfully"
            )
        )
   
} catch (error) {
       console.log('error in registration '  + error) 
}

}




const updateProfile = async (req, res) => {
    const id = req.parmas;
    try {   
    const { name, email, phone, password, experience, specialty } = req.body
   
    
   
    const profileImagePath = req.files?.profileImage[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
        const profile = await uploadOnCloudinary(profileImagePath);
        if (!profile) {
            throw new ApiError(400, "profile file is required")
        }
   
    const doctor = await Doctor.updateById(id, {
        name,
        profileImage: profile,
        email, phone, password, specialty, experience, identity
    })

    const updatedDoctor = await Doctor.findById(doctor._id).select(
        "-password -refreshToken"
    )

    if (!updatedDoctor) {
        throw new Error(500, "Something went wrong while registering the user")
    }
    // console.log(req.body);
   

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    doctor: updatedDoctor, accessToken
                },
                "User registered Successfully"
            )
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
        secure: true,
        
      
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
        secure: true,
        sameSite: 'None', // Add this if you are using cross-site cookies
      };
  
      // Clear the access token cookie
      res.clearCookie('accessToken', options);
  
      // If you are using any session management (like express-session), destroy the session here
      // Example for express-session:
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json(new ApiResponse(500, {}, 'Error destroying session'));
          }
          res.status(200).json(new ApiResponse(200, {}, 'User logged out and session destroyed'));
        });
      } else {
        res.status(200).json(new ApiResponse(200, {}, 'User logged out'));
      }
    } catch (error) {
      res.status(500).json(new ApiResponse(500, {}, 'Error while logging out: ' + error.message));
    }
  };

const getCurrentUser = async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.doctor,
            "User fetched successfully"
        ))
}
 
 const getPatientList = async (req,res) => {
    try {
        const patientList = await Patient.find({doctor: req.doctor._id, prescribed: false});
        const count = patientList.length;
        res.status(200).json(new ApiResponse(200, {patientList, count}, 'patient list fetched successfully')
            
            
        )
    } catch (error) {
        throw new Error("error while fetching doctorList" + error);
    }
   
}
 const getPatient = async (req,res) => {
    try {
        const {patientId} = req.params;
        const patient = await Patient.findById(patientId);
        console.log(patient);
        res.status(200).json({
            success:true,
            patient}
        )
    } catch (error) {
        throw new Error("Error while fetching patient detail " + error)
    }
   
}

const prescribe = async(req, res) => {
    try {
       
    } catch (error) {
        throw new Error("error in prescription " + error);
    }
}

const uploadPdf = async(req, res) => {
    try {

        const pdf = req.files?.pdf[0]?.path;
        console.log("multer handle the file")
        console.log(pdf);
   
        // const coverImageLocalPath = req.files?.coverImage[0]?.path;
        
        if (!pdf) {
            throw new Error(400, "pdf file is required")
        }
           
            const cloudinaryPdf = await uploadOnCloudinary(pdf);
            console.log("cloudnary pdf :" + cloudinaryPdf );
            if (!cloudinaryPdf) {
                throw new ApiError(400, "profile file is required")
            }

        const {patientId} = req.params;
      
        const uploadPdf = await Patient.findByIdAndUpdate(patientId, {$set:{pdf:cloudinaryPdf, prescribed: true,  presentInHistory: true}},  { new: true})
        console.log('debug3')

        res.status(200).json({
            success:true,
            message: "presciption uploaded successfully",
            uploadPdf
        })
    } catch (error) {
        console.error("Error while uploading PDF", CircularJSON.stringify(error));
        res.status(500).json({ message: "Error while uploading PDF" });
    }
}



const patientHistory = async(req, res) => {
    try {
        console.log('insdie patient  history1')
        const patients = await Patient.find({doctor: req.doctor._id});
        const patientHistory =  patients.filter((patient) => {
            
            return patient?.prescribed === true;
        });

        res.status(200).json({
            success:true,
            message:'patient history fetched succesfully',
            patientHistory
        })

    } catch (error) {
        throw new Error("Error while while fetching pateint History " + error);
    }
}


const deletePatient = async (req, res) => {
    try {
        console.log('Inside delete patient');
        const patientId = req.params.patientId;
        console.log(patientId, "this is patientId in backend");

        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID is required',
            });
        }

        const data = await Patient.findByIdAndUpdate(
            patientId,
            {
              $unset: { doctor: "" }, // Remove the `doctor` field from the document
              $set: { presentInHistory: false, prescribed : false }, // Update `presentInHistory` field
            },
            { new: true }
          );         
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found',
            });
        }
        if (!del) {
            return res.status(404).json({
                success: false,
                message: 'doctor id not deleted',
            });
        }

        console.log(data, "data of updated record");

        res.status(200).json({
            success: true,
            message: 'Patient record updated successfully',
        });

    } catch (error) {
        console.error("Error while updating patient:", error);
        res.status(500).json({
            success: false,
            message: 'Error while updating patient: ' + error.message,
        });
    }
};


const editDoctorDetails = async (req, res) => {

        try{
            console.log( JSON.stringify( req.body) + " this is the req.body");
        const doctorId = req.doctor._id;
        const { name="", email="", phone="", experience="", specialty="", description=""} = req.body;

        if(!doctorId){
            return res.status(400).json({ message: 'Doctor ID is required',  });
        }

        const data = await Doctor.findByIdAndUpdate(doctorId, {$set:{name, email, phone, experience, specialty, description}}, {new: true})

        console.log(data + " data after doctor updatedetails");
        res.status(200).json({
            success: true,
            data : data
        })
    }
    catch(error){
        console.log("error while updating doctor's detail " + error);
        res.status(400).json({
            success:false,
            message: "Error while updating doctor's detail"
        })
    }
}


 

export {
    deletePatient,
    registerUser,
    loginUser,
    logoutUser,
    getPatient,
    getPatientList,
    getCurrentUser,
    prescribe,
    uploadPdf,
    patientHistory,
    updateProfile,
    editDoctorDetails
    
}

