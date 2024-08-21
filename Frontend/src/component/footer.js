import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../image/Club_logo.JPG.png'; // Assuming you have the logo image
import Events from './event.js'
import About_us from './About_us.js'
import Home from './Home.js'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-black text-white pt-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="InQuizitive Logo" className="rounded-full border border-gray-300 w-40 h-40 mb-2" />
          <p className="text-lg font-bold">Quizzing Club</p>
          <p className="text-lg">Indian Institute of Information Technology Dharwad</p>
        </div>

        {/* Page Navigation */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <a href="Home" className="text-lg hover:text-gray-400 transition-colors">
            Home
          </a>
          <a href="event" className="text-lg hover:text-gray-400 transition-colors">
            Events
          </a>
          <a href="About_us" className="text-lg hover:text-gray-400 transition-colors">
            About Us
          </a>
        </div>

        {/* Social Navigation */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          {/* <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaFacebookF className="text-2xl" />
            <span>Facebook</span>
          </a> */}
          
          <a href="https://www.instagram.com/inquizitive.iiitdwd/" target="_blank" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaInstagram className="text-2xl" />
            <span>Instagram</span>
          </a>
          <a href="https://www.linkedin.com/company/inquizitive-iiit-dharwad/" target="_blank" className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <FaLinkedin className="text-2xl" />
            <span>Linkedin</span>
          </a>
        </div>
      </div>
      <div className="text-center text-gray-400">
        &copy; {new Date().getFullYear()} InQuizitive IIIT Dharwad. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
