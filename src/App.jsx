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

const GallerySection = ({ photos, onDelete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = photos.length;

  // Auto-play
  useEffect(() => {
    if (totalSlides === 0 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [totalSlides, isHovered]);

  // Keyboard support
  useEffect(() => {
    if (totalSlides === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Prevent out of bounds if photos get deleted
  useEffect(() => {
    if (totalSlides > 0 && currentSlide >= totalSlides) {
      setCurrentSlide(totalSlides - 1);
    }
  }, [totalSlides, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section className="py-20 px-4 bg-surface relative" id="gallery">
      <div className="max-w-[1000px] mx-auto">
        <header className="flex justify-between items-end mb-8 px-2">
          <div>
            <h2 className="font-headline text-3xl text-primary md:text-left text-center">Galería de Momentos</h2>
            <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest mt-1 md:text-left text-center">Nuestros recuerdos favoritos</p>
          </div>
          <span className="hidden md:inline text-secondary font-label text-xs font-bold">{totalSlides} fotos</span>
        </header>

        {totalSlides === 0 ? (
          <div className="text-center py-16 text-on-surface-variant bg-white rounded-xl shadow-sm border border-black/5">
            <span className="material-symbols-outlined text-5xl mb-4 block opacity-40">photo_camera</span>
            <p className="font-headline text-lg">¡Sé el primero en compartir!</p>
            <p className="text-sm mt-1">Las fotos aparecerán aquí en tiempo real.</p>
          </div>
        ) : (
          <div>
            <div 
              className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(74,124,111,0.15)] bg-white"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {photos.map((photo, index) => (
                  <div key={photo.id} className="group min-w-full aspect-video md:aspect-[16/9] relative bg-stone-100 flex items-center justify-center">
                    <img 
                      src={photo.url} 
                      alt={`Foto ${index + 1}`} 
                      className="w-full h-full object-contain md:object-cover block"
                      loading={index === 0 ? "eager" : "lazy"} 
                    />
                    {onDelete && (
                      <button
                        onClick={() => onDelete(photo.id, photo.file_path)}
                        className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-600 p-2 md:p-2.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all md:opacity-0 group-hover:opacity-100 border border-red-100/50 hover:scale-105 active:scale-95"
                        aria-label="Borrar foto"
                        title="Borrar foto"
                      >
                        <span className="material-symbols-outlined text-[20px] md:text-[22px] block">delete</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/95 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-[13px] text-[#4a7c6f] font-medium z-10 shadow-sm transition-all border border-[#d4ccc0]/30 border-opacity-50">
                <span>{currentSlide + 1}</span> / <span>{totalSlides}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-6 md:mt-8">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 md:w-11 md:h-11 border border-[#d4ccc0] rounded-full bg-white text-[#4a7c6f] text-base md:text-lg flex items-center justify-center hover:bg-[#4a7c6f] hover:text-white hover:border-[#4a7c6f] transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Anterior"
              >
                ‹
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 md:w-11 md:h-11 border border-[#d4ccc0] rounded-full bg-white text-[#4a7c6f] text-base md:text-lg flex items-center justify-center hover:bg-[#4a7c6f] hover:text-white hover:border-[#4a7c6f] transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Siguiente"
              >
                ›
              </button>
            </div>

            {totalSlides > 1 && (
              <div className="flex gap-2.5 justify-center mt-6 flex-wrap px-4 pb-4">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir a foto ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 border-none p-0 shadow-sm ${
                      index === currentSlide 
                        ? 'bg-[#4a7c6f] w-7' 
                        : 'bg-[#d4ccc0] w-2.5 hover:bg-[#6a9a87]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

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
      file_path: row.file_path,
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
            file_path: payload.new.file_path,
          };
          setPhotos(prev => [newPhoto, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'photos' },
        (payload) => {
          setPhotos(prev => prev.filter(p => p.id !== payload.old.id));
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

  const deletePhoto = async (id, filePath) => {
    const confirmed = window.confirm('¿Seguro que quieres borrar esta foto?');
    if (!confirmed) return;

    try {
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([filePath]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', id);
      if (dbError) throw dbError;

      setPhotos(prev => prev.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error al borrar:', error.message);
      alert('No se pudo borrar la foto.');
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-container min-h-screen">
      {uploading && <UploadingOverlay />}
      <Header />
      <main className="relative overflow-x-hidden pt-16">
        <HeroSection onUploadClick={handleUploadClick} />
        <InstructionSection />
        <GallerySection photos={photos} onDelete={deletePhoto} />
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
