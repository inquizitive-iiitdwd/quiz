import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import NavBar from './Nav.js';

const Adminlogin = () => {
  const [roomId, setRoomId] = useState('');
  const [Username, setUsername] = useState('');
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = 9199081035;
    setRoomId(id);
    toast.success('Welcome to your room');
    setUsername('');
  };

  const Join = (e) => {
    if (!roomId || !Username) {
      toast.error("Please enter username and room key");
    } else if (roomId && Username) {
      if (Username === 'mahesh' && roomId === '91990') {
        navigate(`/Dashboard`, {
          state: {
            Username
          },
        });
      } else {
        toast.error("Please enter the correct username and key");
      }
    }
  };

  const handelkey = (e) => {
    if (e.code === "Enter") {
      Join();
    }
  };

  return (
    <>
      <NavBar />
      <div className='bg-gray-900 flex items-center justify-center h-screen text-white'>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Admin Page</h3>
          <div className='flex flex-col space-y-4'>
            <input
              type='text'
              className='w-full px-4 py-2 rounded-lg text-black font-bold'
              placeholder='Enter the Room Key'
              value={roomId}
              onKeyUp={handelkey}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <input
              type='text'
              className='w-full px-4 py-2 rounded-lg text-black font-bold'
              placeholder='Username'
              value={Username}
              onKeyUp={handelkey}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-teal-700 to-teal-500 w-full px-4 py-2 bg-green-500 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-green-600"
            id="Join"
              onClick={Join}
            >
              Join
            </button>
            <span className='text-center'>
              If you don't have a Key, create &nbsp;
              <Toaster />
              <a href='#' className='text-teal-400 font-bold' onClick={createNewRoom}>new room Key</a>
            </span>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 w-full text-center text-white mt-4">
        Created with <a href="https://github.com/maheshkatyayan" className="text-teal-400 font-bold">codecraftmen</a>
      </footer>
    </>
  );
};

export default Adminlogin;
