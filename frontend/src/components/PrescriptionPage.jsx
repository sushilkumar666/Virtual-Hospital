import React from 'react'

const PrescriptionPage = () => {
    const [prescriptionData, setPrescriptionData] = useState({
        care: '',
        medicines: ''
    });

    const handleChange = (e) => {
        setPrescriptionData({ ...prescriptionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/prescription', prescriptionData);
            // Handle success (e.g., show success message or redirect)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="care" placeholder="Care to be taken" onChange={handleChange} required />
            <input type="text" name="medicines" placeholder="Medicines" onChange={handleChange} />
            <button type="submit">Submit Prescription</button>
        </form>
    );
};

export default PrescriptionPage;