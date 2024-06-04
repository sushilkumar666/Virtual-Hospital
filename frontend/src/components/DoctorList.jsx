// components/DoctorList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get('/api/v1/doctors');
                setDoctors(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="grid">
            {doctors.map((doctor) => (
                <div className="card" key={doctor._id}>
                    <img src={doctor.profilePicture} alt={doctor.name} />
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <Link to={`/consult/${doctor._id}`}>Consult</Link>
                </div>
            ))}
        </div>
    );
};

export default DoctorList;
