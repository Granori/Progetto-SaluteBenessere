import { useState, useEffect } from "react";
import FormInput from "./input_bmi";
import LoadingSpin from "./caricamento";
const regNumerico = /^[0-9]+$/;

export default function PagBMI() {
    const [peso, setPeso] = useState("");
    const [altezza, setAltezza] = useState("");
    const [errors, setErrors] = useState({});
    
    const [bmi, setBmi] = useState(-1);
    const bmiPos = bmi >= 0 ? Math.min(Math.max((bmi * 100) / 40, 0), 100) : 0;

    const [caricamento, setCaricamento] = useState(true);
    useEffect(() => {
        setCaricamento(false);
    }, []);
    
    const [attesa, setAttesa] = useState(false);
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

        setAttesa(true);
        const datiBMI = { peso, altezza };
        try {
            const response = await fetch('/api/health/bmi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datiBMI)
            });

            if (response.ok) {
                const risultato = await response.json();

                console.log(risultato);
                setBmi(risultato);
                
                setAttesa(false);
            }

        } catch (errore) {
            console.error("Errore invio:", errore);
        }
        // setAttesa(false);
    }

    if (caricamento) return (
        <div className="fixed inset-0 grid h-screen place-items-center">
            <LoadingSpin />
        </div>
    );

    return (
        <main className="text-testo max-w-5xl mx-auto py-12 px-6">
            <section className="bg-card border-bordo border-2 rounded-3xl p-10 shadow-2xl mb-16 relative overflow-hidden">
                <form className="space-y-8" onSubmit={gestisciBMI}>
                    <FormInput 
                        label="Peso (kg)"
                        id="input-peso"
                        placeholder="PESO"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        error={errors.peso}
                    />

                    <FormInput 
                        label="Altezza (cm)"
                        id="input-altezza"
                        placeholder="ALTEZZA"
                        value={altezza}
                        onChange={(e) => setAltezza(e.target.value)}
                        error={errors.altezza}
                    />

                    <div className="flex justify-center pt-4">
                        <button type="submit" className="bg-pulsante text-testo-affine hover:bg-verde-hover hover:shadow-verde-shadow w-full max-w-50 py-4 font-black rounded-xl shadow-lg transition-all duration-300 uppercase tracking-widest">
                            Calcola
                        </button>
                    </div>
                </form>
            </section>

            <div className="relative pt-5 pb-4">
                { attesa && 
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full">
                        <LoadingSpin color="border-blue-600" size="w-10 h-10" /> 
                    </div>
                }

                {/* Contenitore principale con padding superiore per dare spazio all'etichetta */}
                <div className="relative pb-4">

                    {/* Contenitore della Barra + Etichetta */}
                    <div className="relative h-4 w-full flex rounded-full">
                        {/* Etichetta Valore Corrente: Ancorata al top della barra tramite bottom-full */}
                        { bmi >= 0 && !attesa &&
                            <div 
                                className="absolute bottom-full mb-2 flex flex-col items-center transition-all duration-500 ease-out"
                                style={{ left: `${bmiPos}%`, transform: 'translateX(-50%)' }}
                            >
                                {/* Il colore dello sfondo cambia dinamicamente in base alla zona */}
                                <span className={`text-white text-xs font-bold px-2 py-1 rounded shadow-sm transition-colors duration-500 ${
                                    bmi < 18.5 ? 'bg-blue-400' : 
                                    bmi < 25 ? 'bg-emerald-400' : 
                                    bmi < 30 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}>
                                    {bmi}
                                </span>
                                {/* Freccia dell'etichetta: eredita il colore del testo sopra */}
                                <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] transition-colors duration-500 ${
                                    bmi < 18.5 ? 'border-t-blue-400' : 
                                    bmi < 25 ? 'border-t-emerald-400' : 
                                    bmi < 30 ? 'border-t-yellow-400' : 'border-t-red-400'
                                }`}></div>
                            </div>
                        }
                        

                        {/* Barra Graduata (dentro il contenitore relative per un allineamento perfetto) */}
                        <div className="flex w-full h-full rounded-full overflow-hidden border border-gray-100/50">
                            <div className="h-full bg-blue-400" style={{ width: '46.25%' }}></div> {/* Fino a 18.5 */}
                            <div className="h-full bg-emerald-400" style={{ width: '16.25%' }}></div> {/* Da 18.5 a 25 (6.5 punti = 16.25%) */}
                            <div className="h-full bg-yellow-400" style={{ width: '12.5%' }}></div> {/* Da 25 a 30 (5 punti = 12.5%) */}
                            <div className="h-full bg-red-400" style={{ width: '25%' }}></div> {/* Da 30 a 40 (10 punti = 25%) */}
                        </div>
                    </div>

                    {/* Legenda sotto la barra */}
                    <div className="relative mt-2 text-[10px] text-testo-nav font-bold uppercase h-4">
                        <span className="absolute left-0">0</span>
                        <span className="absolute" style={{ left: '46.25%' }}>18.5</span>
                        <span className="absolute" style={{ left: '62.5%' }}>25</span>
                        <span className="absolute" style={{ left: '75%' }}>30</span>
                        <span className="absolute right-0">40+</span>
                    </div>
                </div>

            </div>

            <article className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <h2 className="text-testo text-3xl font-black leading-tight">Perché monitorare il proprio benessere?</h2>
                    <div className="text-testo space-y-4 text-lg leading-relaxed">
                        <p className="border-l-4 border-emerald-400 pl-6">Il calcolo del BMI e delle calorie è il primo passo per una consapevolezza alimentare profonda.</p>
                        <p>Mantenere un peso forma non è solo una questione estetica, ma una prevenzione attiva contro patologie cardiovascolari e metaboliche.</p>
                        <p>Utilizza i nostri dati per pianificare la tua dieta settimanale in modo scientifico e bilanciato, senza rinunciare al piacere del buon cibo.</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-square bg-emerald-50 rounded-3xl overflow-hidden border-8 border-white shadow-xl flex items-center justify-center">
                        <img src="https://unsplash.com"
                            alt="Cibo salutare" className="object-cover w-full h-full opacity-90 hover:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-xs font-bold uppercase text-verde italic">Immagine sulle calorie</span>
                        </div>
                    </div>
                </div>

            </article>

        </main>
    );
}