import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../config.js';
import { sendVerificationEmail,sendresetpassword } from '../services/emailService.js';
//problem email already exit
// User Registration
const saltRounds = 10
export const register = async (req, res) => {
  const { email, phone_number, password, name } = req.body.data;
  console.log(email, phone_number, password, name)
  if ( !email.endsWith('@iiitdwd.ac.in')){
    res.status(400).json("enter your college email")
  }else{
  try {
    // Validate input data
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Check if the email or phone number already exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    console.log(existingUser.rows[0]);
    if (existingUser.rows.length > 0) {
       res.status(409).json({ error: 'Email already exists' });
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, saltRounds);
    const verification_token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create a new user record
    await db.query(
      'INSERT INTO users ( email, phone_number, password_hash, user_name, verification_token) VALUES ($1, $2, $3, $4, $5)',
      [email, phone_number, password_hash, name, verification_token]
    );

    // Trigger Notification Service to send verification email/SMS
    const verification_endpoint=`${process.env.BACKEND_URL}/users/verify/${verification_token}`
    await sendVerificationEmail(email, verification_endpoint);//sending verification link of frontend abhi backend de rahe hai
    return res.status(201).json({ message: 'User registered successfully',verification_endpoint });
  } catch (err) {
    res.status(500).json({ error: err });
  }}
};

export const verifyEmail = async (req,res) => {
  const token=req.params.token;
  console.log(token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  try{
    await db.query('UPDATE users SET verified = TRUE WHERE email = $1', [email]);
    res.status(200).json({ message: 'Email verified successfully.' });
  }catch(error){
    res.status(400).json({ error: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body.data;
  console.log(req.body)
  try {
    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Query for user by email
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];
    console.log(user)
    if (!user) {
      return res.status(403).json({ error: 'Authentication failed' });
    }
    else if(userResult.verified==false){
      res.status(403).json({ error: 'Email not verified' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(403).json({ error: 'Authentication failed' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });
    res.cookie("token", token);
    // Update last login timestamp
    await db.query('UPDATE users SET updated_at = NOW() WHERE id = $1', [user.id]);
     res.json({ message: 'Login successful', token });
     
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const logout= (req, res) => {
  try{
    res.cookie("token", "", { httpOnly: true, sameSite: 'Lax' });
    res.status(200).json("logout successful postman");
  }catch(error){
    res.status(400).json("failed to logout")
  }
  }

export const forgot_password1=async (req,res)=>{
  const {email}=req.body;
 const link=await forgot_password(email);
 if(link==='User not found'){//not good practices
  res.status(404).json(`you entering the wrong gmail`)
 }
 else{
 try{
  //sending email to verify that he wants to update the pasword
  await sendresetpassword (email,link)
 res.status(200).json(`${link}`);
 }catch(error){
  res.status(400).json(`we can not generate link`)
 }
}
}


//send token and password
export const reset_password=async(req,res)=>{
  const {password}=req.body;
  const {id,token}=req.params;
  try{
    await verify_token_reset_password(id, token,password);
    res.status(200).json(`password updated/reset succcessfully`)
  }catch(error){
    res.status(400).json(`something is going wrong `);
  }
}

// Get User Profile
export const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch user profile data by ID
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude sensitive information
    delete user.password_hash;

    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {name, phone_number } = req.body;
  try {
    // Validate input data
    if (!name || !phone_number) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Update user document with new data
    await db.query(
      'UPDATE users SET user_name = $1, phone_number = $2, updated_at = NOW() WHERE id = $3',
      [name, phone_number, userId]
    );

    // Fetch updated user profile data
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    const updatedUser = userResult.rows[0];

    // Exclude sensitive information
    delete updatedUser.password_hash;

    return res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
//how put is working 

const forgot_password=async (email)=>{
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    return('User not found');//not a good practices
  }
  else{
    const user = result.rows[0];
    const key=process.env.JWT_SECRET+user.password_hash;
    const token=jwt.sign(user.email,key);//add here timer for token expires
    const link=`http://localhost:5000/users/reset_password/${user.id}/${token}`;
    return link;
  }
}

const verify_token_reset_password=async (id ,token,password)=>{
  const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
  const user = result.rows[0];
  const Key=process.env.JWT_SECRET+user.password_hash;
  const verification=await jwt.verify(token, Key);
  try{
    if(verification){
      const hash = await bcrypt.hash(password, saltRounds);
      await client.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash,id]);
      res.status(200).json(`password updated/reset succcessfully`)
    }
  }catch(error){
    res.status(400).json(`something is going wrong `,error);
  }
 
}

export const readtoken= (req, res) => {
  const token = req.cookies.token;
  if (!token) {
  return res.status(401).json({ error: 'No token provided' });
  } else {
  res.status(200).json({ success: true, token: token });
  }
  };