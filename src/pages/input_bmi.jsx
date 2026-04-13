import { useState, useEffect } from "react";

export default function FormInput({ label, id, error, ...props }) {

    return (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1.5">
            <label
                htmlFor={id}
                className="w-32 text-sm font-bold text-slate-400 uppercase tracking-widest"
            >
                {label}
            </label>

            <input
                id={id}
                {...props}
                className={`w-48 px-5 py-4 border-2 rounded-xl outline-none transition-all font-bold text-lg placeholder:text-slate-300 
                ${error
                    ? 'border-red-400 focus:ring-red-100 focus:border-red-500'
                    : 'border-slate-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500'
                }`}
                autoComplete="off"
            />

            {/* Usando col-start-2 il campo di errore viene messo esattamente sotto l'input */}
            {error && (
                <div className="col-start-2 px-2 text-red-500 text-xs font-bold uppercase tracking-wider animate-pulse">
                {error}
                </div>
            )}
        </div>
    );
}
