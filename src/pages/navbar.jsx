import { useState, useEffect } from "react";
import NavbarLinks from "./navbar_link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b border-slate-200 px-10 py-5 items-center shadow-sm">
            <div className="flex justify-between">
                <div className="font-black text-2xl tracking-tighter text-emerald-600 italic">HEALTHY.</div>

                <div className="hidden md:flex items-center">
                    <NavbarLinks />
                </div>

                <div className="flex md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-7 6h7" />}
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid md:hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out`}>
                <div className="overflow-hidden bg-white">
                    <div className="px-4 border-b border-slate-200 py-4 space-y-2">
                        <NavbarLinks chiudiMenu={() => setIsOpen(false)}/>

                    </div>
                </div>
            </div>

        </nav>
    )
}