import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  const doctor = {
    _id: '12334343',
    name: 'sushil',
    specialty: "heart specialist",
    email: 'sushil@gmail.com',
    phone: '123-456-',
    experience: '2',
    profileImage: 'https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png'
  }
  return (
    <div>
      <div className="card flex items-center" key={doctor._id}>
        <div className="w-[80vw]">
          <img width={"100%"} src={doctor.profileImage} alt={doctor.name} />
        </div>
        <div className="text-left">
          <p className="text-4xl ">Dr.&nbsp;{doctor.name}</p>
          <p>  Specialty:  <span>{doctor.specialty}</span></p>
          <p> Experience: <span>{doctor.experience}</span></p>
          <p> Email: <span>{doctor.email}</span></p>
          <p> Phone: <span>{doctor.phone}</span></p>
          <p>Description: Doctors diagnose disease, provide treatment, counsel patients with injuries, diseases or illnesses. The specific duties depend upon the speciality you pursue in your MBBS. Some doctors work in cardiology, whereas others may work in surgery , neurology, pulmonology or rheumatology.</p>



          <div className="mt-5">
            <Link className="px-4 py-2  border border-black bg-[#44B678] rounded-lg text-white" to={`/patient/consultationform/${doctor._id}`}>Consult</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
