// backend/src/routes/memberRoute.js
import express from 'express';
import * as memberController from '../controllers/memberController.js';

const router = express.Router();

// POST /api/members/login
router.post('/login', memberController.login);

export default router;