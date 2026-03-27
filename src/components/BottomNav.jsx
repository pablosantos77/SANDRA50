import React from 'react';
import { NavLink } from 'react-router-dom';

const linkBase = "flex flex-col items-center justify-center p-2 transition-all";

export default function BottomNav() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-center gap-4 items-center px-4 pb-8 pt-4 bg-white/70 backdrop-blur-2xl z-50 border-t border-primary/5">
      <NavLink
        to="/"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-[100px] h-[64px] rounded-2xl transition-all duration-500 transform outline-none group ${
            isActive 
              ? 'bg-[#2D4636] text-white shadow-[0_10px_25px_rgba(45,70,54,0.3)]' 
              : 'text-[#2D4636]/60 hover:text-[#2D4636] hover:bg-[#2D4636]/5'
          }`
        }
      >
        <span className="material-symbols-outlined mb-1 text-[22px] transition-transform duration-500 group-hover:scale-110" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>home</span>
        <span className="font-headline text-[10px] font-bold uppercase tracking-[0.1em]">Inicio</span>
      </NavLink>

      <NavLink
        to="/subir"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-[100px] h-[64px] rounded-2xl transition-all duration-500 transform outline-none group ${
            isActive 
              ? 'bg-[#2D4636] text-white shadow-[0_10px_25px_rgba(45,70,54,0.3)]' 
              : 'text-[#2D4636]/60 hover:text-[#2D4636] hover:bg-[#2D4636]/5'
          }`
        }
      >
        <div className="relative">
          <span className="material-symbols-outlined mb-1 text-[22px] transition-transform duration-500 group-hover:scale-110" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>add_circle</span>
          {!isActive && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>}
        </div>
        <span className="font-headline text-[10px] font-bold uppercase tracking-[0.1em]">Subir</span>
      </NavLink>

      <NavLink
        to="/galeria"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-[100px] h-[64px] rounded-2xl transition-all duration-500 transform outline-none group ${
            isActive 
              ? 'bg-[#2D4636] text-white shadow-[0_10px_25px_rgba(45,70,54,0.3)]' 
              : 'text-[#2D4636]/60 hover:text-[#2D4636] hover:bg-[#2D4636]/5'
          }`
        }
      >
        <span className="material-symbols-outlined mb-1 text-[22px] transition-transform duration-500 group-hover:scale-110" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>photo_library</span>
        <span className="font-headline text-[10px] font-bold uppercase tracking-[0.1em]">Galería</span>
      </NavLink>
    </nav>
  );
}
