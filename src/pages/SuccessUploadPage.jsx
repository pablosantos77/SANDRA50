import React from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessUploadPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 pt-16 pb-32 text-center">
      <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold">¡Fotos subidas!</h1>
      <p className="mt-4 text-neutral-600">Sandra ya puede ver tus recuerdos. ¡Gracias por participar!</p>
      
      <AdBanner slot="SU-001" className="my-10" />

      <Link to="/galeria" className="block w-full rounded-2xl bg-black py-4 font-bold text-white transition hover:scale-[1.02]">
        Ver Galería Completa
      </Link>
    </main>
  );
}
