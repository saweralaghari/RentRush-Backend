import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { CircleGauge, Fuel, GripHorizontal } from "lucide-react";

const Bookings = () => {
  const car = {
    name: "Toyota Camry New",
    image: "/src/assets/aboutcar.png",
    price: 40000,
    mileage: "20 Miles",
    fuelType: "Petrol",
    transmission: "Automatic",
    rentalInfo: {
      rentalStartDate: "2024-11-19",
      rentalEndDate: "2024-11-19",
      rentalStartTime: "01:20 pm",
      rentalEndTime: "01:46 pm",
      showroomName: "Premium Showroom",
      showroomLocation: "Downtown, City",
    },
  };

  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [rentalStarted, setRentalStarted] = useState(false);
  const [rentalEnded, setRentalEnded] = useState(false);
  const [rentalDays, setRentalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const calculateProgressAndTimeLeft = () => {
    const startTime = new Date(
      `${car.rentalInfo.rentalStartDate} ${car.rentalInfo.rentalStartTime}`
    );
    const endTime = new Date(
      `${car.rentalInfo.rentalEndDate} ${car.rentalInfo.rentalEndTime}`
    );
    const currentTime = new Date();

    const totalDuration = endTime - startTime;
    const elapsedTime = currentTime - startTime;

    const progressPercentage = Math.min(
      100,
      (elapsedTime / totalDuration) * 100
    );

    if (currentTime >= startTime) {
      setRentalStarted(true);

      if (currentTime >= endTime) {
        setRentalEnded(true);
        setTimeLeft("Rental period has ended");
      } else {
        const timeRemaining = endTime - currentTime;

        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);

        setProgress(progressPercentage >= 0 ? progressPercentage : 0);
      }
    } else {
      setRentalStarted(false);
      setTimeLeft(null);
    }
  };

  const calculateRentalDays = () => {
    const startTime = new Date(
      `${car.rentalInfo.rentalStartDate} ${car.rentalInfo.rentalStartTime}`
    );
    const endTime = new Date(
      `${car.rentalInfo.rentalEndDate} ${car.rentalInfo.rentalEndTime}`
    );

    const totalDurationInHours = (endTime - startTime) / (1000 * 60 * 60);
    const days = Math.ceil(totalDurationInHours / 24);
    setRentalDays(days);
    setTotalPrice(days * car.price);
  };

  const handleReturnCar = () => {
    setShowPopup(true);

    // Hide pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateProgressAndTimeLeft();
    }, 1000);

    calculateRentalDays();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-white flex flex-col lg:flex-row items-start lg:h-screen h-auto w-full p-6 pb-5 relative">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-auto lg:h-full object-cover rounded-lg"
          />
        </div>

        <div className="lg:w-1/2 w-full lg:pl-10 space-y-4">
          {rentalStarted && !rentalEnded && (
            <div className="top-4 right-4">
              <div className="w-64 bg-gray-300 rounded-full h-4 mt-2">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{timeLeft}</p>
            </div>
          )}

          <h2 className="text-3xl font-bold">{car.name}</h2>
          <p className="text-xl font-semibold">{car.price} RS / day</p>
          <div className="grid grid-cols-3 gap-4 text-sm text-black my-2">
            <div className="flex flex-col items-center">
              <CircleGauge />
              <span className="text-gray-500">{car.mileage}</span>
            </div>
            <div className="flex flex-col items-center">
              <Fuel />
              <span className="text-gray-500">{car.fuelType}</span>
            </div>
            <div className="flex flex-col items-center">
              <GripHorizontal />
              <span className="text-gray-500">{car.transmission}</span>
            </div>
          </div>

          <table className="min-w-full table-fixed border-collapse border border-gray-400 text-left text-sm">
            <thead>
              <tr>
                <th
                  className="border border-gray-400 bg-black text-white p-2 text-center"
                  colSpan={2}
                >
                  Rental Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/2 border border-gray-400 p-2 font-semibold">
                  Rental Start Date
                </td>
                <td className="w-1/2 border border-gray-400 p-2">
                  {car.rentalInfo.rentalStartDate}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Rental End Date
                </td>
                <td className="border border-gray-400 p-2">
                  {car.rentalInfo.rentalEndDate}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Rental Start Time
                </td>
                <td className="border border-gray-400 p-2">
                  {car.rentalInfo.rentalStartTime}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Rental End Time
                </td>
                <td className="border border-gray-400 p-2">
                  {car.rentalInfo.rentalEndTime}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Rental Days
                </td>
                <td className="border border-gray-400 p-2">{rentalDays}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-xl font-semibold mt-4 pb-5">
            <strong>Total Amount</strong> {totalPrice} RS
          </p>

          {rentalEnded && (
            <div className="mt-4 pb-5">
              <button
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={handleReturnCar}
              >
                Return Car
              </button>
            </div>
          )}

          {!rentalStarted && (
            <div className="bottom-4 right-4 space-x-4 pb-5">
              <button className="bg-green-600 text-white py-2 px-4 rounded">
                Edit Details
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded">
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-800">
              Request sent to showroom
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
