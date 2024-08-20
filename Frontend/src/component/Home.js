import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./Nav.js";
import clubimg from "../image/st.png";
import Footer from "./footer.js";

const images = [
  "https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.p7zv9rbBiVUaj_BQQX8C6gHaFx&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th?id=OIP.CJeJjqEKLIsbfEc8qxa9YQHaHa&pid=Api&P=0&h=180",
];

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/readtoken", {
          withCredentials: true,
        });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };
    checkAuth();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto p-6 flex justify-between items-center text-white min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left py-10 px-4 lg:px-6">
        <div className="w-full ml-20 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white-400 animate-fadeIn">
          <p>Welcome to</p> 
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white-400 animate-fadeIn">
          <p>Inquizitive Club</p>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fadeIn">
            Where Curiosity Meets Challenge!
          </p>
          <div className="space-x-4">
            <button
              onClick={() => handleNavigation("/buzzer")}
              className="bg-black text-white px-6 py-3 rounded-lg transition transform duration-300 hover:bg-teal-400 hover:scale-105"
            >
              Buzzer Room
            </button>
            <button
              onClick={() => handleNavigation("/classroom")}
              className="bg-white text-black px-6 py-3 rounded-lg transition transform duration-300 hover:bg-gray-300 hover:scale-105"
            >
              Class Room
            </button>
          </div>
        </div>
        {/* <div className="lg:w-1/2 mt-8 lg:mt-0 ml-5">
          <img
            src={clubimg}
            alt="Inquizitive Club"
            className="rounded-lg border border-white shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:translate-y-2"
            style={{
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5), 0px 6px 10px rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
            }}
          />
        </div> */}
      </div>

      {/* Question of the Week Section */}
      <section className="py-12 bg-gray-700 mx-10 my-8 rounded-lg shadow-lg animate-slideIn">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Question of the Week</h2>
          <p className="text-xl">What is the capital of Australia?</p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section
        className="relative py-12 mx-10 my-8 "
        style={{
          backgroundImage:
            "url('https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our upcoming events to engage with like-minded individuals and
            expand your knowledge.
          </p>
          <button
            className="bg-white text-black px-6 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-gray-300"
            style={{ maxWidth: "200px" }}
          >
            <span className="mr-2">Register</span>
            <FaExternalLinkAlt />
          </button>
        </div>
      </section>

      {/* Image Gallery */}
      <div className="flex justify-center mt-12 space-x-4 overflow-x-auto px-2 mb-12">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="w-60 h-65 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;


  // import React, { useEffect, useState } from "react";
  // import { FaExternalLinkAlt } from "react-icons/fa";
  // import { useNavigate } from "react-router-dom";
  // import axios from "axios";
  // import NavBar from "./Nav";
  // import Footer from "./Footer";
  // import clubimg from "../image/st.png";

  // const images = [
  //   "https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180",
  //   "https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180",
  //   "https://tse2.mm.bing.net/th?id=OIP.p7zv9rbBiVUaj_BQQX8C6gHaFx&pid=Api&P=0&h=180",
  //   "https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180",
  //   "https://tse3.mm.bing.net/th?id=OIP.CJeJjqEKLIsbfEc8qxa9YQHaHa&pid=Api&P=0&h=180",
  // ];

  // // Reusable Button Component
  // const Button = ({ onClick, children, styles, ariaLabel }) => (
  //   <button
  //     onClick={onClick}
  //     className={`${styles} px-6 py-3 rounded-lg transition-transform duration-300 focus:outline-none`}
  //     aria-label={ariaLabel}
  //   >
  //     {children}
  //   </button>
  // );

  // // Reusable Section Component
  // const Section = ({ title, children, className, bgImage }) => (
  //   <section
  //     className={`${className} py-12 px-6 rounded-lg shadow-lg relative text-center`}
  //     style={
  //       bgImage
  //         ? {
  //             backgroundImage: `url(${bgImage})`,
  //             backgroundSize: "cover",
  //             backgroundPosition: "center",
  //           }
  //         : {}
  //     }
  //   >
  //     {bgImage && <div className="absolute inset-0 bg-black opacity-50"></div>}
  //     <div className="relative z-10">
  //       <h2 className="text-4xl font-bold mb-4">{title}</h2>
  //       {children}
  //     </div>
  //   </section>
  // );

  // const Home = () => {
  //   const navigate = useNavigate();
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:5000/readtoken", {
  //           withCredentials: true,
  //         });
  //         if (response.data.success) {
  //           setUser(response.data.user);
  //         }
  //       } catch (error) {
  //         console.error("Error checking auth:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     checkAuth();
  //   }, []);

  //   if (loading) {
  //     return (
  //       <div className="flex justify-center items-center min-h-screen text-white">
  //         <p>Loading...</p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto p-6 flex flex-col justify-between min-h-screen">
  //       <NavBar />
  //       <div className="container mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left py-10 px-4 lg:px-6">
  //         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
  //           <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white animate-fadeIn">
  //             Welcome to
  //             <br />
  //             Inquizitive Club
  //           </h1>
  //           <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fadeIn">
  //             Where Curiosity Meets Challenge!
  //           </p>
  //           <div className="space-x-4">
  //             <Button
  //               onClick={() => handleNavigation("/buzzer")}
  //               styles="bg-black text-white hover:bg-teal-400 hover:scale-105"
  //               ariaLabel="Navigate to Buzzer Room"
  //             >
  //               Buzzer Room
  //             </Button>
  //             <Button
  //               onClick={() => handleNavigation("/classroom")}
  //               styles="bg-white text-black hover:bg-gray-300 hover:scale-105"
  //               ariaLabel="Navigate to Class Room"
  //             >
  //               Class Room
  //             </Button>
  //           </div>
  //         </div>
  //         {/* Uncomment and use the club image if needed */}
  //         {/* <div className="lg:w-1/2 mt-8 lg:mt-0 ml-5">
  //           <img
  //             src={clubimg}
  //             alt="Inquizitive Club"
  //             className="rounded-lg border border-white shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:translate-y-2"
  //             style={{
  //               boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5), 0px 6px 10px rgba(255, 255, 255, 0.3)',
  //               borderRadius: '20px',
  //             }}
  //           />
  //         </div> */}
  //       </div>

  //       <Section title="Question of the Week" className="bg-gray-700 mx-10 my-8">
  //         <p className="text-xl">What is the capital of Australia?</p>
  //       </Section>

  //       <Section
  //         title="Upcoming Events"
  //         className="mx-10 my-8"
  //         bgImage="https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180"
  //       >
  //         <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">
  //           Join our upcoming events to engage with like-minded individuals and
  //           expand your knowledge.
  //         </p>
  //         <Button
  //           onClick={() => handleNavigation("/register")}
  //           styles="bg-white text-black hover:bg-gray-300"
  //           ariaLabel="Register for Upcoming Events"
  //         >
  //           <span className="mr-2">Register</span>
  //           <FaExternalLinkAlt />
  //         </Button>
  //       </Section>

  //       <div className="flex justify-center mt-12 space-x-4 overflow-x-auto px-2 mb-12">
  //         {images.map((src, index) => (
  //           <img
  //             key={index}
  //             src={src}
  //             alt={`Gallery image ${index + 1}`}
  //             className="w-60 h-65 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
  //           />
  //         ))}
  //       </div>

  //       <Footer />
  //     </div>
  //   );
  // };

  // export default Home;

