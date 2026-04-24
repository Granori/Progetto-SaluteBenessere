import express from 'express';

import { calcolaBMI } from '../controllers/apiController.js';


const router = express.Router();

router.post('/bmi', calcolaBMI);

export default router;