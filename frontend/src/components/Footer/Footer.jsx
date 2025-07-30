import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <footer className="bg-[#e5e7eb] border-t border-gray-300 text-gray-800 px-6 py-14 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            NewsRoom
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            © 2025 NewsRoom. Crafted with ❤️ using React + Tailwind CSS.
          </p>
        </div>

        {/* Navigation */}
        <div className="sm:text-center">
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <button
            onClick={handleHomeClick}
            className="text-gray-700 hover:text-black transition-colors duration-200"
          >
            Home
          </button>
        </div>

        {/* Social Links */}
        <div className="sm:text-right">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex sm:justify-end gap-5 text-gray-700 text-xl">
            <a href="#" className="hover:text-pink-600 transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-black transition-colors duration-200">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
