import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import backgroundvideo from '../image/video1.mp4';

const Clientlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createNewSignIn = (e) => {
    navigate('/sign');
  };

  const LogIn = async (e) => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
    } else if (email && password) {
      try {
        const data = { email: email, password: password };
        console.log(data);
        const response = await axios.post("http://localhost:5000/loginpassword", { data }, { withCredentials: true });
        console.log(response.data);
        if (response.data) {
          toast.success("Signed in successfully!");
          navigate('/', {
            state: {
              password
            },
          });
        } else {
          setEmail('');
          setPassword('');
          toast.error("Failed to login");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("Failed to log in. Please try again.");
      }
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      LogIn();
    }
  };

  return (
    <>
      <video autoPlay muted loop className="fixed right-0 left-0 w-100% h-100% -z-5">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
      <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] flex items-center justify-center h-screen text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 max-w-full z-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Client Page</h3>
          <h4 className="text-lg mb-4 text-center">Enter your email id</h4>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg text-black font-bold"
              placeholder="Enter the Email ID"
              value={email}
              onKeyUp={handleKey}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg text-black font-bold"
              placeholder="Password"
              value={password}
              onKeyUp={handleKey}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-green-600"
              id="Join"
              onClick={LogIn}
            >
              Login
            </button>

            <span className="text-center">
              If you don't have an ID, click &nbsp;
              <Toaster />
              <a href="#" className="text-green-400 font-bold" onClick={createNewSignIn}>sign in</a>
            </span>
          </div>
        </div>
        <footer className="fixed bottom-0 w-full text-center mt-4 z-10">
          Created with <a href="https://github.com/maheshkatyayan" className="text-green-400 font-bold">codecraftmen</a>
        </footer>
      </div>
    </>
  );
};

export default Clientlogin;