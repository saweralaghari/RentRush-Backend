import React, { useState } from "react";
import ShowroomCard from "./showroomCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";

const showrooms = [
  {
    name: "Toyota Camry New",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "C-Class – 2023",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Ford Transit – 2021",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "New GLC – 2023",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Audi A6 3.5 – New",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Audi A4 4.5 New",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Ranger Black – 2021",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Mercedes-Benz, C Class",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Ranger White – 2022",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "T-Cross – 2023",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Corolla Altis – 2023",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
  {
    name: "Ford Explorer 2023",
    image: "/src/assets/showroom.jpg",
    location: "Islamabad",
  },
];

const Showrooms = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search />
          </div>
        </div>
      </div>

      <div className="bg-white flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl px-4 py-10 w-full justify-items-center">
          {showrooms.map((showroom, index) => (
            <ShowroomCard key={index} showroom={showroom} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Showrooms;
