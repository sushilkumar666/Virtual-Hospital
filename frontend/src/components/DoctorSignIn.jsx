import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function DoctorSignIn() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/doctor/doctorprofile')

    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-[30vw] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Doctor Sign-in</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input onChange={handleChange} name='email' type="email" className="w-full border p-2 rounded" placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input onChange={handleChange} name='password' type="password" className="w-full border p-2 rounded" placeholder="Password" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
            </form>
        </div>
    );
}

export default DoctorSignIn;