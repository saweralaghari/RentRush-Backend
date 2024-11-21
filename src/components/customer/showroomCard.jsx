import React, { useState } from "react";

const ShowroomCard = ({ showroom }) => {

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative">
      <div className="relative">
        <img
          src={showroom.image}
          alt={showroom.name}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg">{showroom.name}</h3>
        <div className="flex justify-between items-center pb-4">
          <span className="text-md">{showroom.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowroomCard;
