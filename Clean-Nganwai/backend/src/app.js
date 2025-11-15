// โครงของระบบ API – route หลักของแอปพลิเคชัน

import express from 'express';
import cors from 'cors'; // Cross-Origin Resource Sharing
import taskRoutes from './routes/taskRoute.js';
import memberRoutes from './routes/memberRoute.js';

const app = express();

// Middleware
// app.use(cors({ origin: 'http://localhost:3221' }));  // ให้ backend ยอมรับ request จาก Frontend โดยไม่โดน CORS บล็อก
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/members', memberRoutes);

// Status Check
app.get('/', (req, res) => {
  res.status(200).send('API is working fine.');
});

export default app; // ทำให้ไฟล์อื่น (เช่น server.js) สามารถใช้ import app from './app.js';
