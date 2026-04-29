import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getUserById } from '../data_access/user.js';

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ successo: false, message: "Sessione scaduta o mancante" });
    }

    try {
        // verify controlla la firma e restituisce il payload decodificato
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await getUserById(decoded.id).select("-password"); // -password non prende la password

        if (!req.user) {
            return res.status(401).json({ successo: false, message: "Utente non trovato" });
        }

        next();

    } catch (error) {
        res.status(401).json({ successo: false, message: "Token non valido" });
    }

};