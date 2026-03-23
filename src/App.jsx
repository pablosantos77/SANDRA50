import React, { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';

/* ─── Supabase helpers ─── */
const BUCKET = 'photos';

async function uploadPhoto(file) {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  // 2. Insert record in photos table
  const { error: dbError } = await supabase
    .from('photos')
    .insert({ file_path: fileName });

  if (dbError) throw dbError;
  return fileName;
}

function getPublicUrl(filePath) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

/* ─── Components ─── */

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-[#f9f9f7]/80 dark:bg-stone-900/80 backdrop-blur-md shadow-[0_20px_40px_rgba(43,43,43,0.05)] transition-colors duration-300">
    <div className="flex items-center justify-between px-6 h-16 w-full">
      <span className="material-symbols-outlined text-[#446351] dark:text-emerald-200">spa</span>
      <h1 className="font-['Noto_Serif'] font-bold text-xl tracking-tight text-[#446351] dark:text-emerald-200">50 de Sandra</h1>
      <div className="w-6"></div>
    </div>
  </header>
);

const HeroSection = ({ onUploadClick }) => (
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
      <div className="pt-8">
        <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-label font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          SUBE TU FOTO
        </button>
      </div>
    </div>
  </section>
);

const InstructionSection = () => (
  <section className="py-20 px-6 bg-surface-container-low relative" id="upload">
    <div className="max-w-md mx-auto">
      <header className="text-center mb-12">
        <h2 className="font-headline text-3xl text-primary">Cómo compartir</h2>
        <div className="w-12 h-0.5 bg-secondary-fixed-dim mx-auto mt-3"></div>
      </header>
      <div className="grid gap-8">
        {[
          { step: 1, title: "Escanea el QR", desc: "Usa la cámara de tu móvil para acceder al álbum compartido." },
          { step: 2, title: "Haz tu foto", desc: "Capta el mejor momento de la noche con Sandra." },
          { step: 3, title: "Súbela al álbum", desc: "Dale al botón verde y comparte tu alegría con todos." }
        ].map(item => (
          <div key={item.step} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 flex-shrink-0 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center font-bold">{item.step}</div>
            <div>
              <h4 className="font-headline text-lg text-on-surface">{item.title}</h4>
              <p className="text-on-surface-variant text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const GRID_SPANS = [
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

const GallerySection = ({ photos }) => (
  <section className="py-20 px-4 bg-surface" id="gallery">
    <header className="flex justify-between items-end mb-8 px-2">
      <div>
        <h2 className="font-headline text-3xl text-primary">Galería en vivo</h2>
        <p className="text-on-surface-variant text-sm font-label">Nuestros recuerdos favoritos</p>
      </div>
      <span className="text-secondary font-label text-xs font-bold">{photos.length} fotos</span>
    </header>
    {photos.length === 0 ? (
      <div className="text-center py-16 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl mb-4 block opacity-40">photo_camera</span>
        <p className="font-headline text-lg">¡Sé el primero en compartir!</p>
        <p className="text-sm mt-1">Las fotos aparecerán aquí en tiempo real.</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3 auto-rows-[160px]">
        {photos.map((photo, i) => (
          <div key={photo.id} className={`overflow-hidden rounded-xl bg-surface-container ${GRID_SPANS[i % GRID_SPANS.length]}`}>
            <img alt="Recuerdo" className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" src={photo.url} loading="lazy" />
          </div>
        ))}
      </div>
    )}
  </section>
);

const UploadingOverlay = () => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl mx-6">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="font-headline text-lg text-primary">Subiendo tu foto...</p>
      <p className="text-on-surface-variant text-sm">Espera un momento</p>
    </div>
  </div>
);

const Footer = () => (
  <>
    <section className="py-24 px-8 bg-surface-container text-center relative overflow-hidden">
      <div className="max-w-sm mx-auto space-y-6 relative z-10">
        <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        <p className="font-sandra text-3xl text-primary">Con amor, Sandra</p>
      </div>
    </section>
    <footer className="w-full py-12 mb-20 flex flex-col items-center justify-center space-y-4 px-8 bg-[#f9f9f7] dark:bg-stone-950">
      <span className="font-headline text-lg text-[#446351]">Sandra</span>
      <p className="font-['Noto_Serif'] italic text-sm text-center text-[#6b5d42] dark:text-stone-400">
          Con amor para los 50 de Sandra
      </p>
      <div className="flex gap-4">
        <a className="text-[#446351] underline text-sm font-body" href="#">Gracias por celebrar con nosotros</a>
      </div>
    </footer>
  </>
);

const BottomNav = ({ onUploadClick }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-[#f9f9f7]/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-t-3xl z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      <button onClick={scrollToTop} className="flex flex-col items-center justify-center text-[#446351]/60 dark:text-stone-400 p-2 hover:text-[#6b5d42] transition-all">
        <span className="material-symbols-outlined">home</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem]">INICIO</span>
      </button>
      <button onClick={onUploadClick} className="flex flex-col items-center justify-center bg-[#446351] text-[#f9f9f7] rounded-full p-3 transition-all scale-110 active:scale-95 shadow-lg">
        <span className="material-symbols-outlined">add_circle</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem]">SUBIR</span>
      </button>
      <button onClick={scrollToGallery} className="flex flex-col items-center justify-center text-[#446351]/60 dark:text-stone-400 p-2 hover:text-[#6b5d42] transition-all">
        <span className="material-symbols-outlined">photo_library</span>
        <span className="font-['Manrope'] text-[10px] font-medium uppercase tracking-[0.05rem]">GALERÍA</span>
      </button>
    </nav>
  );
};

/* ─── Main App ─── */

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch existing photos on mount
  const fetchPhotos = useCallback(async () => {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading photos:', error);
      return;
    }

    const mapped = data.map(row => ({
      id: row.id,
      url: getPublicUrl(row.file_path),
    }));
    setPhotos(mapped);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Real-time subscription — new photos appear instantly on all devices
  useEffect(() => {
    const channel = supabase
      .channel('photos-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'photos' },
        (payload) => {
          const newPhoto = {
            id: payload.new.id,
            url: getPublicUrl(payload.new.file_path),
          };
          setPhotos(prev => [newPhoto, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handlePhotoSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadPhoto(file);
      // The real-time subscription will automatically add it to the gallery
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Error al subir la foto. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-container min-h-screen">
      {uploading && <UploadingOverlay />}
      <Header />
      <main className="relative overflow-x-hidden pt-16">
        <HeroSection onUploadClick={handleUploadClick} />
        <InstructionSection />
        <GallerySection photos={photos} />
        <Footer />
      </main>
      <BottomNav onUploadClick={handleUploadClick} />

      {/* Hidden file input — triggers mobile camera or file picker */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhotoSelected}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
}
