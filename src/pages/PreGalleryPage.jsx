import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

export default function PreGalleryPage() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto min-h-screen max-w-lg px-6 pt-12 pb-32">
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_15px_rgba(74,124,111,0.08)] text-center relative">
        <span className="material-symbols-outlined text-6xl text-secondary mb-4 opacity-80 mt-2">book_2</span>
        <h2 className="font-headline text-3xl text-primary mb-2">Abriendo el Álbum...</h2>
        <p className="font-body text-on-surface-variant text-sm mb-6">Estamos preparando las fotos de Sandra.</p>
        
        <AdBanner slot="PG-002" className="mb-6" />

        <button 
          onClick={() => navigate('/galeria')} 
          className="w-full inline-flex items-center justify-center gap-2 bg-[#446351] text-[#f9f9f7] px-8 py-4 rounded-xl font-label font-bold text-sm tracking-wide shadow-md hover:bg-[#344d3e] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">exit_to_app</span>
          ENTRAR AHORA
        </button>
      </div>
    </main>
  );
}
