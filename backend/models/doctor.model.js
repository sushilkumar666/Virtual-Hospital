// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    profilePicture: String,
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    yearsOfExperience: { type: Number, required: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);


