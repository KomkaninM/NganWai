// backend/src/app.js
import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoute.js';
import memberRoutes from './routes/memberRoute.js';

const app = express();

// Middleware
// อนุญาตให้ Frontend ที่รันบนพอร์ต 32317 เข้าถึงได้
app.use(cors({ origin: 'http://localhost:3221' })); 
app.use(express.json()); 

// Routes
app.use('/api/tasks', itemRoutes);
app.use('/api/members', memberRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('Quick Task Finder API is operational.');
});

export default app;