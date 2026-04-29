import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getUserById } from '../data_access/user.js';

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ successo: false, message: "Sessione scaduta o mancante" });
    }

    try {
        // verify controlla la firma e restituisce il payload decodificato
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await getUserById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ successo: false, message: "Utente non trovato" });
        }

        next();

    } catch (error) {
        console.log("Dettaglio errore JWT:", error.message);
        res.status(401).json({ successo: false, message: "Token non valido", error: error });
    }

};