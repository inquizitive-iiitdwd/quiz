import eventRegistration from "../controllers/eventRegistrationController.js";
import express from "express"

const router = express.Router();


router.post('/eventRegistration',eventRegistration);

 export default router;
