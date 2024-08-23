import React,{useState} from "react";
import "./loopofQuestions.css"
// import { useGlobalcontext } from '../component/contex.js';

const QuizBank =()=>{

    const [currentQuestion,setCurrentQuestion]= useState(0);
    const [selectedOptions,setSelectedOptions] = useState({});
    const [marks,setMarks] =useState(0);

    const questions = [
        {id:1,question:"Capital of India",options1:"Delhi",options2:"Mumbai",options3:"Agra",options4:"Chennai",answer:"Delhi"},
        {id:2,question:"Capital of Andhra Pradesh",options1:"Delhi",options2:"Amaravathi",options3:"Agra",options4:"Chennai",answer:"Amaravathi"},
        {id:3,question:"Capital of Telangana",options1:"Delhi",options2:"Mumbai",options3:"Hyderabad",options4:"Chennai",answer:"Hyderabad"},
        {id:4,question:"Capital of Tamil Nadu",options1:"Kolkata",options2:"Mumbai",options3:"Agra",options4:"Chennai",answer:"Chennai"},
        {id:5,question:"Capital of Karnataka",options1:"Bengaluru",options2:"Mumbai",options3:"Agra",options4:"Chennai",answer:"Bengaluru"},
    ]

    console.log(questions);
    console.log(questions[0].question);


    const previousQuestion = (e)=>{
      console.log(questions.length)
        if(currentQuestion>0 && currentQuestion < questions.length ){
          setCurrentQuestion(currentQuestion-1);
        }
       
     }
     
     const nextQuestion =(e) =>{
      if(currentQuestion>=0 && currentQuestion < questions.length-1){
        setCurrentQuestion(currentQuestion+1);
      }
     }
    
const x= questions.length;

const spans = [];

const numberClicked =(i) =>{
  setCurrentQuestion(i-1);
}

const addMarks= (ans)=>{
  if(ans===questions[currentQuestion].answer){

    console.log("nfdj",ans);
    setMarks(marks+1);
  }
}

// Use a for loop to generate the span elements
for (let i = 1; i <= x; i++) {
  spans.push(
    <span className='qno' key={i} onClick= {()=>numberClicked(i)}>
      {i}
    </span>
  );
}

const questionOptClicked = (optionId) => {
  setSelectedOptions((prev) => ({
    ...prev,
    [currentQuestion]: optionId,
  }));
  let n= document.getElementsByClassName('qno');
  n=n[currentQuestion];

  n.style.backgroundColor='green';
  
  // if(questions[currentQuestion])


  
  console.log(marks);
};



    return(
<>
<div className="body">
        <h2 >Inquiztive Trivia Nights</h2 >
        <div className='particpant-details'>
            <div className='participants-names'>
              <ul>
                <li>Particpant I</li>
                <li>Participant II</li>
                <li>email</li>
                </ul>
            </div>
        </div>

        <div className="quiz">
            <div className='question-numbers'>
                      {spans}
            </div>
            <div class=""></div>
            <div className="question-card">
                <div className="question-text">
                    <h3 className='quiz-question'>{questions[currentQuestion].question}</h3>
                </div>
            

            <div className="options">
                <ul className="list-options">
              {  questions[currentQuestion].options1 &&
         <>
                <li id ={`options1_${questions[currentQuestion].id}`}
                   onClick={(e)=>questionOptClicked(e.target.id,questions[currentQuestion].options1)}
                   className='option'
                   style={{
                     backgroundColor: selectedOptions[currentQuestion] === `options1_${questions[currentQuestion].id}` ? 'green' : 'initial',
                        }}
                >

                {questions[currentQuestion].options1}

               </li>
        </>
        }

       { questions[currentQuestion].options2 &&
         <>
                <li id ={`options2_${questions[currentQuestion].id}`}
                   onClick={(e)=>questionOptClicked(e.target.id, questions[currentQuestion].options2)}
                   className='option'
                   style={{
                     backgroundColor: selectedOptions[currentQuestion] === `options2_${questions[currentQuestion].id}` ? 'green' : 'initial',
                        }}
                >

                {questions[currentQuestion].options2}

               </li>
        </>}
        

        {questions[currentQuestion].options3 &&
         <>
                <li id ={`options3_${questions[currentQuestion].id}`}
                   onClick={(e)=>questionOptClicked(e.target.id,questions[currentQuestion].options3)}
                   className='option'
                   style={{
                     backgroundColor: selectedOptions[currentQuestion] === `options3_${questions[currentQuestion].id}` ? 'green' : 'initial',
                        }}
                >

                {questions[currentQuestion].options3}

               </li>
        </>}
        

        {    questions[currentQuestion].options4 &&
         <>
                <li id ={`options4_${questions[currentQuestion].id}`}
                   onClick={(e)=>questionOptClicked(e.target.id,questions[currentQuestion].options4)}
                   className='option'
                   style={{
                     backgroundColor: selectedOptions[currentQuestion] === `options4_${questions[currentQuestion].id}` ? 'green' : 'initial',
                        }}
                >

                {questions[currentQuestion].options4}

               </li>
        </>
        }

                </ul>
            </div>

        <div className="buttons">
           <button id='prev-question' onClick={previousQuestion}>
            previous
          </button>

           <button id='next-question' onClick={nextQuestion}>
            next
          </button>
          </div>      
          </div> 

        </div>

        </div>
       </>
      
    )
}
export default QuizBank;