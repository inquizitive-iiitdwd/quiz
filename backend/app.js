import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/events.js';
import notificationRoutes from './routes/notifications.js';
import admine from './routes/admine.js'
import userRoutes from './routes/user.js';
import createquiz from './routes/creatingquiz.js';
import { GoToQuizSetUp } from './controllers/quizsetupController.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json()); // Use express built-in JSON parser
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
  }));

// Route setup
app.use('/admine', admine);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/notifications', notificationRoutes);
app.use("/quiz",createquiz);
app.use('/quizsetup',GoToQuizSetUp);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
