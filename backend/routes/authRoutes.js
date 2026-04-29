import express from 'express';

import { login, register, logout, authMe } from '../controllers/authController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/check_auth', checkAuth, authMe);

export default router;