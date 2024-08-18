import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const EventRegistration = () => {
  const [teamLeaderName, setteamLeaderName] = useState('');
  const [teamLeaderId, setteamLeaderId] = useState('');
  const [leadMailId, setleadMailId] = useState('');
  const [teamName, setteamName] = useState('');
  const [MemberI, setMemberI] = useState('');
  const [MemberIid, setMemberIid] = useState('');
  const [MemberII, setMemberII] = useState('');
  const [MemberIIid, setMemberIIid] = useState('');
  const [validMailmsg, setvalidMailmsg] = useState('');

  const emailVerification = (email) => {
    const mail = document.getElementById('email');

    if (email.endsWith('@iiitdwd.ac.in')) {
      setvalidMailmsg('valid');
      mail.classList.remove('border-red-500');
      mail.classList.add('border-green-500');
    } else {
      setvalidMailmsg('invalid');
      mail.classList.remove('border-green-500');
      mail.classList.add('border-red-500');
    }
  };

  const register = async (e) => {
    try {
      const set = new Set();
      set.add(teamLeaderId.toLowerCase());
      set.add(MemberIid.toLowerCase());
      set.add(MemberIIid.toLowerCase());

      const members = [...set];
      console.log(members, members.length);

      if (!teamLeaderName || !teamLeaderId || !leadMailId || !teamName || !MemberI || !MemberIid || !MemberII || !MemberIIid) {
        alert("Please enter all the details");
        return;
      }

      if (teamLeaderId.length !== 8) {
        toast.error("Invalid Team Lead ID");
        return;
      }

      if (MemberIid.length !== 8 || MemberIIid.length !== 8) {
        toast.error("Invalid Team Member's ID");
        return;
      }

      if (!leadMailId.endsWith('@iiitdwd.ac.in')) {
        toast.error("Invalid Email-ID");
        return;
      }

      if ((leadMailId.slice(0, 8)).toLowerCase() !== teamLeaderId.toLowerCase()) {
        toast.error("Team Lead mail ID does not match with the team lead ID");
        return;
      }

      if (members.length !== 3) {
        toast.error("All the team members need to be different");
        return;
      }

      const lidx = members.findIndex(member => member === teamLeaderId.toLowerCase());
      const mem1idx = members.findIndex(member => member === MemberIid.toLowerCase());
      const mem2idx = members.findIndex(member => member === MemberIIid.toLowerCase());

      const data = {
        teamLeaderName: teamLeaderName,
        teamLeaderId: members[lidx],
        leadMailId: leadMailId,
        teamName: teamName,
        MemberI: MemberI,
        MemberIid: members[mem1idx],
        MemberII: MemberII,
        MemberIIid: members[mem2idx]
      };

      console.log(data);
      const response = await axios.post("http://localhost:5000/events/eventRegistration", { data }, { withCredentials: true });
      console.log(response);

      if (response.data.ok) {
        toast.success("Your team is registered successfully");
      } else {
        if (response.data.RteamName) {
          toast.error("Team Name already exists");
        } else if (response.data.RmailID) {
          toast.error("Email ID is repeated");
        } else if (response.data.Rteamlead) {
          toast.error("Team lead has registered");
        } else if (response.data.RteamMates) {
          toast.error("Team Mates have already registered");
        } else {
          toast.error("Failed to register");
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  const validMail = (e) => {
    const newmail = e.target.value;
    setleadMailId(newmail);
    emailVerification(newmail);
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Event Registration</h1>
        <form className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoFocus
            autoComplete="on"
            type="text"
            placeholder="Team Leader Name"
            value={teamLeaderName}
            onChange={(e) => setteamLeaderName(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="on"
            type="text"
            placeholder="Team Leader ID"
            value={teamLeaderId}
            onChange={(e) => setteamLeaderId(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            id="email"
            autoComplete="on"
            type="text"
            placeholder="Team Leader Email"
            value={leadMailId}
            onChange={validMail}
          />
          <span className={`block text-right ${validMailmsg === 'invalid' ? 'text-red-500' : 'text-green-500'}`}>
            {validMailmsg}
          </span>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="on"
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setteamName(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="on"
            type="text"
            placeholder="Member I Name"
            value={MemberI}
            onChange={(e) => setMemberI(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="on"
            type="text"
            placeholder="Member I ID"
            value={MemberIid}
            onChange={(e) => setMemberIid(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="on"
            type="text"
            placeholder="Member II Name"
            value={MemberII}
            onChange={(e) => setMemberII(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="on"
            type="text"
            placeholder="Member II ID"
            value={MemberIIid}
            onChange={(e) => setMemberIIid(e.target.value)}
          />
          <button
            id="btn"
            type="button"
            onClick={register}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <Toaster />
      </div>
    </>
  );
};

export default EventRegistration;
