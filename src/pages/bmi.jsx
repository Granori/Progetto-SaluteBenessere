import { useState, useEffect } from "react";
const regNumerico = /^[0-9]+$/;

export default function PagBMI() {
    const [peso, setPeso] = useState("");
    const [altezza, setAltezza] = useState("");
    const [errors, setErrors] = useState({});

    // const [caricamento, setCaricamento] = useState(true);
    // if (caricamento) return <p>Caricamento in corso...</p>;
    
    async function gestisciBMI(e) {
        e.preventDefault();

        const nuoviErrori = {};

        // I numeri decimali usano il punto
        const p = peso.replace(',', '.');
        const a = altezza.replace(',', '.');

        // Verifico se i valori numerici sono validi
        if (!regNumerico.test(p) || isNaN(parseFloat(p))) {
            nuoviErrori.peso = "Inserisci un peso valido";
        }
        if (!regNumerico.test(a) || isNaN(parseFloat(a))) {
            nuoviErrori.altezza = "Inserisci un'altezza valida";
        }

        // Guardo che ci siano errori
        if (Object.keys(nuoviErrori).length > 0) {
            setErrors(nuoviErrori); // Aggiungo gli errori
            return;
        }
        setErrors({}); // Svuoto gli errori

        const datiBMI = { peso, altezza };
        try {
            const response = await fetch('/api/calcolo_bmi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datiBMI)
            });

            if (response.ok) {
                const risultato = await response.json();
                console.log(risultato)
                // setBmi(risultato.valoreBmi);
            }
        } catch (errore) {
            console.error("Errore invio:", errore);
        }

    }

    return (
        <main class="max-w-5xl mx-auto py-12 px-6">
            <section class="bg-white border-2 border-slate-100 rounded-3xl p-10 shadow-2xl mb-16 relative overflow-hidden">
                <form class="space-y-8" onSubmit={gestisciBMI}>
                    <div class="flex flex-wrap">
                        <div class="flex items-center gap-6">
                            <label htmlFor="input-peso" class="w-32 text-sm font-bold text-slate-400 uppercase tracking-widest">Peso (kg)</label>
                            <input id="input-peso" type="text" placeholder="PESO" value={peso} onChange={(e) => setPeso(e.target.value)}
                                class="w-48 px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-lg placeholder:text-slate-300" />
                        </div>
                        <div>
                            Errore
                        </div>

                    </div>

                    <div class="flex items-center gap-6">
                        <label htmlFor="input-altezza" class="w-32 text-sm font-bold text-slate-400 uppercase tracking-widest">Altezza (cm)</label>
                        <input id="input-altezza" type="text" placeholder="ALTEZZA" value={altezza} onChange={(e) => setAltezza(e.target.value)}
                            class="w-48 px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-lg placeholder:text-slate-300" />
                    </div>

                    <div class="flex justify-center pt-4">
                        <button type="submit" class="w-full max-w-[200px] py-4 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-xl shadow-lg hover:shadow-emerald-200 transition-all duration-300 uppercase tracking-widest">
                            Calcola
                        </button>
                    </div>
                </form>
            </section>

            <article class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div class="space-y-6">
                    <h2 class="text-3xl font-black leading-tight text-slate-800">Perché monitorare il proprio benessere?</h2>
                    <div class="space-y-4 text-lg text-slate-600 leading-relaxed">
                        <p class="border-l-4 border-emerald-400 pl-6">Il calcolo del BMI e delle calorie è il primo passo per una consapevolezza alimentare profonda.</p>
                        <p>Mantenere un peso forma non è solo una questione estetica, ma una prevenzione attiva contro patologie cardiovascolari e metaboliche.</p>
                        <p>Utilizza i nostri dati per pianificare la tua dieta settimanale in modo scientifico e bilanciato, senza rinunciare al piacere del buon cibo.</p>
                    </div>
                </div>

                <div class="relative">
                    <div class="aspect-square bg-emerald-50 rounded-3xl overflow-hidden border-8 border-white shadow-xl flex items-center justify-center">
                        <img src="https://unsplash.com"
                            alt="Cibo salutare" class="object-cover w-full h-full opacity-90 hover:scale-110 transition-transform duration-700" />
                        <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                            <span class="text-xs font-bold uppercase text-emerald-700 italic">Immagine sulle calorie</span>
                        </div>
                    </div>
                </div>

            </article>

        </main>
    );
}