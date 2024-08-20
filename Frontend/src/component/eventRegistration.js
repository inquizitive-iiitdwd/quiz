import React, {useState} from 'react';
import toast,{Toaster} from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventRegistration.css'


const EventRegistration = ()=>{

  // const navigate= useNavigate();
  const [teamLeaderName, setteamLeaderName] = useState('');
  const [teamLeaderId, setteamLeaderId] = useState('');
  const [leadMailId, setleadMailId] = useState('');
  const [teamName, setteamName] = useState('');
  const [MemberI, setMemberI] = useState('');
  const [MemberIid, setMemberIid] = useState('');
  const [MemberII, setMemberII] = useState('');
  const [MemberIIid, setMemberIIid] = useState('');
  const [validMailmsg,setvalidMailmsg] =useState('');
  


 const emailVerification = (email) =>{
  
  const m= document.getElementById('mail-msg');
  const mail = document.getElementById('email');

  if(email.slice(8)===('@iiitdwd.ac.in')){
    
      m.style.color="green";
      mail.classList.remove('mailOutline');

    
     
    setleadMailId(email.toLowerCase());

       setvalidMailmsg('valid');
  }
  else{
      m.style.color="red";
      setvalidMailmsg('invalid');
  }
 };


  const register= async (e) =>{
    // console.log(teamLeaderName,teamLeaderId,leadMailId,teamName,MemberI ,MemberIid, MemberII, MemberIIid);
      try{

        const set = new Set();
        set.add(teamLeaderId.toLowerCase());
        set.add(MemberIid.toLowerCase());
        set.add(MemberIIid.toLowerCase());
        
        const members = [...set];
        console.log(members,members.length)
      

       if(!teamLeaderName&&!teamLeaderId&&!leadMailId&&!teamName&&!MemberI &&MemberIid&& MemberII&&! MemberIIid) {
             alert("Please enter all the details");       
       }
       else if(teamLeaderName&&teamLeaderId&&leadMailId&&teamName&&MemberI &&MemberIid&& MemberII&& MemberIIid){
        try{

        if(teamLeaderId.length!==8){
          toast.error("Invalid Team Lead ID");
          return;
        }
        else if(MemberIid.length!==8 || MemberIIid.length!==8){ 
          toast.error("Invalid Team Member's ID");
          return;
        }
        else if (!leadMailId.endsWith('@iiitdwd.ac.in')){
          toast.error("Invalid Email-ID");
          return;
        }
        else if((leadMailId.slice(0,8)).toLowerCase()!==teamLeaderId.toLowerCase()){
          toast.error("Team Lead mail ID doesnot match with the team lead ID");
          return;
        }
        else if (members.length!==3){
          toast.error("All the team mates needs to be different");
          return;
        }

        
        const lidx = members.findIndex(member => member === teamLeaderId.toLowerCase());
        const mem1idx = members.findIndex(member => member === MemberIid.toLowerCase());
        const mem2idx = members.findIndex(member => member === MemberIIid.toLowerCase());

      
           const data= {
              teamLeaderName  :teamLeaderName ,
              teamLeaderId:members[lidx],
              leadMailId  :leadMailId ,
              teamName:teamName ,
              MemberI:MemberI  ,
              MemberIid:members[mem1idx] ,
              MemberII : MemberII ,
              MemberIIid : members[mem2idx]
            }
            console.log(data)
            const response = await axios.post("http://localhost:5000/events/eventRegistration", { data }, { withCredentials: true });
            console.log(response);

            if(response.data.ok){
               toast.success("Your team is registered successfully");
            }
            else{
               if(response.data.RteamName){
                toast.error("Team Name already exists");
               }
              else if(response.data.RmailID){
                toast.error("Email ID is repeated");
              }
              else if(response.data.Rteamlead){
                toast.error("Team lead has registered");
              }
              else if(response.data.RteamMates){
                toast.error("Team Mates have already registered");
              }
              else{
                // setteamLeaderName('');
                // setteamLeaderId('');
                // setleadMailId('');
                // setteamName('');
                // setMemberI('');
                // setMemberIid('');
                // setMemberII('');
                // setMemberIIid('');
                toast.error("Failed to Login")
              }

            }
        }
        catch(error){
          console.error("Error logging in:", error);
          toast.error("Failed to log in. Please try again.");
        }
       } 
       else{
       alert("Kindly enter all the details");
       }
      }
      catch(error){
        console.log(error);
      }
  }

const validMail = (e)=>{
    
   const  newmail = e.target.value;
    if(newmail.length>0){
      e.target.style.marginBottom ="0px"; 
      e.target.classList.add('mailOutline');
    }
    if(newmail.length === 0){
      e.target.style.marginBottom ="20px"; 
    }
    setleadMailId (newmail);
    emailVerification(newmail);
    
}

    return(
        <>
          <div>
        <h1 id="eventName" >Event Names</h1>
        <form>
            
            <input className='form-input' autoFocus autoComplete="on" type="text" required placeholder="Team Leader Name"  value={teamLeaderName}  onChange={(e)=>setteamLeaderName(e.target.value)}/>
            
            <input className='form-input' autoComplete="on" type="text" placeholder="Team Leader ID " required  value={teamLeaderId}  onChange={(e)=>setteamLeaderId(e.target.value)}/>

            <input className='form-input' id="email"  autoComplete="on" type="text" placeholder="Team Leader mail " required  value={leadMailId}  onChange={validMail}  />
            <span id='mail-msg'><strong>{validMailmsg}</strong></span>

            <input className='form-input' autoComplete="on" type="text" placeholder="Team  Name " required  value={teamName}  onChange={(e)=>setteamName(e.target.value)}/>

            <input className='form-input' autoComplete="on" type="text" placeholder="Member I Name " required  value={MemberI}  onChange={(e)=>setMemberI(e.target.value)}/>

            <input className='form-input' autoComplete="on" type="text" placeholder="Member I Id " required  value={MemberIid}  onChange={(e)=>setMemberIid(e.target.value)}/>

            <input className='form-input' autoComplete="on" type="text" placeholder="Member II Name" required  value={MemberII}  onChange={(e)=>setMemberII(e.target.value)}/>

            <input className='form-input' autoComplete="on" type="text" placeholder="Member II Id" required value={MemberIIid}  onChange={(e)=>setMemberIIid(e.target.value)}/>

            <button id="btn" type="button" onClick={register}>Submit</button>
            <Toaster/>
        </form>
   
    </div>

        </>
    );

}
export default EventRegistration;