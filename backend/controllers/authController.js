import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;

    // 1. (Simulazione) Cerca utente e controlla password
    // const user = await User.findOne({ email });
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!user || !isMatch) return res.status(401).json("Credenziali errate");

    // 2. Crea il Token
    const token = jwt.sign({ id: "id_utente_vero" }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 3. Spedisci il Cookie HttpOnly
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 giorno
    });

    res.json({ message: "Login ok!", username: "Luca" });
}