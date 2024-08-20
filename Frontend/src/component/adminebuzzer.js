import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NavBar from './Nav.js'
import sound from '../image/tickingbuzzer-75859.mp3'

// Initialize the socket outside of the component to avoid re-creating on each render
const socket = io('http://localhost:8000', { autoConnect: false });

const AdminBuzzer = () => {
  const [arraykadata, setarraykadata] = useState([]);

  useEffect(() => {
    // Connect to the socket server when the component mounts
    socket.connect();

    // Log the socket ID when connected
    socket.on('connect', () => {
      console.log('Connected with socket ID:', socket.id);
    });

    //array ka data
    socket.on('arraydata', (data) => {
      console.log("array wala data", data);
      setarraykadata(data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handler for the start button
  const handleStartButton1 = (e) => {
    var audio =new Audio(sound)
    audio.play();
    socket.emit('Set', 1);
    console.log('Button clicked, emitted start event');
  };

  const handleleaderboardtime = (e) => {
    socket.emit('array');
    console.log('array start event');
  };

  return (
    <><NavBar />
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleStartButton1}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Set
          </button>
          <button
            onClick={handleleaderboardtime}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Leaderboard Time
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Array Data:</h3>
          <div className="message-list space-y-2">
            {arraykadata.map((i, index) => (
              <div key={index} className="message bg-gray-200 p-2 rounded">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </> );
};

export default AdminBuzzer;
