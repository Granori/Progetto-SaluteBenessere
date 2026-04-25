import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config({ path: path.resolve(import.meta.dirname, '../.env') });

mongoose.connect(process.env.CONNECTION_STRING)
    .then(console.log('Connesso a server MongoDB'))
    .catch((error) => console.log('Errore connessione a server MongoDB:\n', error));

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('appName', 'Benessere e Salute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


app.use(express.static(path.join(import.meta.dirname, '../dist')));

// app.use('/api/auth', authRoutes);
app.use('/api/health', apiRoutes);

app.get('{/*path}', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../dist', 'index.html'));
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server in ascolto su http://localhost:${app.get('port')}\n`);
});
