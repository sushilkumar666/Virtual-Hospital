// components/ConsultationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ConsultationForm = () => {
    const { doctorId } = useParams();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        currentIllnessHistory: '',
        recentSurgery: '',
        familyMedicalHistory: '',
        allergies: '',
        others: '',
        transactionId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/v1/consult/${doctorId}`, formData);
            // Handle success (e.g., redirect to doctor's profile)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <>
                    <input type="text" name="currentIllnessHistory" placeholder="Current Illness History" onChange={handleChange} required />
                    <input type="text" name="recentSurgery" placeholder="Recent Surgery" onChange={handleChange} required />
                    <button type="button" onClick={handleNextStep}>Next</button>
                </>
            )}
            {step === 2 && (
                <>
                    <label>
                        <input type="radio" name="familyMedicalHistory" value="Diabetics" onChange={handleChange} required /> Diabetics
                    </label>
                    <label>
                        <input type="radio" name="familyMedicalHistory" value="Non-Diabetics" onChange={handleChange} required /> Non-Diabetics
                    </label>
                    <input type="text" name="allergies" placeholder="Allergies" onChange={handleChange} required />
                    <input type="text" name="others" placeholder="Others" onChange={handleChange} required />
                    <button type="button" onClick={handlePrevStep}>Previous</button>
                    <button type="button" onClick={handleNextStep}>Next</button>
                </>
            )}
            {step === 3 && (
                <>
                    <input type="text" name="transactionId" placeholder="Transaction ID" onChange={handleChange} required />
                    {/* QR Code for payment can be displayed here */}
                    <button type="button" onClick={handlePrevStep}>Previous</button>
                    <button type="submit">Submit</button>
                </>
            )}
        </form>
    );
};

export default ConsultationForm;
