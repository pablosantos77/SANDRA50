import React from 'react';
import { NavLink } from 'react-router-dom';

const linkBase = "flex flex-col items-center justify-center p-2 transition-all";

export default function BottomNav() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-[#f9f9f7]/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-t-3xl z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      <NavLink
        to="/"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-[#446351] scale-110' : 'text-[#446351]/60 hover:text-[#6b5d42]'}`
        }
      >
        <span className="material-symbols-outlined mb-1">home</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem]">Inicio</span>
      </NavLink>

      <NavLink
        to="/acceder-galeria"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-[#446351] scale-110' : 'text-[#446351]/60 hover:text-[#6b5d42]'}`
        }
      >
        <span className="material-symbols-outlined mb-1">photo_library</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem]">Galería</span>
      </NavLink>

      <NavLink
        to="/subir"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'bg-[#446351] text-[#f9f9f7] rounded-[20px] p-3 shadow-lg scale-110' : 'bg-[#446351]/90 text-[#f9f9f7] rounded-[20px] p-3 shadow-md hover:bg-[#446351] hover:scale-105'}`
        }
      >
        <span className="material-symbols-outlined">add_circle</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem] mt-1">Subir</span>
      </NavLink>

      <NavLink
        to="/guia-fotos"
        onClick={scrollToTop}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-[#446351] scale-110' : 'text-[#446351]/60 hover:text-[#6b5d42]'}`
        }
      >
        <span className="material-symbols-outlined mb-1">lightbulb</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem]">Consejos</span>
      </NavLink>
    </nav>
  );
}
