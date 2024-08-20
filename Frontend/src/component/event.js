import React from 'react';

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-4">
        <nav>
          <ul>
            <li className="font-bold text-gray-300 mb-2">My Profile</li>
            <li className="text-gray-400">Security</li>
            <li className="text-gray-400">Teams</li>
            <li className="text-gray-400">Team Member</li>
            <li className="text-gray-400">Notifications</li>
            <li className="text-gray-400">Billing</li>
            <li className="text-gray-400">Data Export</li>
            <li className="text-red-500">Delete Account</li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="w-3/4 p-8">
        {/* Header */}
        <h1 className="text-3xl text-gray-300 font-semibold mb-8">My Profile</h1>

        {/* Profile and Personal Information */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="bg-gradient-to-r from-teal-700 to-teal-500 shadow-md rounded-lg p-6 w-full lg:w-1/3">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150" // Replace with actual image source
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-300">Michael Rodriguez</h2>
              <p className="text-gray-300">Product Designer</p>
              <p className="text-gray-300">Los Angeles, California, USA</p>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="bg-gradient-to-r from-teal-700 to-teal-500 shadow-md rounded-lg p-6 w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300">First Name</p>
                <p className="font-medium text-gray-300">Michael</p>
              </div>
              <div>
                <p className="text-gray-300">Last Name</p>
                <p className="font-medium text-gray-300">Rodriguez</p>
              </div>
              <div>
                <p className="text-gray-300">Email Address</p>
                <p className="font-medium text-gray-300">Rodriguez@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-300">Phone</p>
                <p className="font-medium text-gray-300">(213) 555-1234</p>
              </div>
              <div>
                <p className="text-gray-300">Bio</p>
                <p className="font-medium text-gray-300">Product Designer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 shadow-md rounded-lg p-6 w-full lg:w-2/3 mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300">Country</p>
              <p className="font-medium text-gray-300">United States of America</p>
            </div>
            <div>
              <p className="text-gray-300">City / State</p>
              <p className="font-medium text-gray-300">California, USA</p>
            </div>
            <div>
              <p className="text-gray-300">Postal Code</p>
              <p className="font-medium text-gray-300">ERT 62574</p>
            </div>
            <div>
              <p className="text-gray-300">TAX ID</p>
              <p className="font-medium text-gray-300">AS56417896</p>
            </div>
          </div>
        </div>
      </div>
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