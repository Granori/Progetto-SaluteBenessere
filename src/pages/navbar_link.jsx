import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks({ chiudiMenu }) {

    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <NavLink to="/"
                className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600" : "hover:text-emerald-500 transition"}
                onClick={chiudiMenu}
            >
                Home
            </NavLink>
            <NavLink to="/calcolatorebmi"
                className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600" : "hover:text-emerald-500 transition"}
                onClick={chiudiMenu}
            >
                Calcolatore BMI
            </NavLink>
            <NavLink to="/contacalorie"
                className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600" : "hover:text-emerald-500 transition"}
                onClick={chiudiMenu}
            >
                Conta Calorie
            </NavLink>

        </div>
    );
}