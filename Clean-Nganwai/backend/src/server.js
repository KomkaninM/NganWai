// เชื่อม DB และ Port แล้วเริ่ม server

import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3222; // เผื่อจะมีการเปลี่ยนพอร์ตในอนาคตเปลี่ยนใน .env ได้เลย

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error:', err.message);
    process.exit(1);
  }
}

startServer();
