// backend/src/routes/taskRoute.js
import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// GET /api/tasks - ดึงงานทั้งหมดที่เปิดรับ
router.get('/', taskController.getTasks);

// POST /api/tasks - เพิ่มงานใหม่
router.post('/', taskController.addTask);

// POST /api/tasks/:id/take - รับงาน
router.post('/:id/take', taskController.takeTask);

export default router;