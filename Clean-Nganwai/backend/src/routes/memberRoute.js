import express from 'express';
import * as memberController from '../controllers/memberController.js';

const router = express.Router();

router.post('/register', memberController.register);
router.post('/login', memberController.login);

export default router;
