import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ userStatus, verificaAuth }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const res = await fetch('/api/auth/login', {
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
            setError("Credenziali non valide. Riprova.");
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-6 min-h-[80vh] flex items-center justify-center">
            <section className="w-full max-w-md">
                {/* Header della Card */}
                <div className="text-center mb-10 space-y-4">
                    <div className="bg-verde-sfondo inline-block px-4 py-1.5 rounded-full">
                        <span className="text-verde text-sm lg:text-xs font-black uppercase tracking-[0.2em]">
                            Bentornato
                        </span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-testo">
                        Accedi al <br />
                        <span className="text-verde">tuo equilibrio.</span>
                    </h1>
                </div>

                {/* Form Card */}
                <div className="bg-card border-bordo-nav shadow-ombra rounded-[40px] p-8 lg:p-10 border">
                    <form onSubmit={handleLogin} className="space-y-6">
                        
                        {error && (
                            <div className="bg-red-50 text-red-500 text-sm p-4 rounded-2xl border border-red-100 text-center font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-testo-opaco-2 tracking-widest ml-2">
                                Email
                            </label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test@progetto.it"
                                className="w-full px-6 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde transition-all"
                                required
                            />
                        </div>

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
                                required
                            />
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
                            Non hai un account? <br />
                            <span className="text-verde font-bold cursor-pointer hover:underline uppercase text-[10px] tracking-widest">
                                Registrati ora
                            </span>
                        </p>
                    </div>
                </div>

                {/* Piccolo decoro sotto la card per coerenza con lo stile */}
                <div className="mt-8 flex justify-center opacity-30">
                    <svg className="w-8 h-8 text-verde" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </section>
        </main>
    );
}
