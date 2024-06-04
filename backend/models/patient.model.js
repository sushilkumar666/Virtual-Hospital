import mongoose from 'mongoose';

// models/Patient.js
const patientSchema = new mongoose.Schema({
    profilePicture: String,
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    historyOfSurgery: String,
    historyOfIllness: String
});

module.exports = mongoose.model('Patient', patientSchema);