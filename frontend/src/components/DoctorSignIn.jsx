import React from 'react'

function DoctorSignIn() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Doctor Sign-in</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full border p-2 rounded" placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" className="w-full border p-2 rounded" placeholder="Password" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
            </form>
        </div>
    );
}

export default DoctorSignIn;