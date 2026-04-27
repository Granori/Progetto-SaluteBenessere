import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const checkAuth = (req, res, next) => {
    // Logica del middleware
    console.log("Controllo autorizzazione...");
    next(); // Passa al middleware/route successivo
};