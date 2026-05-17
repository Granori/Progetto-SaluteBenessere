import express from 'express';

import { checkAuth } from '../middleware/authMiddleware.js';
import { calcolaBMI, contaValori } from '../controllers/apiController.js';


const router = express.Router();

router.post('/bmi', checkAuth, calcolaBMI);
router.post('/nutritional_values', checkAuth, contaValori);

export default router;