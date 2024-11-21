import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";

function ShowroomNavbar({ onMenuClick }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 flex justify-between items-center">
        {/* Menu Icon and Logo */}
        <div className="flex items-center ml-4">
          <button onClick={onMenuClick} className="text-gray-700 mr-2">
            <AlignJustify size={28} />
          </button>
          <Link to="/showroom/dashboard">
            <img
              src="/src/assets/logo.svg"
              alt="Logo"
              className="h-[100px]"
            />
          </Link>
        </div>

        {/* Centered Title */}
        <div className="flex-1 text-center">
          <div className="font-bold text-xl text-gray-700">
            SHOWROOM DASHBOARD
          </div>
        </div>

        {/* Empty Space for Right Section */}
        <div className="w-16"></div>
      </div>
    </nav>
  );
}

export default ShowroomNavbar;
