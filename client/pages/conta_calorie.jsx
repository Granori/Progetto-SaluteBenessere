import { useState, useRef } from "react";

export default function PagConta() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [foodData, setFoodData] = useState(null);
    const [manualName, setManualName] = useState(""); 
    const fileInputRef = useRef(null);

    const API_KEY = "0a8c7f66e7f3453c8c66ded897284ea1";

    const fetchNutritionByName = async (name) => {
        setIsAnalyzing(true);
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${API_KEY}&title=${encodeURIComponent(name)}`
            );
            const data = await response.json();

            if (data && data.calories) {
                setFoodData({
                    nome: name,
                    calorie: Math.round(data.calories.value || data.calories || 0),
                    proteine: `${data.protein?.value || data.protein || 0}g`,
                    carboidrati: `${data.carbs?.value || data.carbs || 0}g`,
                    grassi: `${data.fat?.value || data.fat || 0}g`,
                    status: "Dati basati sul nome inserito"
                });
            }
        } catch (error) {
            console.error("Errore:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleManualSearch = (e) => {
        e.preventDefault();
        if (!manualName.trim()) return;
        fetchNutritionByName(manualName);
    };

    const resetAnalyzer = () => {
        setSelectedImage(null);
        setFoodData(null);
        setManualName("");
    };

    return (
        /* FIX TEMA DARK + SCROLL: Usiamo min-h-screen senza colori hex fissi */
        <div className="min-h-screen w-full transition-colors duration-300"> 
            <main className="max-w-6xl mx-auto px-6 pb-24">
                <section className="flex flex-col lg:flex-row items-center justify-center gap-12 py-12 md:py-20">
                    <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                        <div className="bg-verde-sfondo inline-block px-4 py-1.5 rounded-full">
                            <span className="text-verde text-sm lg:text-xs font-black uppercase tracking-[0.2em]">
                                Food Scanner IA
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-testo">
                            Cosa stai <br />
                            <span className="text-verde">mangiando?</span>
                        </h1>
                        
                        {!foodData ? (
                            <div className="space-y-6">
                                <p className="text-testo-nav text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    Carica una foto e inserisci il nome del piatto per ottenere i dati nutrizionali precisi.
                                </p>
                                
                                <form onSubmit={handleManualSearch} className="space-y-4">
                                    <div className="relative max-w-md mx-auto lg:mx-0">
                                        <input 
                                            type="text"
                                            value={manualName}
                                            onChange={(e) => setManualName(e.target.value)}
                                            placeholder="Esempio: Pasta alla carbonara..."
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-bordo-nav bg-card text-testo focus:border-verde outline-none transition-all shadow-sm font-medium"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-verde-sfondo text-verde px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all hover:opacity-80"
                                        >
                                            {selectedImage ? "✓ Foto Caricata" : "Aggiungi Foto"}
                                        </button>
                                        
                                        <button 
                                            type="submit"
                                            disabled={isAnalyzing}
                                            className="bg-pulsante text-testo-affine shadow-xl hover:bg-pulsante-hover px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isAnalyzing ? "Analisi..." : "Analizza Piatto"}
                                        </button>
                                    </div>
                                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                                </form>
                            </div>
                        ) : (
                            <div className="pt-4">
                                <button 
                                    onClick={resetAnalyzer}
                                    className="bg-transparent border-2 border-verde text-verde hover:bg-verde-sfondo px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] lg:text-xs transition-all active:scale-95"
                                >
                                    Analizza un altro piatto
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Box Immagine Anteprima */}
                    <div className="flex-1 w-full max-w-[320px] md:max-w-100 lg:max-w-110">
                        <div className="relative bg-card rounded-[60px] aspect-[4/5] overflow-hidden border border-bordo-nav shadow-2xl transition-transform duration-500">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Cibo" className="object-cover w-full h-full opacity-90" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-testo-opaco-2 opacity-30">
                                    <svg className="w-24 h-24 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span className="font-bold text-center text-sm uppercase tracking-widest">Anteprima</span>
                                </div>
                            )}
                            
                            {foodData && (
                                <div className="absolute bottom-10 left-10 right-10 bg-card/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-bordo-nav">
                                    <p className="text-[10px] font-black uppercase text-verde tracking-[0.2em] mb-1">Rilevato</p>
                                    <p className="text-sm font-bold text-testo truncate">{foodData.nome}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* --- RISULTATI --- */}
                {foodData && (
                    <section className="mt-12 pt-12 border-t border-bordo-nav animate-fade-in">
                        <h2 className="text-testo-opaco-2 text-center text-2xl lg:text-3xl font-black mb-12 uppercase tracking-widest">
                            Analisi Nutrizionale
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {[
                                { label: "Calorie", val: foodData.calorie, unit: "kcal", color: "bg-orange-400", bg: "bg-orange-400/10" },
                                { label: "Proteine", val: foodData.proteine, unit: "", color: "bg-blue-400", bg: "bg-blue-400/10" },
                                { label: "Carboidrati", val: foodData.carboidrati, unit: "", color: "bg-amber-400", bg: "bg-amber-400/10" },
                                { label: "Grassi", val: foodData.grassi, unit: "", color: "bg-red-400", bg: "bg-red-400/10" }
                            ].map((item, idx) => (
                                <div key={idx} className="group bg-card border-bordo-nav shadow-ombra rounded-[30px] p-8 border hover:shadow-2xl transition-all duration-500">
                                    <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                        <div className={`w-5 h-5 ${item.color} rounded-full`} />
                                    </div>
                                    <h3 className="text-testo-nav text-sm font-black mb-2 uppercase tracking-tighter">{item.label}</h3>
                                    <p className="text-3xl lg:text-4xl font-black text-testo">{item.val} <span className="text-lg text-testo-opaco-2 font-medium">{item.unit}</span></p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}