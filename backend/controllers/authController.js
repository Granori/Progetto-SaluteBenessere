import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getUserByEmail } from '../data_access/user.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ successo: false, message: "Utente non trovato" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ successo: false, message: "Credenziali errate" });
        }
    
        // Crea il Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATA || '1h' });
    
        // Prepara il Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax', // con strict invia il cookie solo alle richieste del dominio del server
            // maxAge: 1000 * 60 * 60 // se non specificato termina alla fine della sessione
        });
    
        res.json({ successo: true, message: "Successo", ruolo: user.ruolo });

    } catch (error) {
        res.status(500).json({ message: "Errore nel server" });
    }
}