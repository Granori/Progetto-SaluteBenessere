import { useState, useEffect } from "react";

export default function FormInput({ label, id, error, ...props }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1.5">
            <label
                htmlFor={id}
                className="w-32 text-sm font-bold text-testo uppercase tracking-widest"
            >
                {label}
            </label>

            <input
                id={id}
                {...props}
                className={`placeholder:text-testo-opaco w-full sm:w-48 px-5 py-4 border-2 rounded-xl outline-none transition-all font-bold text-lg 
                ${error
                    ? 'border-bordo-errore focus:ring-4 focus:ring-errore-shadow focus:border-testo-errore'
                    : 'border-bordo-nav focus:ring-4 focus:ring-verde-shadow focus:border-verde-hover'
                }`}
                autoComplete="off"
            />

            {/* Usando col-start-2 il campo di errore viene messo esattamente sotto l'input */}
            {error && (
                <div className="sm:col-start-2 px-2 text-testo-errore text-xs font-bold uppercase tracking-wider animate-pulse">
                {error}
                </div>
            )}
        </div>
    );
}
