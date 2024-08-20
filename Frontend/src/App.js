import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Clientlogin from "./component/clientlogin.js"; 
import Questiondemo from "./component/Questiondemo.js";
import Adminlogin from "./component/adminloginpage.jsx";
import Home from "./component/Home.js";
import Timer from "./component/Timer.js";
import Showqestion from "./component/showquestion.js";
import Sign from "./component/sign.js"
import Buzzer from "./component/buzzer.js"
import Adminebuzzer from "./component/adminebuzzer.js";
import Notlogin from "./component/notlogin.js";
import Createquizquestion from "./component/createquizquestion.js"
import Dashboard from './component/Dashboard.js'
import AboutUs from "./component/About_us.js";
import Event from "./component/event.js"
import VerifyEmail from './component/verifymail.js'
import EventRegistration from "./component/eventRegistration.js";
// import Emailverificationforpasswordforgot from './component/Resetpassword.js'


function App() {
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route 
         path="/" element={<Home/>}
        ></Route>
        {/* <Route 
         path="/home" element={<Home/>}
        ></Route> */}
        
          <Route  path="/Questiondemo" element={<Questiondemo/>}>
          </Route>
          <Route  path="/eventreg" element={<EventRegistration/>}>
          </Route>
          
          {/* <Route  path="/emailverificationforpasswordforgot" element={<Emailverificationforpasswordforgot.js/>}>
          </Route> */}
          <Route  path="/Adminlogin" element={<Adminlogin/>}>
          </Route>
          <Route  path="/event" element={<Event/>}>
          </Route>
          <Route  path="/Clientlogin" element={<Clientlogin/>}>
          </Route>
          <Route  path="/Timer" element={<Timer/>}>
          </Route>
          <Route  path="/sign" element={<Sign/>}>
          </Route>
          <Route  path="/showquestion" element={<Showqestion/>}>
          </Route>
          <Route  path="/buzzer" element={<Buzzer/>}>
          </Route>
          <Route  path="/adminebuzzer" element={<Adminebuzzer/>}>
          </Route>
          <Route  path="/About_us" element={<AboutUs/>}>
          </Route>
          <Route  path="/verifyemail" element={<VerifyEmail/>}>
          </Route>
          <Route 
         path="/notlogin" element={<Notlogin/>}
        ></Route>
        <Route 
         path="/CreatequizQuestiondemo" element={<Createquizquestion/>}
        ></Route>
        <Route 
         path="/Dashboard" element={<Dashboard/>}
        ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//:roomid dynamic generated
export default App;
