import React from 'react';
import { NavLink } from 'react-router-dom';
import { House, Images, Upload, Lightbulb } from 'lucide-react';

const linkBase =
  'flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2 rounded-2xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-4 gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <House size={18} />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/acceder-galeria"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <Images size={18} />
          <span>Galería</span>
        </NavLink>

        <NavLink
          to="/subir"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <Upload size={18} />
          <span>Subir</span>
        </NavLink>

        <NavLink
          to="/guia-fotos"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <Lightbulb size={18} />
          <span>Consejos</span>
        </NavLink>
      </div>
    </nav>
  );
}
