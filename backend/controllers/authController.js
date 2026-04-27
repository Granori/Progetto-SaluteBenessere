import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User } from '../models/user.js';
import { getUserByEmail } from '../data_access/user.js';


const setupCookie = (user, res) => {
    // Crea il Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATA || '1h' });

    // Prepara il Cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        path: '/',
        sameSite: 'lax', // con strict invia il cookie solo alle richieste del dominio del server
        // maxAge: 1000 * 60 * 60 // se non specificato termina alla fine della sessione
    });

    return token;
}

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
    
        setupCookie(user, res);
    
        res.status(200).json({ successo: true, message: "Successo", ruolo: user.ruolo });

    } catch (error) {
        res.status(500).json({ successo: false, message: "Errore nel server" });
    }
}

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ successo: false, message: "Campi mancanti" });
        }
        const newUser = new User({
            email: email,
            password: password,
            ruolo: "user"
        });

        await newUser.save();
        
        setupCookie(newUser, res);

        res.status(201).json({ successo: true, message: "Successo" });

    } catch (err) {
        // Codice MongoDB chiave duplicata
        if (err.code === 11000) {
            return res.status(400).json({ successo: false, message: "Email già registrata" });
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({ successo: false, message: "Dati non validi" });
        }

        res.status(500).json({ successo: false, message: "Errore interno del server" });
    }
}

export const logout = async (req, res) => {
    try {
        // I parametri del cookie da eliminare devo corrispondere al cookie del token
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            path: '/',
            sameSite: 'lax'
        });

        res.status(200).json({ successo: true, message: "Cookie eliminato con successo" });

    } catch (error) {
        res.status(500).json({ successo: false, message: "Errore eliminazione Cookie" });
    }
}

export const checkAuth = async (req, res) => {
    
}