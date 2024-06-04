// controllers/authController.js
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.doctorSignup = async (req, res) => {
    try {
        const { name, specialty, email, phoneNumber, yearsOfExperience, profilePicture } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const doctor = new Doctor({ name, specialty, email, phoneNumber, yearsOfExperience, profilePicture, password: hashedPassword });
        await doctor.save();
        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering doctor', error });
    }
};

exports.patientSignup = async (req, res) => {
    try {
        const { name, age, email, phoneNumber, historyOfSurgery, historyOfIllness, profilePicture } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const patient = new Patient({ name, age, email, phoneNumber, historyOfSurgery, historyOfIllness, profilePicture, password: hashedPassword });
        await patient.save();
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Doctor.findOne({ email });
        if (!user) {
            user = await Patient.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
