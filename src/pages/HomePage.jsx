import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { uploadPhoto } from '../utils/upload';
import UploadingOverlay from '../components/UploadingOverlay';

export default function HomePage() {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleCapture = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        await uploadPhoto(file);
      }
      navigate('/gracias-por-subir');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Hubo un error al subir la foto.');
      setUploading(false);
    }
  };

  return (
    <main className="relative overflow-x-hidden min-h-screen">
      {uploading && <UploadingOverlay />}
      <section className="relative min-h-[751px] flex flex-col items-center justify-center px-6 text-center bg-surface">
        <img
          alt="Botanical Frame Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOz07OzXIOKbo89qeG68QyikGF0zF_nmy5QoQ_6FVYwueUsoebajxbVSblE_9HRJjJ_lmHAOxVqdOHBWfqYLHfkOiSnYrCjn7BTOORTsCVO6VHcJOFs1G7LR-j0oma4-EHBVTgdv1Wo3ux--9YA7F31NPZwtkjJ6ZcxldpfaovDbS-XcjSLm7SShtDOhOnWii_swmoVboAl9YPj3cjScr9EjjnkProfdFCVmfNwAltaQMU_Z1ed5jf_Id_Wc6ZA8RwZ3YQt8lM8SPN"
        />
        <div className="relative z-10 space-y-4">
          <span className="font-label text-secondary tracking-[0.2em] text-sm uppercase">Celebrando el Legado</span>
          <div className="flex flex-col items-center">
            <h2 className="font-headline text-[10rem] leading-none text-primary/10 select-none">50</h2>
            <h3 className="font-sandra text-6xl -mt-20 text-primary tracking-tight">Sandra</h3>
          </div>
          <p className="font-headline italic text-on-surface-variant max-w-xs mx-auto text-lg pt-4">
              Media vida llena de historias, amor y momentos inolvidables.
          </p>
          <div className="pt-8 flex flex-col items-center gap-4">
            <form className="w-full max-w-[280px]">
              <label
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-label font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all w-full justify-center cursor-pointer mb-0 m-0"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                SACA YA TU FOTO
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleCapture}
                />
              </label>
            </form>
            <Link
                to="/acceder-galeria"
                className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 text-primary px-8 py-3 rounded-xl font-label font-bold text-sm tracking-wide shadow-sm hover:bg-white active:scale-95 transition-all w-full max-w-[280px] justify-center"
            >
              <span className="material-symbols-outlined">photo_library</span>
              VER GALERÍA
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface-container-low relative">
        <div className="max-w-md mx-auto">
          <header className="text-center mb-12">
            <h2 className="font-headline text-3xl text-primary">Cómo compartir</h2>
            <div className="w-12 h-0.5 bg-secondary-fixed-dim mx-auto mt-3"></div>
          </header>
          
          <div className="grid gap-8 mb-12">
            {[
              { step: 1, title: "Elige las fotos", desc: "Navega por tu galería y selecciona los mejores recuerdos del cumpleaños." },
              { step: 2, title: "Súbelas al álbum", desc: "Envíalas para que todos los invitados podamos disfrutarlas en directo." },
              { step: 3, title: "Revive la fiesta", desc: "Entra a la galería compartida y no te pierdas ningún detalle de lo que pasó." }
            ].map(item => (
              <div key={item.step} className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_12px_rgba(74,124,111,0.05)] flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center font-bold">{item.step}</div>
                <div>
                  <h4 className="font-headline text-lg text-on-surface">{item.title}</h4>
                  <p className="text-on-surface-variant font-body text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <AdBanner className="mt-8" />
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container text-center relative overflow-hidden">
        <div className="max-w-sm mx-auto space-y-6 relative z-10">
          <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <p className="font-sandra text-3xl text-primary">Con amor, Sandra</p>
        </div>
      </section>

      <div className="flex justify-center pb-8 pt-4">
        <Link to="/privacidad" className="text-[10px] text-on-surface-variant/30 hover:text-on-surface-variant/70 transition-colors">
          Política de Privacidad
        </Link>
      </div>
    </main>
  );
}
