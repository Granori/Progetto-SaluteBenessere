import express from 'express';

import { calcolaBMI } from '../controllers/apiController.js';
import { checkAuth } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/bmi', checkAuth, calcolaBMI);

export default router;