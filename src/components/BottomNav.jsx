import React from 'react';
import { NavLink } from 'react-router-dom';

const linkBase = "flex flex-col items-center justify-center p-2 transition-all";

export default function BottomNav() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-center gap-4 items-center px-4 pb-6 pt-3 bg-gradient-to-t from-[#f9f9f7] to-[#f9f9f7]/90 dark:from-stone-900 dark:to-stone-900/90 backdrop-blur-xl z-50">
      <NavLink
        to="/"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-[90px] h-[75px] rounded-2xl shadow-md transition-all duration-300 transform outline-none text-[#f9f9f7] hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#344d3f] active:scale-95 ${
            isActive ? 'bg-[#344d3f] scale-[1.02] shadow-lg' : 'bg-[#446351]'
          }`
        }
      >
        <span className="material-symbols-outlined mb-1 text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>home</span>
        <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider">Inicio</span>
      </NavLink>

      <NavLink
        to="/subir"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-[90px] h-[75px] rounded-2xl shadow-md transition-all duration-300 transform outline-none text-[#f9f9f7] hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#344d3f] active:scale-95 ${
            isActive ? 'bg-[#344d3f] scale-[1.02] shadow-lg' : 'bg-[#446351]'
          }`
        }
      >
        <span className="material-symbols-outlined mb-1 text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>add_circle</span>
        <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider mt-0.5">Subir</span>
      </NavLink>

      <NavLink
        to="/acceder-galeria"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-[90px] h-[75px] rounded-2xl shadow-md transition-all duration-300 transform outline-none text-[#f9f9f7] hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#344d3f] active:scale-95 ${
            isActive ? 'bg-[#344d3f] scale-[1.02] shadow-lg' : 'bg-[#446351]'
          }`
        }
      >
        <span className="material-symbols-outlined mb-1 text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>photo_library</span>
        <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider">Galería</span>
      </NavLink>
    </nav>
  );
}
