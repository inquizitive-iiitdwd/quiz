import React, { useState, useEffect } from "react";
import { useGlobalcontext } from "../component/contex.js";
import Nav from "./Nav.js";
import clubimg from "../image/st.png";
import Footer from "./footer.js";

const AboutUs = () => {
  const [activeCard, setActiveCard] = useState(0);
  const { members } = useGlobalcontext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight - windowHeight;
      const cardIndex = Math.floor(
        (scrollPosition / totalHeight) * (members.length - 1)
      );
      setActiveCard(cardIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [members]);

  return (
    <div>
      <Nav />
      <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto px-4 py-8 min-h-screen">
        <div className=" text-white ml-10 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-teal-400 animate-fadeInLeft">
              What is InQuizitive all about?
            </h2>
            <p className="text-xl mb-4 animate-fadeIn">
            At first impression, it might seem like we simply exchange random trivia and bestow accolades on those who know the answers. While that's part of the fun, we actually dive deep into a vast array of subjects, from familiar territory to obscure niches. Our quizmasters craft questions that challenge your knowledge and encourage logical thinking. So whether you're a trivia titan or a curious newcomer, join us on this exhilarating journey of discovery!
            </p>
            <p className="text-xl mb-4 animate-fadeIn">
            We believe quizzing is more than just a test of memory—it's a dynamic way to explore the world around us, connect with others, and ignite intellectual curiosity. Our club isn't confined to just one type of quiz. We experiment with different formats, themes, and styles, making sure there's something for everyone. From pop culture and history to science and literature, no topic is off-limits.
            </p>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-20">
            <img
              src={clubimg}
              alt="Inquizitive Club"
              className="rounded-lg border border-white shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:translate-y-2"
              style={{
                boxShadow:
                  "0px 10px 20px rgba(0, 0, 0, 0.5), 0px 6px 10px rgba(255, 255, 255, 0.3)",
                borderRadius: "20px",
              }}
            />
          </div>
        </div>

        <div className="   text-white ml-10 mt-12 animate-fadeInRight">
          <h2 className="text-3xl font-bold mb-4 text-teal-400">
            Find your best fit with our College Quiz!
          </h2>
          <p className="text-xl b-4">
            Choosing a college is tough. A lot goes into the decision, and
            everyone has different priorities. You might be looking for a school
            with the best academics and top-notch professors, while your friend
            wants a great party scene in a warm climate.
          </p>
          <p className="text-xl mb-4">
            And let's be honest — not everyone knows what they want in a school
            right away. Your parents and teachers want you to get into a “good
            college,” but have you thought about what that means? If the answer
            is no, don't worry — you're not alone.
          </p>
          <p className="text-xl mb-4">
            That's why Niche created the College Quiz, a quick and easy survey
            that zeroes in on what matters to you.
          </p>
        </div>

        <div className="relative">
          {members.map((mem, index) => (
            <div
              key={index}
              className={` transition-transform duration-500 transform ${
                activeCard === index
                  ? "translate-x-0"
                  : activeCard > index
                  ? "-translate-x-full"
                  : "translate-x-full"
              } w-full md:w-1/2 px-4 absolute top-0 left-1/2 transform -translate-x-1/2`}
              style={{ top: `${index * 200}px` }}
            >
              <div className="bg-gray-900 flex justify-center items-center h-screen">
                <div className="bg-gradient-to-r from-teal-700 to-teal-500 p-6 rounded-lg shadow-lg max-w-md flex flex-col items-center">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.yZ_zkgk-tiPfm8-L8qjnpwHaEM&pid=Api&P=0&h=180"
                    alt={mem.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {mem.name}
                  </h2>
                  <h3 className="text-red-500 text-lg mb-4">{mem.roll}</h3>
                  <p className="text-white text-center mb-4">{mem.about}</p>
                  <a href={mem.instagram} className="text-blue-500">
                    @_ACTHOMAS
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

          

      <Footer />
    </div>
  );
};

export default AboutUs;
