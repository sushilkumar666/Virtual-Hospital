import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const doctorSchema = new mongoose.Schema({
    profileImage:{type: String},
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    experience: { type: String, required: true },
    identity: { type: String, required: true },
    password: { type: String, required: true },
    description: {type: String, default: "Add Your Description"}

}, { timeStamps: true });
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

doctorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
doctorSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const Doctor = mongoose.model("Doctor", doctorSchema)


