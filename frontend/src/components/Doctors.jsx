import React from "react";
import { Link } from "react-router-dom";

function Doctors() {
  const doctors = [
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "tejasvini vichare",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
    {
      name: "sushil sharma",
      speciality: "heart specialist",
      email: "sushil@gmail.com",
      phone: "9087654321",
      experience: "5",
      profileImage:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
    },
  ];

  return (
    <>
      <div>
        <div className="mx-auto flex flex-wrap  justify-evenly">
          {doctors.map((doctor) => {
            return (
              <div className="card px-3 mx-auto flex flex-wrap">
                <div className="w-[320px] rounded-3xl  border border-gray cursor-pointer  p-4">
                  <img width={"300px"} src={doctor.profileImage} alt="doctor" />

                  <div className="text-center">
                    <div className="text-lg font-semibold">{doctor.name}</div>
                    <div>{doctor.speciality}</div>
                    <div>
                      Experience: &nbsp;
                      {doctor.experience}
                    </div>
                    <div>{doctor.speciality}</div>
                    <div className="border mx-auto border-black  w-[80px] text-center rounded-full font-semibold cursor-pointer mt-2 hover:border-2 px-2 py-1">
                      Details
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Doctors;
