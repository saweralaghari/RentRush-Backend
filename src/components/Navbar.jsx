import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  function scrollToHome() {
    const element = document.getElementById('Home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToSteps() {
    const element = document.getElementById('steps');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToRequirements() {
    const element = document.getElementById('requirements');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToDetails() {
    const element = document.getElementById('detail');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }function scrollToTest() {
    const element = document.getElementById('rent');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
          to="/"
          >
            <img
              src="/src/assets/logo.svg"
              alt="Logo"
              className="-my-3 h-[100px] mr-2 fill-white"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <div className="hidden md:flex space-x-4 px-2">
            <li onClick={scrollToHome} className="list-none cursor-pointer text-gray-700 hover:text-[#C17D3C] text-xl font-semibold">Home</li>
            <li onClick={scrollToSteps} className="list-none cursor-pointer text-gray-700 hover:text-[#C17D3C] text-xl font-semibold">How it Works</li>
            <li onClick={scrollToRequirements} className="list-none cursor-pointer text-gray-700 hover:text-[#C17D3C] text-xl font-semibold">Requirements</li>
            <li onClick={scrollToDetails} className="list-none cursor-pointer text-gray-700 hover:text-[#C17D3C] text-xl font-semibold">Why Choose Us</li>
            <li className="list-none cursor-pointer text-gray-700 hover:text-[#C17D3C] text-xl font-semibold" onClick={scrollToTest}>Testimonials</li>
          </div>
        </div>
        <div>
          <div className="flex space-x-4 justify-center items-center">
            <Link
              to="/login"
              className=" border border-[#C17D3C] bg-[#C17D3C] rounded py-2 px-10 text-white font-poppins text-lg tracking-widest"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
