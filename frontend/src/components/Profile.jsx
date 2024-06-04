import React from "react";

function Profile() {
  return (
    <div>
      <div className="card" key={doctor._id}>
        <img src={doctor.profilePicture} alt={doctor.name} />
        <h3>{doctor.name}</h3>
        <p>{doctor.specialty}</p>
        <Link to={`/consult/${doctor._id}`}>Consult</Link>
      </div>
    </div>
  );
}

export default Profile;
