import React from 'react'
import DoctorSignIn from '../components/DoctorSignIn'
import DoctorSignUp from '../components/DoctorSignUp'
import PatientSignIn from '../components/PatientSignIn'
import PatientSignUp from '../components/PatientSignUp'

function Home() {
    return (
        <div>
            <DoctorSignUp />
            <DoctorSignIn />
            <PatientSignUp />
            <PatientSignIn />
        </div>
    )
}

export default Home