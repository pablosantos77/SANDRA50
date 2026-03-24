import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

export default function PreGalleryPage() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto min-h-screen max-w-lg px-6 pt-12 pb-32">
      <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 text-center">
        <h2 className="text-2xl font-bold mb-2">Abriendo el Álbum...</h2>
        <p className="text-sm text-neutral-500 mb-6">Estamos preparando las fotos de Sandra.</p>
        
        <AdBanner slot="PG-002" className="mb-6" />

        <button onClick={() => navigate('/galeria')} className="w-full rounded-2xl bg-neutral-900 py-4 font-bold text-white">
          Entrar ahora
        </button>
      </div>
    </main>
  );
}
