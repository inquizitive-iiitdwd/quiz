import React from "react";
import NavBar from "./Nav.js";
import Footer from "./footer.js";
const ProfilePage = () => {
  return (
    <div>
      <NavBar />
      
      <Footer />
    </div>
  );
};

export default ProfilePage;

// import React from 'react';

// const ProfilePage = () => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-100 p-4">
//         <nav>
//           <ul>
//             <li className="font-bold mb-2">My Profile</li>
//             <li>Security</li>
//             <li>Teams</li>
//             <li>Team Member</li>
//             <li>Notifications</li>
//             <li>Billing</li>
//             <li>Data Export</li>
//             <li className="text-red-500">Delete Account</li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="w-3/4 p-8">
//         <h1 className="text-2xl font-bold mb-4">My Profile</h1>

//         <div className="flex items-center mb-6">
//           <img src="profile-placeholder.jpg" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
//           <div>
//             <h2 className="text-xl font-semibold">Michael Rodriguez</h2>
//             <p className="text-gray-600">Product Designer</p>
//             <p className="text-gray-600">Los Angeles, California, USA</p>
//           </div>
//         </div>

//         <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-600">First Name</p>
//             <p>Michael</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Last Name</p>
//             <p>Rodriguez</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Email address</p>
//             <p>Rodriguez@gmail.com</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Phone</p>
//             <p>(213) 555-1234</p>
//           </div>
//         </div>

//         <h3 className="text-lg font-semibold mt-6 mb-2">Address</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-600">Country</p>
//             <p>United States of America</p>
//           </div>
//           <div>
//             <p className="text-gray-600">City / State</p>
//             <p>California, USA</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Postal Code</p>
//             <p>ERT 62574</p>
//           </div>
//           <div>
//             <p className="text-gray-600">TAX ID</p>
//             <p>AS56417896</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
