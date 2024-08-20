import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalcontext } from '../component/contex.js';
import axios from 'axios'

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(2);
  const [isActive, setIsActive] = useState(true);
  const { timer } = useGlobalcontext();
  const navigate = useNavigate();
  console.log(timer)
  const d=new Date();
  let currenttime=d.toLocaleTimeString();
  let currentdate=d.toLocaleDateString();
  console.log(currenttime)
  useEffect(() => {
    let intervalId;  
    if (isActive) {
      intervalId = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          navigate("/showquestion")
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours(hours - 1);
              setMinutes(59);
            } else {
              setMinutes(minutes - 1);
            }
            setSeconds(59);
          } else {
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
    }

  }, [isActive, seconds, minutes, hours]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center text-white">
      <div className='formwapper'>
        <p>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </p>
      </div>
    </div>
  );
}
 export default Timer;
 
// import React, { useState, useEffect } from 'react';

// const Timer = () => {
//   const [timer, setTimer] = useState(false);
//   const [time, setTime] = useState({
//     hour: 0,
//     minute: 0,
//     second: 0,
//     count: 0
//   });

//   useEffect(() => {
//     let interval = null;
//     if (timer) {
//       interval = setInterval(() => {
//         setTime(prevTime => {
//           let { hour, minute, second, count } = prevTime;
//           count++;
//           if (count === 100) {
//             second++;
//             count = 0;
//           }
//           if (second === 60) {
//             minute++;
//             second = 0;
//           }
//           if (minute === 60) {
//             hour++;
//             minute = 0;
//             second = 0;
//           }
//           return { hour, minute, second, count };
//         });
//       }, 10);
//     } else if (!timer && time !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const startTimer = () => {
//     setTimer(true);
//   };

//   const stopTimer = () => {
//     setTimer(false);
//   };

//   const resetTimer = () => {
//     setTimer(false);
//     setTime({ hour: 0, minute: 0, second: 0, count: 0 });
//   };

//   const formatTime = (unit) => unit < 10 ? `0${unit}` : unit;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white">
//       <h1 className="text-4xl font-bold mb-8">
//         Geeks For Geeks <br />
//         Stop Watch
//       </h1>
//       <div className="flex text-6xl font-mono mb-8">
//         <span className="mx-2">{formatTime(time.hour)}</span>
//         <span className="text-2xl mt-2 mx-1">Hr</span>
//         <span className="mx-2">{formatTime(time.minute)}</span>
//         <span className="text-2xl mt-2 mx-1">Min</span>
//         <span className="mx-2">{formatTime(time.second)}</span>
//         <span className="text-2xl mt-2 mx-1">Sec</span>
//         <span className="mx-2">{formatTime(time.count)}</span>
//       </div>
//       <div className="flex space-x-4">
//         <button
//           className="bg-teal-600 hover:bg-teal-700 transition duration-300 py-2 px-4 rounded"
//           onClick={startTimer}
//         >
//           Start
//         </button>
//         <button
//           className="bg-blue-600 hover:bg-blue-700 transition duration-300 py-2 px-4 rounded"
//           onClick={stopTimer}
//         >
//           Stop
//         </button>
//         <button
//           className="bg-red-600 hover:bg-red-700 transition duration-300 py-2 px-4 rounded"
//           onClick={resetTimer}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Timer;
