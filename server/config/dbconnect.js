const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully', connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB; 