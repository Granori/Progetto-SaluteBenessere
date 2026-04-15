import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks() {

    return (
        <div className="flex flex-col md:flex-row gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
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

        </div>
    );
}