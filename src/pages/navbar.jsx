import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <header class="w-full bg-white border-b border-slate-200 px-10 py-5 flex justify-between items-center shadow-sm">
            <div class="font-black text-2xl tracking-tighter text-emerald-600 italic">HEALTHY.</div>
            <nav class="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
                <NavLink to="/"
                    className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600" : "hover:text-emerald-500 transition"}
                >
                    Home
                </NavLink>
                <NavLink to="/calcolatorebmi"
                    className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600" : "hover:text-emerald-500 transition"}
                >
                    Calcolatore BMI
                </NavLink>
                <NavLink to="/contacalorie"
                    className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600" : "hover:text-emerald-500 transition"}
                >
                    Conta Calorie
                </NavLink>
            </nav>
        </header>
    )
}