import React from 'react'

function DoctorSignUp() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Doctor Sign-up</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Profile Picture</label>
                    <input type="file" className="w-full border p-2 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" className="w-full border p-2 rounded" placeholder="Name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Specialty</label>
                    <input type="text" className="w-full border p-2 rounded" placeholder="Specialty" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full border p-2 rounded" placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input type="text" className="w-full border p-2 rounded" placeholder="Phone Number" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Years of Experience</label>
                    <input type="number" step="0.1" className="w-full border p-2 rounded" placeholder="Years of Experience" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
            </form>
        </div>
    );
}

export default DoctorSignUp;