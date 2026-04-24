import { useState, useEffect } from "react";
import NavbarLinks from "./navbar_link";
import { NavLink } from "react-router-dom";

export default function Navbar({ openSettings }) {
    const [isOpenHamb, setIsOpenHamb] = useState(false);
    const [isOpenProfilo, setIsOpenProfilo] = useState(false);
    const [isOpenImp, setIsOpenImp] = useState(false);

    function toggleHamburger() {
        if (!isOpenHamb) setIsOpenProfilo(false);
        setIsOpenHamb(!isOpenHamb);
    }
    function toggleProfilo() {
        if (!isOpenProfilo) setIsOpenHamb(false);
        setIsOpenProfilo(!isOpenProfilo)
    }
    function closeDropdowns() {
        setIsOpenHamb(false);
        setIsOpenProfilo(false);
    }

    return (
        <nav className="w-full bg-nav border-bordo-nav sticky z-50 top-0 border-b-2 text-testo px-10 py-5 items-center shadow-sm">
            <div className="flex justify-between">
                <div className="text-verde font-black text-2xl tracking-tighter italic">HEALTHY.</div>

                <div className="flex items-center gap-10">

                    <div className="hidden md:flex items-center">
                        <NavbarLinks chiudiMenu={ closeDropdowns }/>
                    </div>

                    <div className="md:hidden">
                        <button onClick={ toggleHamburger } className="text-icona focus:outline-none cursor-pointer">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpenHamb ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-7 6h7" />}
                            </svg>
                        </button>
                    </div>

                    <div className="">
                        <svg onClick={ toggleProfilo } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="text-icona size-8 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>

                </div>
            </div>

            <div className={`${isOpenHamb ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid md:hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out`}>
                <div className="overflow-hidden">
                    <div className="px-4 border-b border-testo-opaco py-4 space-y-2">
                        <NavbarLinks chiudiMenu={ closeDropdowns }/>

                    </div>
                </div>
            </div>
            <div className={`${isOpenProfilo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid transition-[grid-template-rows,opacity] duration-300 ease-in-out`}>
                <div className="overflow-hidden">
                    <div className="px-4 border-b border-testo-opaco py-4 space-y-2">
                        <div className="flex flex-col gap-6 md:gap-8 text-sm font-bold uppercase tracking-widest text-testo-nav">
                            <NavLink to='/login'
                                className="cursor-pointer hover:border-b-2 hover:border-verde hover:text-verde-hover transition">
                                Accedi
                            </NavLink>
                            <div onClick={ () => {openSettings(); setIsOpenProfilo(false); } } className="cursor-pointer hover:border-b-2 hover:border-verde hover:text-verde-hover transition">
                                Impostazioni
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </nav>
    )
}