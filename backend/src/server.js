// backend/src/server.js
import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 

dotenv.config();

const PORT = 3222;

// เชื่อมต่อ DB แล้วจึงรัน Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Access it at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to start server due to DB connection error:", err);
});