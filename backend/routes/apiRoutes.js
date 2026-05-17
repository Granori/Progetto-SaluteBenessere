import express from 'express';

import { checkAuth } from '../middleware/authMiddleware.js';
import { calcolaBMI, contaValori } from '../controllers/apiController.js';


const router = express.Router();

router.post('/bmi', calcolaBMI);
router.post('/nutritional_values', contaValori);

export default router;