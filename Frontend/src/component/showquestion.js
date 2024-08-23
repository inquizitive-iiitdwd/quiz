import React, { useState, useEffect } from 'react';
import { useGlobalcontext } from '../component/contex.js';

function Showquestion() {
  const { questions } = useGlobalcontext();
  const [myArray, setMyArray] = useState([]);
  const [marks, setMarks] = useState(0);

  const handleOptionChange = (id, optionValue, answer) => {
    // Find the question object by id
    const selectedQuestion = questions.find(q => q.id === id);
    console.log("Answer of the question:", answer, optionValue);

    if (answer === optionValue) {
      setMarks(prevMarks => prevMarks + 1);
    }

    // Update myArray with the selected option value
    setMyArray(prevArray => [...prevArray, { id, selectedOption: optionValue }]);
  };

  const handleFinalSubmit = () => {
    console.log('Final submit', myArray);
    console.log("Marks:", marks);
  };
console.log(questions)
  return (
    <>
      <div className='bg-gradient-to-r from-[#2e1a47] to-[#624a82]'>
        {questions.map((item) => {
          const { id, question, options1, options2, options3, options4, answer, discription, image,file_type,file_url } = item;
          return (
            <div key={id} className='question-container'>
              <h2>{id}. {question}</h2>
              { file_type==='image' && (<img src= {file_url} className="w-full h-auto max-w-md mb-4 border rounded shadow-md" />) }
              { file_type==='audio' && <audio  src={file_url} controls autoPlay/> }
              {file_type==='video' && <video width="750" height="500" controls > <source src={file_url} type="video/mp4"/></video>}
              {image && <img src={image}  className="w-full h-auto max-w-md  mb-4 border rounded shadow-md" />}
              {discription && <p>{discription}</p>}
              <div className=''>
              {options1 && (
                <>
                  <input type="radio" id={`options1_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options1, answer)} />
                  <label htmlFor={`options1_${id}`}>{options1}</label><br />
                </>
              )}</div>
              <div>
              {options2 && (
                <>
                  <input type="radio" id={`options2_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options2, answer)} />
                  <label htmlFor={`options2_${id}`}>{options2}</label><br />
                </>
              )}</div>
              <div>
              {options3 && (
                <>
                  <input type="radio" id={`options3_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options3, answer)} />
                  <label htmlFor={`options3_${id}`}>{options3}</label><br />
                </>
              )}</div>
              <div>
              {options4 && (
                <>
                  <input type="radio" id={`options4_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options4, answer)} />
                  <label htmlFor={`options4_${id}`}>{options4}</label><br />
                </>
              )}</div>
            </div>
          );
        })}
      </div>
      <button onClick={handleFinalSubmit}>Submit</button>
    </>
  );
}

export default Showquestion;
