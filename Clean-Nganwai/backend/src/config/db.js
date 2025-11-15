// Connect to MongoDB

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  const uri = process.env.MONGO_URI; // URI = Uniform Resource Identifier

  if (!uri) {
    throw new Error('MONGO_URI is not defined in .env');
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'NganWai', // Database name
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

export default connectDB;
