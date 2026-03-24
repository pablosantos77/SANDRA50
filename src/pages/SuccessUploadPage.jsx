import React from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

export default function SuccessUploadPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 pt-16 pb-32 text-center flex flex-col items-center">
      <span className="material-symbols-outlined text-7xl text-[#4a7c6f] mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      <h1 className="font-headline text-4xl text-primary">¡Fotos subidas!</h1>
      <p className="mt-4 text-on-surface-variant font-body text-lg max-w-md mx-auto">Sandra ya puede ver tus recuerdos en el álbum compartido. ¡Gracias por participar!</p>
      
      <AdBanner slot="SU-001" className="my-10 w-full" />

      <Link 
        to="/galeria" 
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-label font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all w-full max-w-[280px]"
      >
        <span className="material-symbols-outlined">photo_library</span>
        VER GALERÍA COMPLETA
      </Link>
    </main>
  );
}
