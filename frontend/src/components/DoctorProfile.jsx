// components/DoctorProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorProfile = () => {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const res = await axios.get('/api/v1/doctor/consultations');
                setConsultations(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConsultations();
    }, []);

    return (
        <div>
            <h2>Doctor Profile</h2>
            <Link to="/prescription">Go to Prescription Page</Link>
            <div>
                {consultations.map((consultation) => (
                    <div key={consultation._id}>
                        <p>{consultation.currentIllnessHistory}</p>
                        <p>{consultation.recentSurgery}</p>
                        {/* More details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorProfile;

// components/PrescriptionPage.js
import React, { useState } from 'react';
import axios from 'axios';


