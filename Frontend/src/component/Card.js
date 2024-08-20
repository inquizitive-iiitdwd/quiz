import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Card = () => {
  const [mem,setmember]=useState()
  useEffect(()=>{
    const set = async () => {
        try {
            const result=await axios.get("http://localhost:5000/membersDetail")
            setmember(result.data)
            console.log(result.data)
            // if (response.data.success) {
            // }
        } catch (error) {
            console.error("Error checking auth:", error);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    };
    set()
   },[])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md flex flex-col items-center">
      <img
        src={mem.image}
        alt={mem.name}
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{mem.name}</h2>
      <h3 className="text-red-500 text-lg mb-4">{mem.roll}</h3>
      <p className="text-gray-700 text-center mb-4">
        {mem.about}
      </p>
      <a href={mem.instagram} className="text-blue-500">@_ACTHOMAS</a>
    </div>
  </div>
  );
};

export default Card;
// const [members,setmembers]=useState()
//     useEffect(() => {
//         const set = async () => {
//             try {
//                 const result=await axios.get("http://localhost:5000/getSaveTimer")
//                 setmembers(result.data)
//                 console.log(result.data)
//                 // if (response.data.success) {
//                 // }
//             } catch (error) {
//                 console.error("Error checking auth:", error);
//             }
//         };
//         set()
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);