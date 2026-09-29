// controllers/userController.js
const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const users = require('../models/user.js'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Example data source (replace with actual database logic)
const usersList = [
  { id: 1, name: 'users 1', email: 'user1@example.com', password: 'hashedPassword1' , age: 30 },
  { id: 2, name: 'users 2', email: 'user2@example.com', password: 'hashedPassword2' , age: 25 },
  { id: 3, name: 'users 3', email: 'user3@example.com', password: 'hashedPassword3' , age: 25 },
  { id: 4, name: 'user4', email: 'user4@example.com', password: 'try#2026' , age: 19 }
];

// route is /user/login
// Controller to handle user login
exports.loginUser = async (req, res) => {
   const { email, password } = req.body;
   const userfound = await users.findOne({ email: email }).exec();
   if (!userfound) {
     return res.status(404).send('User not found');
   }
   const emailFound = userfound.email;
   const storedHashedPassword = userfound.password;
   const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
   if (passwordMatch) {
      //issue or send token with user info as needed
     const jwtToken = jwt.sign({ id: userfound._id, name: userfound.name, email: userfound.email, age: userfound.age }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
       if (err) {
         console.error('Error generating token', err);
         res.status(500).send('Error generating token');
        } else {
         //console.log('token', token);
         //res.status(200).json({ token: token, user: { id: userfound._id, name: userfound.name, email: userfound.email, age: userfound.age } });//send selected user info along with token
         res.status(200).json({ token: token });
         return({ token });
        }
     });
     //res.status(200).send('Login successful');
   } else {
     res.status(401).send('Authentication failed');
   }
}

// route is /user/register
// Controller to handle user registration
exports.registerUser = async (req, res) => {
   const { name, email, password, age } = req.body;
   const existingUser = await users.findOne({ email: email }).exec();
   if (existingUser) {
     return res.status(409).send('User already exists');
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new users({
     name: name,
     email: email,
     password: hashedPassword,
     age: age
   });
   await newUser.save();
   res.status(201).send('User registered successfully');
};

// the email is passed as a parameter for email address
// route is /user/auth/:email
// Controller to verify user authorization token
exports.verifyUserAuthorizationToken = async (req, res) => {
   const email = req.params.email;
   const token = req.headers['authorization'] || req.headers['Authorization'];
   const bearertoken = req.headers['authorization'].split(' ')[1];

   //console.log('Verifying token:', token);
   //console.log('Verifying token:', bearertoken);
   
   if (!bearertoken) {
     return res.status(401).send('Authorization token missing');
   }

   try {
      jwt.verify(bearertoken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token');
        }
        if (decoded.email !== email) {
          return res.status(403).send('User not authorized');
        }
        //res.status(200).send('User authorized successfully');
        res.status(200).json({ valid: true });
      });
    } catch (error) {
      console.error('Error verifying token', error);
      res.status(500).send('Error verifying token');
    }

};

// route is /user/profile/:email
// controller to get user profile based on global permissions
exports.getUserProfile = (req, res) => {
   const email = req.params.email;
   // Here you would typically fetch user profile from a database using the email as username
  res.send('User profile page');
};


// GET
// Controller to get user authorization page (example)
exports.getUser = (req, res) => {
  res.send('User Authorization Page serve HTML page, GET request');
};

// POST
// Controller to create a new user (example)
// example { "newUser": { "id":3, "name":"Fred" }, "password": "Flintstone", "username": "ffuser" }
exports.createUser = (req, res) => {
  const { newUser, password, username } = req.body; // Assuming middleware like express.json() is used
  users.push(newUser);
  console.log(`Created user: ${username} with password: ${password}`);
  res.status(201).json(newUser);
};

// route is /user/:id
// Controller to get a single user by ID
exports.getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.status(200).json(user);
    //res.send(`User ID: ${req.params.id}`);
  } else {
    res.status(404).send('User not found');
  }
};

// PUT
// Controller to update a user (example)
exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedData = req.body;
  let user = users.find(u => u.id === userId);

  if (user) {
    user = { ...user, ...updatedData };
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
}

// DELETE
// Controller to delete a user (example)
exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).send('User deleted successfully');
  } else {
    res.status(404).send('User not found');
  }
}