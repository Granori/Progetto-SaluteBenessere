import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // 1. (Simulazione) Cerca utente e controlla password
        // const user = await User.findOne({ email });
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!user || !isMatch) return res.status(401).json("Credenziali errate");
    
        // 2. Crea il Token
        const token = jwt.sign({ id: "id_utente_vero" }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATA || '1h' });
    
        // 3. Spedisci il Cookie HttpOnly
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax', // con strict invia il cookie solo alle richieste del dominio del server
            // maxAge: 1000 * 60 * 60 // se non specificato termina alla fine della sessione
        });
    
        res.json({ message: "Login ok!", username: "Luca" });

    } catch (error) {
        res.status(500).json({ message: "Errore nel server" });
    }
}