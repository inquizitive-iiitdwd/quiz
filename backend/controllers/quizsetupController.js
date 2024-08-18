import db from "../config.js";
import fs from "fs";
let quizName = null;
const quizNameFilePath = "./quizname.txt";

if (fs.existsSync(quizNameFilePath)) {
  quizName = fs.readFileSync(quizNameFilePath, "utf8");
}
const saveQuizNameToFile = (name) => {
  fs.writeFileSync(quizNameFilePath, name, "utf8");
}

export const addquizname =async(req,res)=>{
  console.log("addquizname",req.body.data.name);
  quizName = req.body.data.name;
  saveQuizNameToFile(quizName);
  try{
    await db.query("INSERT INTO quiz_setup(name) VALUES ($1)", [req.body.data.name]);
    res.status(200).send('Data updated successfully');
  }catch(err){
    //console.log("your err is",err)
  }
  }

export const questionForonequiz=async(req,res)=>{
  try {
    console.log(quizName)
    const result = await db.query('SELECT * FROM quiz_question WHERE quizname=$1',[quizName]);
     res.json(result.rows);
    } catch (err) {
    console.error('Error getting questions:', err);
    res.status(500).json({ error: 'Failed to get questions' });
    }
}
  
  
  

  export const Questionbankname= async(req,res)=>{
    console.log("addquizname",req.body.data.name);
    quizName = req.body.data.name;
    saveQuizNameToFile(quizName);
    res.status(200).send('Data updated successfully');
    }
  
  
  
export const GoToQuizSetUp=async(req,res)=>{
    //console.log(req.body.data)
    const quizName = req.body.data;
  }
  
  export const addSaveTimer=async(req,res)=>{
    console.log("addSaveTimer",req.body)
    const {quizTime,quizDate,saveTimerquizname}=req.body;
    await db.query("UPDATE quiz_setup SET time=$1, date=$2 WHERE name=$3",[quizTime,quizDate,saveTimerquizname])
    res.status(200).send({quizTime,quizDate,saveTimerquizname})
    }
    
    export const getSaveTimer=async(req,res)=>{
      console.log("getsavetimer")
      try{
        const result= await db.query("SELECT * FROM quiz_setup");
      console.log("getsavetimer",result.rows);
        res.status(200).json(result.rows);
      }catch(e){
        console.log(e)
      }
    
    }
    
    export const delete_quiz_setup=async(req,res)=>{
    console.log("deletequizname",req.body.data)
    try{
    await db.query("DELETE FROM quiz_setup WHERE name=$1",[req.body.data])
    } catch (err) {
    console.error('Error getting questions:', err);
    res.status(500).json({ error: 'Failed to get questions' });
    }
    }