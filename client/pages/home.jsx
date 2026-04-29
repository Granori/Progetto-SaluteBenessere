import { useState, useEffect } from "react";

export default function HomePage({ userStatus }) {
    return (
        <main className="max-w-6xl mx-auto px-6">
            <section className="grow flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
                <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                    <div className="bg-verde-sfondo inline-block px-4 py-1.5 rounded-full">
                        <span className="text-verde text-sm lg:text-xs font-black uppercase tracking-[0.2em]">
                            Progetto Consapevolezza
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-testo">
                        La tua salute, <br />
                        <span className="text-verde">il tuo equilibrio.</span>
                    </h1>
                    <p className="text-testo-nav text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Siamo qui per promuovere la cultura del benessere. Piccole abitudini quotidiane e una maggiore conoscenza di sé sono la base per una vita più sana e consapevole.
                    </p>
                    <div className="flex justify-center lg:justify-start pt-4">
                        <button className="bg-pulsante text-testo-affine shadow-bordo-nav hover:bg-pulsante-hover px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] lg:text-xs transition-all shadow-xl active:scale-95">
                            Esplora il progetto
                        </button>
                    </div>
                </div>

                {/* Card Immagine Cuore ridimensionata e centrata */}
                <div className="flex-1 w-full max-w-[320px] md:max-w-100 lg:max-w-110">
                    <div className="relative bg-emerald-50 rounded-[60px] aspect-[4/5] overflow-hidden border border-emerald-100/50 shadow-inner transform hover:rotate-1 transition-transform duration-500">
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            {/* Icona o Illustrazione placeholder */}
                            <svg className="w-48 h-48 text-emerald-200/60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-white/50">
                            <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-1">Status Odierno</p>
                            <p className="text-sm font-bold text-slate-800">100% Benessere</p>
                        </div>
                    </div>
                </div>

            </section>

            {/* --- STRUMENTI --- */}
            <section className="mb-32 pt-8">
                <h2 className="text-testo-opaco-2 text-center text-2xl lg:text-3xl font-black mb-12 lg:mb-16 uppercase tracking-widest">
                    Strumenti
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
                    {/* Card BMI */}
                    <div className="group bg-card border-bordo-nav shadow-ombra rounded-[40px] p-10 lg:p-12 border hover:shadow-2xl transition-all duration-500">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <div className="w-6 h-6 bg-blue-400 rounded-full" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-black mb-4 uppercase tracking-tighter">Calcolatore BMI</h3>
                        <p className="text-testo-nav leading-relaxed text-sm lg:text-base">Uno strumento per comprendere meglio la tua composizione corporea e sensibilizzare sull'importanza del peso forma.</p>
                    </div>

                    {/* Card Calorie */}
                    <div className="group bg-card border-bordo-nav shadow-ombra rounded-[40px] p-10 lg:p-12 border hover:shadow-2xl transition-all duration-500">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <div className="w-6 h-6 bg-emerald-400 rounded-full" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-black mb-4 uppercase tracking-tighter">Diario Energetico</h3>
                        <p className="text-testo-nav leading-relaxed text-sm lg:text-base">Impara a conoscere l'apporto energetico degli alimenti per una scelta più consapevole a tavola.</p>
                    </div>
                </div>
            </section>

            {/* --- SECONDA SEZIONE --- */}
            <section className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 pb-20">
                <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                    <h2 className="text-3xl lg:text-[42px] font-black leading-tight tracking-tight">
                        Oltre i numeri, <br className="hidden lg:block" /> la consapevolezza.
                    </h2>
                    <div className="border-y-2 lg:border-y-0 lg:border-l-4 border-verde-hover py-4 lg:py-2 lg:pl-8">
                        <p className="text-testo-opaco-2 text-lg font-medium italic">
                            Monitorare non significa ossessionarsi, ma decidere meglio del proprio futuro.
                        </p>
                    </div>
                    <p className="text-testo-nav text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Abbattiamo le barriere dell'informazione sulla salute, rendendo la prevenzione accessibile a tutti tramite dati chiari.
                    </p>
                </div>

                {/* Card Immagine Secondaria */}
                <div className="relative flex-1 w-full max-w-95 lg:max-w-120">
                    <div className="aspect-square bg-emerald-50 rounded-3xl overflow-hidden border-8 border-white shadow-xl flex items-center justify-center">
                        <img src="https://unsplash.com"
                            alt="Cibo salutare" className="object-cover w-full h-full opacity-90 hover:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-xs font-bold uppercase text-verde italic">Immagine sulle calorie</span>
                        </div>
                    </div>
                </div>
                
            </section>
        </main>
    );
};
