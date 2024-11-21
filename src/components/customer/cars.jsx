import React, { useEffect, useState } from "react";
import UserCard from "./userCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const Cars = () => {
const [cars, setCars]=useState([]);

const fetchVehicles = async () => {
  try {
    const response = await axios.get(
      `${Base_Url}/api/car/get-cars`,
      { withCredentials: true }
    );
    console.log(response);
    setCars(response.data);
  } catch (err) {
    console.log(err);
    Toast(err.data || err.message || "Something went wrong", "error");
  }
};
useEffect(() => {
  fetchVehicles();
}, []);
console.log(cars)

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
        <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl py-10 w-full justify-items-center">
          {cars.map((car, index) => (
            <UserCard key={index} car={car} />
            
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
