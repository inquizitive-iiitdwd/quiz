import db from "../config.js";
import fs from "fs";
import multer from "multer";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwQcCNFhv2pjZctwh0mmO4lcTFN6sDHrc",
  authDomain: "quizmaster-b0faf.firebaseapp.com",
  projectId: "quizmaster-b0faf",
  storageBucket: "gs://quizmaster-b0faf.appspot.com",
  messagingSenderId: "620399637174",
  appId: "1:620399637174:web:11397e200c8fc4c7866c17",
  measurementId: "G-6MD1EF1R78"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp);

// Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to save uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use original file name
//   }
// });
const upload = multer({ dest: 'uploads/' });


// Express route handler for uploading media questions

upload.single('noob')

export const uploadMediaQuestion = async (req, res) => {
  const file = req.file;
  console.log("upload",req.body,file)
  const mediaType=req.body.mediaType;
  const questionId=req.body.questionId;
  var fileUrl;
  if (!file) {
  return res.status(400).send('No file uploaded.');
  }
  try {
  // Read the file and convert it to a buffer
  const fileBuffer = fs.readFileSync(file.path);
  // Firebase storage reference
  const storage = getStorage();
  if(mediaType==='image'){
  //console.log("image")
  const storageRef = ref(storage, `image/${file.originalname}`);
  await uploadBytes(storageRef, fileBuffer);
  fileUrl = await getDownloadURL(storageRef);
  }
  else if(mediaType==='audio'){
  //console.log("audio")
  const storageRef = ref(storage, `audio/${file.originalname}`);
  await uploadBytes(storageRef, fileBuffer);
  fileUrl = await getDownloadURL(storageRef);
  }
  else if(mediaType==='video'){
  const storageRef = ref(storage, `video/${file.originalname}`);
  await uploadBytes(storageRef, fileBuffer);
  fileUrl = await getDownloadURL(storageRef);
  }
  //console.log("file",fileUrl)
  // Insert file reference into the database
  await db.query('INSERT INTO quiz_question(question_id,file_type,file_url) VALUES ($1, $2,$3)', [questionId,mediaType,fileUrl]);
  // Clean up the uploaded file
  
  fs.unlinkSync(file.path);
  res.status(200).json({ message: 'File uploaded successfully.' });// getting error
  //file ko gip me kar ke save kar sakte hai
  } catch (err) {
  console.error('Error uploading file:', err);
  res.status(500).send('Error uploading file.');
  }
  };



// File to store quiz name
const quizNameFilePath = "./quizname2.txt";

// Function to set quiz name to a file
export const setQuizNameToFile = (req, res) => {
  const quizName = req.body.name;
  console.log("setQuizName",quizName)
  if (!quizName) {
    return res.status(400).json({ message: "Quiz name is required" });
  }

  fs.writeFileSync(quizNameFilePath, quizName, "utf8");
  res.status(200).json({ message: 'Quiz set  successfully' });
};

// Function to get questions based on the quiz name
export const getQuestion = async (req, res) => {
  try {
    if (!fs.existsSync(quizNameFilePath)) {
      return res.status(400).json({ message: "Quiz name file not found" });
    }

    const quizName = fs.readFileSync(quizNameFilePath, "utf8");
    console.log("qizName getquestion",quizName)
    const result = await db.query('SELECT * FROM quiz_question WHERE quizname = $1', [quizName]);
    
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error getting questions:', err);
    res.status(500).json({ error: 'Failed to get questions' });
  }
};

// Function to delete a question
export const deleteQuestion = async (req, res) => {
  const questionId = req.body.question_id;

  if (!questionId) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    await db.query("DELETE FROM quiz_question WHERE question_id = $1", [questionId]);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};