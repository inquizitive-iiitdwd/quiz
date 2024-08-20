import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../image/Club_logo.JPG.png'; // Assuming you have the logo image

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-red from-gray-800 to-black text-white">
      <div className="container h">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="InQuizitive Logo" className="h-40 rounded-full border border-gray-300 mb-4" />
          <p className="text-lg font-bold">InQuizitive IIIT Dharwad</p>
        </div>
    
        {/* Page Navigation */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <a href="#" className="text-lg hover:text-gray-400 transition-colors">
            Page 1
          </a>
          <a href="#" className="text-lg hover:text-gray-400 transition-colors">
            Page 2
          </a>
          <a href="#" className="text-lg hover:text-gray-400 transition-colors">
            Page 3
          </a>
        </div>

        {/* Social Navigation */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaFacebookF className="text-2xl" />
            <span>Facebook</span>
          </a>
          {/* <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaTwitter className="text-2xl" />
            <span>Twitter</span>
          </a> */}
          <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaInstagram className="text-2xl" />
            <span>Instagram</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaLinkedin className="text-2xl" />
            <span>Linkedin</span>
          </a>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} InQuizitive IIIT Dharwad. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
