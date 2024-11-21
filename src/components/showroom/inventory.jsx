import React, { useState, useEffect } from "react";
import ShowroomNavbar from "./showroomNavbar";
import Drawer from "./drawer";
import Dialog from "./dialog";
import { Plus, Edit, Trash } from "lucide-react";
import axios from "axios";
import Toast from "../Toast";

const Base_Url = import.meta.env.VITE_API_URL;

// Utility function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function ShowroomInventory() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch vehicles from API
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/car/get-all-cars`, {
        withCredentials: true,
      });
      setVehicles(response.data);
    } catch (err) {
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setIsEditing(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setVehicleToEdit(null);
  };

  const handleSave = async (data) => {
    try {
      const formData = new FormData();

      // Capitalize relevant fields
      const make = capitalizeWords(data.make);
      const model = capitalizeWords(data.model);
      const color = capitalizeWords(data.color);
      const bodyType = capitalizeWords(data.bodyType);

      // Add non-file fields to formData
      formData.append("carBrand", make);
      formData.append("rentRate", data.rentalPrice);
      formData.append("carModel", model);
      formData.append("year", data.year);
      formData.append("color", color);
      formData.append("engineType", data.engineDisplacement);
      formData.append("bodyType", bodyType);
      formData.append("mileage", data.mileage);
      formData.append("transmission", data.transmission);

      // Add images to formData
      if (Array.isArray(data.images) && data.images.length > 0) {
        data.images.forEach((image) => {
          if (image) formData.append("images", image);
        });
      }

      if (isEditing) {
        const response = await axios.put(
          `${Base_Url}/api/car/update/${vehicles[vehicleToEdit]?._id}`,
          formData,
          { withCredentials: true }
        );
        fetchVehicles();
        Toast(response.data.message, "success");
      } else {
        const response = await axios.post(
          `${Base_Url}/api/car/add`,
          formData,
          { withCredentials: true }
        );
        Toast(response.data.message, "success");
        fetchVehicles();
      }
      closeDialog();
    } catch (error) {
      Toast(error.response?.data || "Error occurred while saving", "error");
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    setVehicleToEdit(index);
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const openDeleteDialog = (index) => {
    setVehicleToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setVehicleToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${Base_Url}/api/car/delete/${vehicles[vehicleToDelete]._id}`,
        { withCredentials: true }
      );
      Toast(response.data.message, "success");
      fetchVehicles();
      closeDeleteDialog();
    } catch (error) {
      Toast(error.response?.data || "Error occurred while deleting", "error");
      console.error(error);
    }
  };

  return (
    <div className="bg-[#2C2C2C] min-h-screen relative">
      <ShowroomNavbar onMenuClick={toggleDrawer} />

      <div className="container mx-auto p-6 overflow-auto">
        <div className="text-white">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700">
            <thead>
              <tr>
                <th className="sticky top-0 px-4 py-2 border-b">Id</th>
                <th className="sticky top-0 px-4 py-2 border-b">Image</th>
                <th className="sticky top-0 px-4 py-2 border-b">Make</th>
                <th className="sticky top-0 px-4 py-2 border-b">Model</th>
                <th className="sticky top-0 px-4 py-2 border-b">Mileage</th>
                <th className="sticky top-0 px-4 py-2 border-b">Engine</th>
                <th className="sticky top-0 px-4 py-2 border-b">Price</th>
                <th className="sticky top-0 px-4 py-2 border-b">Color</th>
                <th className="sticky top-0 px-4 py-2 border-b">Transmission</th>
                <th className="sticky top-0 px-4 py-2 border-b">Body</th>
                <th className="sticky top-0 px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <img
                        src={`/uploads/${vehicle.images}`}
                        alt={vehicle.carBrand}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{vehicle.carBrand}</td>
                    <td className="px-4 py-2">{vehicle.carModel}</td>
                    <td className="px-4 py-2">{vehicle.mileage} km</td>
                    <td className="px-4 py-2">{vehicle.engineType}</td>
                    <td className="px-4 py-2">{vehicle.rentRate} RS/hr</td>
                    <td className="px-4 py-2">{vehicle.color}</td>
                    <td className="px-4 py-2">{vehicle.transmission}</td>
                    <td className="px-4 py-2">{vehicle.bodyType}</td>
                    <td className="px-4 py-2 flex justify-center space-x-2">
                      <button
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                        onClick={() => openDeleteDialog(index)}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No vehicles available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      <button
        onClick={openDialog}
        className="fixed bottom-6 right-6 bg-[#C17D3C] text-white rounded-full p-4 hover:bg-[#A86428]"
      >
        <Plus />
      </button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSave={handleSave}
        vehicle={isEditing ? vehicles[vehicleToEdit] : null}
        isEditing={isEditing}
      />

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <p>Do you want to delete this car?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={closeDeleteDialog}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowroomInventory;
