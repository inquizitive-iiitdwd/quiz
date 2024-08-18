import React, { useState } from 'react';
import { IoMdAddCircle, IoMdAdd } from "react-icons/io";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import Nav from './Nav.js';
import toast, { Toaster } from 'react-hot-toast';
import CreateQuizQuestion from "./createquizquestion.js";

const QuestionDemo = () => {
  const [question, setQuestion] = useState('');
  const [questionId, setQuestionID] = useState('');
  const [questionType, setQuestionType] = useState('Multiple choice');
  const [options, setOptions] = useState(['']);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [answer, setAnswer] = useState('');
  const [description, setDescription] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSection, setUploadSection] = useState(true);
  const [showQuizName, setShowQuizName] = useState(true);
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (e) => setQuestion(e.target.value);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => setOptions([...options, '']);

  const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const handleFinalQuestion = async () => {
    if (!questionId || !question || !answer) {
      toast.error("Please fill all inputs");
    } else {
      const data = { questionId, question, options, description, imgSrc, answer, quizName };
      try {
        const response = await axios.post("http://localhost:5000/quiz/addquestion_to_quiz", { data });
        if (response.status === 200) {
          setQuestions([...questions, data]);
          setQuestion('');
          setQuestionID('');
          setOptions(['']);
          setDescription('');
          setImgSrc('');
          setAnswer('');
          setShowImageInput(false);
          setShowDescriptionInput(false);
          toast.success("Question added successfully!");
        } else {
          toast.error("Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to add question!");
      }
    }
  };

  const handleAddImageClick = () => setShowImageInput(true);

  const handleRemoveImage = () => setShowImageInput(false);

  const handleAddDescriptionClick = () => setShowDescriptionInput(true);

  const handleRemoveDescription = () => setShowDescriptionInput(false);

  const handleImgSrcChange = (e) => setImgSrc(e.target.value);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleAnswerChange = (e) => setAnswer(e.target.value);

  const handleMediaTypeChange = (e) => {
    setSelectedMediaType(e.target.value);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleQuestionIdChange = (e) => setQuestionID(e.target.value);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('mediaType', selectedMediaType);
      formData.append('file', selectedFile);
      formData.append('questionId', questionId);

      try {
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (response.status === 200) {
          setUploadSection(false);
          toast.success("File uploaded successfully!");
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.log("Error uploading file:", error);
        toast.error("Failed to upload file!");
      }
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <>
      <Nav />
      <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] card p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Question ID</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder='only enter integer'
              value={questionId}
              onChange={handleQuestionIdChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Question</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>

          <div className="mt-4">
            <button onClick={handleAddImageClick} className="text-blue-500 hover:underline flex items-center">
              Click here to add image <IoMdAdd className="ml-1" />
            </button>
            {showImageInput && (
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder='Enter image address'
                  value={imgSrc}
                  onChange={handleImgSrcChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <button onClick={handleRemoveImage} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>

          {uploadSection && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-8 w-full">
              <label className="block text-gray-700 font-semibold mb-2">Select Media Type</label>
              <select
                value={selectedMediaType}
                onChange={handleMediaTypeChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              >
                <option value="">-- Select --</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>

              {selectedMediaType && (
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-2">Upload {selectedMediaType}</label>
                  <input
                    type="file"
                    accept={`${selectedMediaType}/*`}
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
              )}

              <button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          )}

          <div className="mt-4">
            <button onClick={handleAddDescriptionClick} className="text-blue-500 hover:underline flex items-center">
              Click here to add Description <IoMdAdd className="ml-1" />
            </button>
            {showDescriptionInput && (
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <button onClick={handleRemoveDescription} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Answer</label>
            <input
              type="text"
              value={answer}
              onChange={handleAnswerChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Options</h3>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <button onClick={() => handleRemoveOption(index)} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            <button onClick={handleAddOption} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
              Add Option <IoMdAddCircle className="ml-1" />
            </button>
          </div>

          <button
            onClick={handleFinalQuestion}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Question
          </button>
        </div>
      </div>
      <Toaster />
      <div className="card p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8">
        <CreateQuizQuestion onQuestionsChange={() => setQuestions([...questions])} />
      </div>
    </>
  );
};

export default QuestionDemo;
