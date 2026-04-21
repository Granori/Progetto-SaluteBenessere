import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks({ chiudiMenu }) {

    return (
        <div className="text-testo-nav flex flex-col md:flex-row gap-6 md:gap-8 text-sm font-bold uppercase tracking-widest">
            <NavLink to="/"
                className={({ isActive }) => isActive ? "text-verde border-verde border-b-2" : "hover:text-verde-hover transition"}
                onClick={chiudiMenu}
            >
                Home
            </NavLink>
            <NavLink to="/calcolatorebmi"
                className={({ isActive }) => isActive ? "text-verde border-verde border-b-2" : "hover:text-verde-hover transition"}
                onClick={chiudiMenu}
            >
                Calcolatore BMI
            </NavLink>
            <NavLink to="/contacalorie"
                className={({ isActive }) => isActive ? "text-verde border-verde border-b-2" : "hover:text-verde-hover transition"}
                onClick={chiudiMenu}
            >
                Conta Calorie
            </NavLink>

        </div>
    );
}