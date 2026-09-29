// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Make sure to use dotenv if using .env file

module.exports = function verifyToken(req, res, next) {
  
  // Get token from header (Authorization: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token part

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // compare email from payload to request object for further use
    if(req.params.email && req.params.email !== decoded.email) {
      return res.status(403).json({ message: 'Token email does not match request email' });
    }
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: 'Token is not valid' });
  }

};