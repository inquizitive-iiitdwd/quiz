import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from './Nav.js';
import sound from '../image/buzzer-4-183895.mp3'

const socket = io('http://localhost:8000');

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSwitchVisible, setIsSwitchVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [isNameVisible, setIsNameVisible] = useState(true);
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('permission', (data) => {
      console.log("got the permission");
      setIsSwitchVisible(true);
      toast.success('Permission granted');
    });

    socket.on('arraydata', (data) => {
      console.log("array wala data", data);
      setArrayData(data);
      toast.success(`First click by ${data[0]}`);
      console.log(`Buzzer first click by ${data[0]}`);
    });

    return () => {
      socket.off('connect');
      socket.off('receive_message');
      socket.off('permission');
      socket.off('arraydata');
    };
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = { message: newMessage };

      try {
        await axios.post('http://localhost:8000/sendmessage', messageData);
        socket.emit('send_message', newMessage);
        setMessages([...messages, newMessage]);
        setNewMessage('');
        toast.success('Message sent successfully');
      } catch (e) {
        console.log(e);
        toast.error('Failed to send message');
      }
    }
  };

  // Handler for the switch toggle
  const handleSwitchToggle = async () => {
    setIsSwitchVisible(false);
    var audio =new Audio(sound)
    audio.play();
    console.log("teamName", teamName);
    socket.emit('send_name', teamName);
    console.log('Switch toggled');
    
    const currentTime = new Date().toISOString();
    const time = currentTime.slice(17, 23);
    console.log(time);

    const messageData = { message: currentTime };

    try {
      await axios.post('http://localhost:8000/sendmessage', messageData);
      socket.emit('send_message', currentTime);
      setMessages([...messages, currentTime]);
      toast.success('Switch toggled and message sent');
    } catch (e) {
      console.log(e);
      toast.error('Failed to toggle switch and send message');
    }
  };

  // Handler for team name input
  const handleTeamName = () => {
    setIsNameVisible(false);
    toast.success(`Team name set to ${teamName}`);
  }

  return (
    <><NavBar />
    <div className="min-h-screen bg-gradient-to-r from-[#2e1a47] to-[#624a82] p-4">
      <div className="message-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="message-card">
          <div className="message-list space-y-4">
            {arrayData.map((team, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{team}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Points:</span>
                    <input
                      type="number"
                      className="w-16 border border-gray-300 rounded p-1 text-center"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="message-input-container mt-6">
          {isNameVisible && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="message-input border border-gray-300 p-2 rounded flex-grow"
                placeholder='Enter team name'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button
                className="send-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleTeamName}
              >
                Send
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          {isSwitchVisible && (
            <button
              className="time-button bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={handleSwitchToggle}
            >
              Buzzer
            </button>
          )}
        </div>
        <Toaster /> {/* Toaster component for displaying toast notifications */}
      </div>
    </div>
    </>
  );
};

export default MessagePage;
