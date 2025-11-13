// backend/src/routes/itemRoute.js
import express from 'express';
import * as itemController from '../controllers/itemController.js';

const router = express.Router();

// GET /api/tasks - ดึงงานทั้งหมดที่เปิดรับ
router.get('/', itemController.getTasks);

// POST /api/tasks - เพิ่มงานใหม่
router.post('/', itemController.addTask);

// POST /api/tasks/:id/take - รับงาน
router.post('/:id/take', itemController.takeTask);

export default router;