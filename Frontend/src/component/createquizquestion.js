import React, { useState, useEffect } from 'react';
import { useGlobalcontext } from './contex.js';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const Createquizquestion = ({ onQuestionsChange }) => {
  const { questions } = useGlobalcontext();
  const [myArray, setMyArray] = useState([]);
  const [questionList, setQuestionList] = useState(questions);
console.log("question",questions)
  useEffect(() => {
    const result= async ()=>{
     const getdata= await axios.get("http://localhost:5000//quizsetup/questionForonequiz");
     console.log("**************");
     console.log('d',getdata.data)
     setQuestionList(getdata.data);
    }
    result();
  }, [questions]);

  const handleUpdate = (question_id) => {
    console.log("Update function not yet implemented.", question_id);
  };

  const handleDelete = async (question_id) => {
    try {
      await axios.post("http://localhost:5000/delete", { question_id });
      setQuestionList(questionList.filter(q => q.question_id !== question_id));
      onQuestionsChange();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleOptionChange = (question_id, optionValue, answer) => {
    const selectedQuestion = questions.find(q => q.question_id === question_id);
    console.log("Answer of the question:", answer, optionValue);
    setMyArray(prevArray => [...prevArray, { question_id, selectedOption: optionValue }]);
  };

  return (
    <div className='bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto p-6'>
      {questionList.map((item) => {
        const { question_id, question, options1, options2, options3, options4, answer, discription, image, file_type, file_url, quizname } = item;
        return (
          <div key={question_id} className='bg-white p-4 rounded-lg shadow-md mb-6'>
            <h4>{quizname}</h4>
            <h2 className='text-xl font-bold mb-2'>{question_id}. {question}</h2>
            {image && (
              <img
                src={image}
                alt="question related"
                className="w-full h-auto max-w-md mb-4 border rounded shadow-md"
              />
            )}
            {file_type === 'image' && (<img src={file_url} className="w-full h-auto max-w-md mb-4 border rounded shadow-md" />)}
            {file_type === 'audio' && <audio src={file_url} controls autoPlay />}
            {file_type === 'video' && <video width="750" height="500" controls><source src={file_url} type="video/mp4" /></video>}
            {discription && <p className='text-gray-700 mb-4'>{discription}</p>}
            <div className='mb-4'>
              {options1 && (
                <div className='mb-2'>
                  <input
                    type="radio"
                    id={`options1_${question_id}`}
                    name={`${question_id}`}
                    onChange={() => handleOptionChange(question_id, options1, answer)}
                    className='mr-2'
                  />
                  <label htmlFor={`options1_${question_id}`} className='text-gray-800'>{options1}</label>
                </div>
              )}
              {options2 && (
                <div className='mb-2'>
                  <input
                    type="radio"
                    id={`options2_${question_id}`}
                    name={`${question_id}`}
                    onChange={() => handleOptionChange(question_id, options2, answer)}
                    className='mr-2'
                  />
                  <label htmlFor={`options2_${question_id}`} className='text-gray-800'>{options2}</label>
                </div>
              )}
              {options3 && (
                <div className='mb-2'>
                  <input
                    type="radio"
                    id={`options3_${question_id}`}
                    name={`${question_id}`}
                    onChange={() => handleOptionChange(question_id, options3, answer)}
                    className='mr-2'
                  />
                  <label htmlFor={`options3_${question_id}`} className='text-gray-800'>{options3}</label>
                </div>
              )}
              {options4 && (
                <div className='mb-2'>
                  <input
                    type="radio"
                    id={`options4_${question_id}`}
                    name={`${question_id}`}
                    onChange={() => handleOptionChange(question_id, options4, answer)}
                    className='mr-2'
                  />
                  <label htmlFor={`options4_${question_id}`} className='text-gray-800'>{options4}</label>
                </div>
              )}
            </div>
            <div className='flex justify-end space-x-4'>
              <button onClick={() => handleUpdate(question_id)} className='flex items-center text-blue-500 hover:text-blue-700'>
                <FaEdit className='mr-1' /> Edit
              </button>
              <button onClick={() => handleDelete(question_id)} className='flex items-center text-red-500 hover:text-red-700'>
                <FaTrashAlt className='mr-1' /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Createquizquestion;
