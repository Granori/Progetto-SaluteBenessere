import express from 'express';
import { join } from "node:path";

const regNumerico = /^[0-9]+$/;

let app = express();

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


app.use(express.static(join(import.meta.dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(join(import.meta.dirname, 'dist', 'index.html'));
});

app.get('/home', (req, res) => {
  res.redirect('/');
});

app.get('/api/test', (req, res) => {
    res.json({ messaggio: "Ciao da Express!!", timestamp: new Date() });
});

app.post('/api/calcolo_bmi', (req, res) => {
    const body = req.body;

    const errors = {};
    const p = body.peso.replace(',', '.');
    const a = body.altezza.replace(',', '.');
    
    if (!regNumerico.test(p) || isNaN(parseFloat(p))) {
        errors.peso = "Errore server";
    }
    if (!regNumerico.test(a) || isNaN(parseFloat(a))) {
        errors.altezza = "Errore server";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    const bmi = (p / Math.pow(a / 100, 2)).toFixed(1);
    res.status(200).json(bmi);

});

app.use((req, res) => {
    res.status(404).send('Url non presente');
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server in ascolto su http://localhost:${app.get('port')}\n`);
});
