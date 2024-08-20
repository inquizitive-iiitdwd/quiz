import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const VerifyEmail = () => {
  const navigate = useNavigate();

  const Verifyuser = async (e) => {
    try {
        await axios.get("http://localhost:5000/users/verify");
        toast.success("Signed in successfully!");
         navigate("/Clientlogin");
      } catch (error) {
        console.error("Error signing in:", error);
        toast.error("Failed to sign in. Please try again.");
      }
  };


  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen text-white bg-gray-900">
      <button className='bg-blue' onClick={Verifyuser}>Verify</button>
      <footer className="fixed bottom-0 w-full text-center mt-4">
        Created with <a href="https://github.com/maheshkatyayan" className="text-teal-400 font-bold hover:text-teal-800">codecraftmen</a>
      </footer>
    </div>
  );
};

export default VerifyEmail;
