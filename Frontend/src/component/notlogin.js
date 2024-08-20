import React from 'react';

const Notlogin = () => {
  return (
    <div className="bg-gray-900 min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-6xl font-bold">Noooo</h1>
      <h2 className="text-4xl font-semibold mt-4">You are not login/signin</h2>
      <div className="mt-8">
        {/* <img
          src="https://tse1.mm.bing.net/th?id=OIP.o0KLLBPwyDSKo8nx_YvFlwAAAA&pid=Api&P=0&h=180" 
          alt="Frog on a rocket"
          className="mx-auto mb-8"
        /> */}
      </div>
      <p className="text-xl mb-8">
        Sorry, Please login/sign first
        <br />
        Try starting again from the homepage.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
      >
        Back to Home
      </a>
    </div>
  );
};

export default Notlogin;
