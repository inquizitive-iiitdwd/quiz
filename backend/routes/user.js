import express from 'express';
import { register, login,logout, getProfile, updateProfile,verifyEmail,forgot_password1,readtoken } from '../controllers/userController.js';
import { authenticate_user } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signin', register);
router.get('/verify/:token',verifyEmail);
router.post('/login', login);
router.get('/logout',logout);
router.get('/readtoken',readtoken)
router.post('/forgot_password',forgot_password1); 
router.post('/reset_password/:id/:token');
router.get('/profile', authenticate_user, getProfile); 
router.put('/profile', authenticate_user, updateProfile);

export default router;
