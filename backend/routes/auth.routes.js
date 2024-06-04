// routes/auth.js
const express = require('express');
const router = express.Router();
const { doctorSignup, patientSignup, login } = require('../controllers/authController');

router.post('/doctor/signup', doctorSignup);
router.post('/patient/signup', patientSignup);
router.post('/login', login);

module.exports = router;
