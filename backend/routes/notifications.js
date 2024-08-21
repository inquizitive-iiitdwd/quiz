import express from 'express';
import { sendEmail } from '../controllers/notificationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/email', authenticate, sendEmail);

export default router;
