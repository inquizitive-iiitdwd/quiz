import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizIndex, setEditingQuizIndex] = useState(null);
  const [quizDate, setQuizDate] = useState('');
  const [quizTime, setQuizTime] = useState('');
  const [saveTimerquizname, setTimerqizname] = useState('');
  const [blockedusergmail, setblockedusergmail] = useState('');

  // State for new member details
  const [memberDetails, setMemberDetails] = useState({
    image: '',
    name: '',
    role: '',
    about: '',
    instagram: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/quizsetup/getSaveTimer');
        setQuizzes(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAdminBuzzer = () => {
    navigate('/adminebuzzer');
  };

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizDateChange = (e) => {
    setQuizDate(e.target.value);
  };

  const handleQuizTimeChange = (e) => {
    setQuizTime(e.target.value);
  };

  const QuizBank =async (hello) => {
    const data = { name: hello };
      try {
        const response = await axios.post('http://localhost:5000/Questionbankname', { data });
        if (response.status === 200) {
          navigate('/Questiondemo');
        }
      } catch (error) {
        toast.error('Error saving quiz');
      }
      console.log(hello)
    
  };

  const blockeduser = (e) => {
    console.log(e.target.value);
    setblockedusergmail(e.target.value);
  };

  const sendQuizName = async () => {
    if (quizName) {
      toast.success('Quiz saved successfully');
      setQuizzes([...quizzes, { name: quizName, date: '', time: '' }]);
      setTimerqizname(quizName);
      setQuizName('');
      const data = { name: quizName };
      try {
        const response = await axios.post('http://localhost:5000/addquizname', { data });
        if (response.status === 200) {
        }
      } catch (error) {
        toast.error('Error saving quiz');
      }
    }
  };

  const handleDeleteQuiz = async (index, quizname) => {
    console.log('quizname', quizname);
    const newQuizzes = quizzes.filter((_, quizIndex) => quizIndex !== index);
    setQuizzes(newQuizzes);
    try {
      const data = quizname;
      const response = await axios.post('http://localhost:5000/delete_quiz_setup', { data });
    } catch (error) {
      toast.error('Error deleting quiz');
    }
  };

  const handleSetQuiz = (index, quizname) => {
    setEditingQuizIndex(index);
    setQuizDate(quizzes[index].date || '');
    setQuizTime(quizzes[index].time || '');
  };

  const handleSave_Timer = async () => {
    const data = { saveTimerquizname, quizDate, quizTime };
    console.log(data);
    try{
    const response = await axios.post('http://localhost:5000/addSaveTimer', data);
    const updatedQuizzes = quizzes.map((quiz, index) =>
      index === editingQuizIndex ? { ...quiz, date: quizDate, time: quizTime } : quiz
    );
    setQuizzes(updatedQuizzes);
    setEditingQuizIndex(null);
    setQuizDate('');
    setQuizTime('');
  }catch(err)
  {console.log(err)}
  };

  const handleMemberDetailChange = (e) => {
    const { name, value } = e.target;
    setMemberDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/addMember', memberDetails);
      if (response.status === 200) {
        toast.success('Member added successfully');
        setMemberDetails({
          image: '',
          name: '',
          role: '',
          about: '',
          instagram: '',
          linkedin: '',
          github: '',
        });
      }
    } catch (error) {
      toast.error('Error adding member');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        {quizzes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Created Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold mb-4">{quiz.name}</h3>
                  <p>Date: {quiz.date}</p>
                  <p>Time: {quiz.time}</p>
                  {editingQuizIndex === index ? (
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="QuizDate">Quiz Date</label>
                        <input className="w-full px-4 py-2 bg-gray-700 rounded" type="date" id="QuizDate" pattern="\d{4}-\d{2}-\d{2}" value={quizDate} onChange={handleQuizDateChange} />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="QuizTime">Quiz Time</label>
                        <input className="w-full px-4 py-2 bg-gray-700 rounded" type="time" id="QuizTime" value={quizTime} onChange={handleQuizTimeChange} />
                      </div>
                      <button className="w-full py-2 bg-green-600 rounded hover:bg-green-700 transition-colors" onClick={handleSave_Timer}>Save Timer</button>
                    </div>
                  ) : (
                    <div>
                      {!quiz.date && !quiz.time && (
                        <button className="mt-4 w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors" onClick={() => handleSetQuiz(index)}>Set Timer</button>
                      )}
                      {quiz.date && quiz.time && (
                        <>
                          <button className="mt-4 w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors" onClick={() => QuizBank(quiz.name)}>Go to Quiz bank</button>
                          <button className="mt-4 w-full py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors" onClick={() => handleSetQuiz(index)}>Update</button>
                        </>
                      )}
                      <button className="mt-4 w-full py-2 bg-red-600 rounded hover:bg-red-700 transition-colors" onClick={() => handleDeleteQuiz(index, quiz.name)}>Delete Quiz</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <SectionCard title="Create Quiz">
            <p>Create new quizzes and manage existing ones.</p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="QuizName">Quiz Name</label>
              <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="QuizName" placeholder="Enter Quiz name" value={quizName} onChange={handleQuizNameChange} />
            </div>
            <button className="mt-4 w-full py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors" onClick={sendQuizName}>Create Quiz</button>
          </SectionCard>

          <SectionCard title="Buzzer Room">
            <p>Manage buzzer room settings and participants here.</p>
            <button className="mt-4 w-full py-2 bg-green-600 rounded hover:bg-green-700 transition-colors" onClick={handleAdminBuzzer}>Enter Buzzer Room</button>
          </SectionCard>

          <SectionCard title="Block User">
            <p>Block users from accessing the platform.</p>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="userEmail">User Email</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="email" id="userEmail" placeholder="Enter user email" value={blockedusergmail} />
              </div>
              <button className="w-full py-2 bg-red-600 rounded hover:bg-red-700 transition-colors" onClick={blockeduser}>Block User</button>
            </form>
          </SectionCard>

          <SectionCard title="Update Key">
            <p>Update keys for different services or rooms.</p>
            <button className="mt-4 w-full py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors">Update Key</button>
          </SectionCard>

           <SectionCard title="Add Member">
            <form onSubmit={handleAddMember}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberImage">Image URL</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberImage" name="image" placeholder="Enter image URL" value={memberDetails.image} onChange={handleMemberDetailChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberName">Name</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberName" name="name" placeholder="Enter member name" value={memberDetails.name} onChange={handleMemberDetailChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberRole">Role</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberRole" name="role" placeholder="Enter member role" value={memberDetails.role} onChange={handleMemberDetailChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberAbout">About</label>
                <textarea className="w-full px-4 py-2 bg-gray-700 rounded" id="memberAbout" name="about" placeholder="Enter member about" value={memberDetails.about} onChange={handleMemberDetailChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberInstagram">Instagram</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberInstagram" name="instagram" placeholder="Enter Instagram URL" value={memberDetails.instagram} onChange={handleMemberDetailChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberLinkedIn">LinkedIn</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberLinkedIn" name="linkedin" placeholder="Enter LinkedIn URL" value={memberDetails.linkedin} onChange={handleMemberDetailChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberGithub">GitHub</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberGithub" name="github" placeholder="Enter GitHub URL" value={memberDetails.github} onChange={handleMemberDetailChange} />
              </div>
              <button className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors" type="submit">Add Member</button>
            </form>
          </SectionCard>

          <SectionCard title="Add Events">
            <p>Schedule and manage upcoming events.</p>
            <button className="mt-4 w-full py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">Add Event</button>
          </SectionCard>

         
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Dashboard;
