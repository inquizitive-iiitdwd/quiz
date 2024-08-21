import express from 'express';
import {addquizname, questionForonequiz,Questionbankname,GoToQuizSetUp,addSaveTimer,delete_quiz_setup,getSaveTimer} from '../controllers/quizsetupController.js';

const router = express.Router();

router.post("/addquizname",addquizname);
router.get("/questionForonequiz",questionForonequiz);
router.post("/Questionbankname",Questionbankname);
router.post("/GoToQuizSetUp",GoToQuizSetUp);
router.post("/addSaveTimer",addSaveTimer);
router.post("/delete_quiz_setup",delete_quiz_setup);
router.post("/getSaveTimer",getSaveTimer);

export default router;
