import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// models/Patient.js
const patientSchema = new mongoose.Schema({
    profileImage: String,
    name: { type: String, required: true, trim: true, },
    age: { type: Number, required: true },
    email: { type: String, unique: true, required: true, lowecase: true },
    phone: { type: String, unique: true, required: true },
    historyOfSurgery: { type: String },
    historyOfIllness: { type: String },
    identity: { type: String },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    currentIllnessHistory: { type: String },
    recentSurgeory: { type: String },
    diabeticOrNot: { type: String },
    allergies: { type: String },
    others: { type: String },
    transactionId: { type: String },
    pdf: { type: String }


}, {
    timestamps: true
});

patientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

patientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
patientSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const Patient = mongoose.model("Patient", patientSchema)