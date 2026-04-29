import express from 'express';
import path from 'node:path';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

import { checkAuth } from './controllers/authController.js';

dotenv.config({ path: path.resolve(import.meta.dirname, '../.env') });

mongoose.connect(process.env.CONNECTION_STRING, {
    serverSelectionTimeoutMS: 5000 // Aspetta solo 5 secondi invece di 30
})
    .then(() => console.log('Connesso a server MongoDB'))
    .catch((error) => console.log('Errore connessione a server MongoDB:\n', error));

    
const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_URL, // URL Frontend
    credentials: true                // Permette l'invio dei Cookie HTTP-only
}));

app.set('port', process.env.PORT || 3000);
app.set('appName', 'Benessere e Salute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Per leggere i cookie ricevuti con req.cookies

app.use((req, res, next) => {
    console.log(`--- Log Richiesta ---`);
    console.log(`Metodo: ${req.method}`);
    console.log(`Percorso: ${req.url}`);
    
    if (req.method === 'POST') {
        console.log('Dati Ricevuti:', req.body);
    }
    
    console.log('\n');
    next();
});


// app.use(checkAuth);

app.use('/api/auth', authRoutes);
app.use('/api/health', apiRoutes);

app.use(express.static(path.join(import.meta.dirname, '../dist')));


app.get('{/*path}', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../dist', 'index.html'));
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server in ascolto su http://localhost:${app.get('port')}\n`);
});
