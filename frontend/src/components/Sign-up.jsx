// components/DoctorSignUp.js
import React, { useState } from 'react';
import axios from 'axios';

const DoctorSignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        email: '',
        phoneNumber: '',
        yearsOfExperience: '',
        profilePicture: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/doctor/signup', formData);
            console.log(res.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="specialty" placeholder="Specialty" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <input type="number" name="yearsOfExperience" placeholder="Years of Experience" step="0.1" onChange={handleChange} required />
            <input type="file" name="profilePicture" onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default DoctorSignUp;
