import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register({ userStatus, verificaAuth }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email.trim()) {
            setError("Inserisci un indirizzo email.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Formato email non valido.");
            return;
        }

        if (password.length < 1) {
            setError("La password è obbligatoria.");
            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            credentials: 'include' 
        });

        if (res.ok) {
            verificaAuth();
            navigate('/home');
        } else {
            const dati = await res.json();
            switch (dati.message) {
                case "Email già registrata":
                    setError("Email già registrata");
                    break;

                case "Dati non validi":
                    setError("Credenziali non valide");
            
                default:
                    setError("Errore");
                    break;
            }
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-6 min-h-[80vh] flex items-center justify-center mt-5">
            <section className="w-full max-w-md">
                <div className="text-center mb-10 space-y-4">
                    <div className="bg-verde-sfondo inline-block px-4 py-1.5 rounded-full">
                        <span className="text-verde text-sm lg:text-xs font-black uppercase tracking-[0.2em]">
                            Benvenuto
                        </span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-testo">
                        Registrati al <br />
                        <span className="text-verde">tuo equilibrio.</span>
                    </h1>
                </div>

                <div className="bg-card border-bordo-nav shadow-ombra rounded-[40px] p-8 lg:p-10 border">
                    {/* Aggiunto noValidate per disabilitare i controlli automatici di HTML5 */}
                    <form onSubmit={handleLogin} className="space-y-6" noValidate>
                        
                        {error && (
                            <div className="bg-red-50 text-red-500 text-sm p-4 rounded-2xl border border-red-100 text-center font-medium">
                                {error}
                            </div>
                        )}

                        {/* Campo Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-testo-opaco-2 tracking-widest ml-2">
                                Email
                            </label>
                            <input 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test@progetto.it"
                                className="w-full px-6 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde transition-all"
                            />
                            {/* SPIEGAZIONE FORMATO EMAIL */}
                            <p className="text-[10px] text-testo-opaco-2 px-2 leading-relaxed">
                                Email valida con domini comuni (es. .it, .com).
                            </p>
                        </div>

                        {/* Campo Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-testo-opaco-2 tracking-widest ml-2">
                                Password
                            </label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-6 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde transition-all"
                            />
                            {/* SPIEGAZIONE FORMATO PASSWORD */}
                            <p className="text-[10px] text-testo-opaco-2 px-2 leading-relaxed">
                                Minimo 8 caratteri. Deve contenere almeno una maiuscola, un numero e un carattere speciale (es. . , ! _), senza spazi.
                            </p>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                className="w-full bg-pulsante text-testo-affine shadow-bordo-nav hover:bg-pulsante-hover px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95"
                            >
                                Entra nel portale
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-testo-nav text-sm">
                            Hai già un account? <br />
                            <NavLink to="/login"
                                className="text-verde font-bold cursor-pointer hover:underline uppercase text-[10px] tracking-widest">
                                Accedi ora
                            </NavLink>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center opacity-30">
                    <svg className="w-8 h-8 text-verde" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </section>
        </main>
    );
}
