import jwt, { decode } from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  // var a=token.slice(7);//when we request throw browser then directyly use token not a
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(a, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("req.user",req.user)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};


export const authenticate_user = (req, res, next) => {
  const token = req.headers['authorization'];
  // var a=token.slice(7);//when we request throw browser then directyly use token not a
  console.log('a');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(a, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });


  }
};
