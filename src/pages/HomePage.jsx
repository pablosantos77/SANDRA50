import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadPhoto } from '../utils/upload';
import UploadingOverlay from '../components/UploadingOverlay';
import { supabase } from '../supabaseClient';

export default function HomePage() {
  const [uploading, setUploading] = useState(false);
  const [recentPhotos, setRecentPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('id, file_path')
        .order('created_at', { ascending: false })
        .limit(8);

      if (!error && data) {
        const photosWithUrl = data.map(photo => {
          const { data: urlData } = supabase.storage.from('photos').getPublicUrl(photo.file_path);
          return { id: photo.id, url: urlData.publicUrl };
        });
        setRecentPhotos(photosWithUrl);
      }
    };
    fetchRecentPhotos();
  }, []);

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
    <main className="relative overflow-x-hidden min-h-screen bg-[#fcfcf9]">
      {uploading && <UploadingOverlay />}
      
      {/* Dynamic Botanical Hero */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 pt-16 pb-20 text-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            alt=""
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] opacity-[0.25] rotate-[180deg] blur-[0.5px]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOz07OzXIOKbo89qeG68QyikGF0zF_nmy5QoQ_6FVYwueUsoebajxbVSblE_9HRJjJ_lmHAOxVqdOHBWfqYLHfkOiSnYrCjn7BTOORTsCVO6VHcJOFs1G7LR-j0oma4-EHBVTgdv1Wo3ux--9YA7F31NPZwtkjJ6ZcxldpfaovDbS-XcjSLm7SShtDOhOnWii_swmoVboAl9YPj3cjScr9EjjnkProfdFCVmfNwAltaQMU_Z1ed5jf_Id_Wc6ZA8RwZ3YQt8lM8SPN"
          />
          <img
            alt=""
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] opacity-[0.25] rotate-[0deg] blur-[0.5px]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOz07OzXIOKbo89qeG68QyikGF0zF_nmy5QoQ_6FVYwueUsoebajxbVSblE_9HRJjJ_lmHAOxVqdOHBWfqYLHfkOiSnYrCjn7BTOORTsCVO6VHcJOFs1G7LR-j0oma4-EHBVTgdv1Wo3ux--9YA7F31NPZwtkjJ6ZcxldpfaovDbS-XcjSLm7SShtDOhOnWii_swmoVboAl9YPj3cjScr9EjjnkProfdFCVmfNwAltaQMU_Z1ed5jf_Id_Wc6ZA8RwZ3YQt8lM8SPN"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcfcf9] to-transparent"></div>
        </div>

        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-2 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-label text-primary/70 tracking-[0.25em] text-[10px] uppercase font-bold">Celebrando el Legado</span>
          </div>

          <div className="relative flex flex-col items-center py-4">
             {/* Large stylish '50' background */}
            <h2 className="font-headline text-[12rem] md:text-[16rem] leading-none text-primary/5 select-none absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 tracking-tighter transition-all duration-700 hover:text-primary/10">50</h2>
            
            <div className="relative pointer-events-none group">
               <h3 className="font-sandra text-7xl md:text-9xl text-[#2D4636] tracking-tight drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]">Sandra</h3>
               <div className="h-0.5 w-16 bg-secondary/30 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          <p className="font-headline italic text-on-surface-variant max-w-sm mx-auto text-lg md:text-xl leading-relaxed opacity-90">
              Media vida llena de historias, amor y momentos inolvidables.
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <form className="w-full sm:w-auto">
              <label
                  className="group relative inline-flex items-center gap-3 bg-[#2D4636] text-white px-10 py-5 rounded-2xl font-label font-bold text-sm tracking-widest shadow-[0_10px_40px_rgba(45,70,54,0.25)] hover:shadow-[0_15px_50px_rgba(45,70,54,0.35)] active:scale-95 transition-all duration-300 w-full sm:min-w-[240px] justify-center cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-xl transition-transform duration-500 group-hover:rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                <span className="relative">SACA YA TU FOTO</span>
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
                to="/galeria"
                className="group inline-flex items-center gap-3 bg-white border border-primary/10 text-[#2D4636] px-10 py-5 rounded-2xl font-label font-bold text-sm tracking-widest shadow-sm hover:border-primary/30 hover:shadow-md active:scale-95 transition-all duration-300 w-full sm:min-w-[240px] justify-center"
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-500 group-hover:translate-x-1">photo_library</span>
              VER GALERÍA
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce duration-[2000ms]">
          <span className="text-[10px] font-label uppercase tracking-widest">Descubrir</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </div>
      </section>

      <section className="pt-24 pb-16 px-6 bg-white relative">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-16">
            <span className="font-label text-secondary/60 text-[10px] uppercase tracking-[0.3em] font-bold block mb-3">Guía rápida</span>
            <h2 className="font-headline text-4xl text-primary">Cómo compartir</h2>
            <div className="w-12 h-1 bg-primary/10 mx-auto mt-4 rounded-full"></div>
          </header>
          
          <div className="grid gap-8 mb-12">
            {[
              { step: 1, title: "Elige las fotos", desc: "Navega por tu galería y selecciona los mejores momentos del cumpleaños de Sandra.", icon: "collections" },
              { step: 2, title: "Súbelas al álbum", desc: "Súbelas en un instante para que todos los invitados podamos disfrutarlas juntos.", icon: "cloud_upload" },
              { step: 3, title: "Revive la fiesta", desc: "Explora la galería compartida y descarga tus recuerdos favoritos.", icon: "auto_awesome_motion" }
            ].map(item => (
              <div key={item.step} className="group bg-[#fcfcf9] p-8 rounded-[2rem] border border-primary/5 shadow-sm flex items-start gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="w-14 h-14 flex-shrink-0 bg-primary/10 text-primary rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline text-xl text-primary mb-2">{item.title}</h4>
                  <p className="text-on-surface-variant font-body text-base leading-relaxed opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {recentPhotos.length > 0 && (
        <section className="pt-16 pb-24 bg-[#fcfcf9] text-center overflow-hidden">
          <div className="max-w-2xl mx-auto mb-12 px-6">
            <h2 className="font-headline text-3xl text-primary mb-3">Últimos recuerdos</h2>
            <p className="font-body text-base text-on-surface-variant opacity-70">Momentos capturados hace solo unos instantes.</p>
          </div>
          
          <div className="relative group/carousel">
            <div className="flex overflow-x-auto gap-6 px-12 pb-10 snap-x snap-mandatory no-scrollbar relative z-10">
              {recentPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="shrink-0 snap-center w-[280px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-lg bg-white border-4 border-white transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/10"
                >
                  <img 
                    src={photo.url} 
                    alt="Recuerdo" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Ambient gradients for carousel */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fcfcf9] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fcfcf9] to-transparent z-20 pointer-events-none"></div>
          </div>

          <Link
            to="/galeria"
            className="group inline-flex items-center gap-3 text-primary font-label font-bold text-sm tracking-[0.15em] mt-8 uppercase transition-all hover:gap-5"
          >
            Explorar toda la galería
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </section>
      )}

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
