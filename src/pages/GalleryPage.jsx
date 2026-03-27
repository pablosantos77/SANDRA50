import React, { useState, useEffect, useCallback } from 'react';
import { Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { supabase } from '../supabaseClient';

const BUCKET = 'photos';

function getPublicUrl(filePath) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = async () => {
    if (photos.length === 0) return;
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      
      const fetchPromises = photos.map(async (photo, index) => {
        const resp = await fetch(photo.url);
        if (!resp.ok) throw new Error('Network response was not ok');
        const blob = await resp.blob();
        zip.file(`foto_${index + 1}.jpg`, blob);
      });

      await Promise.all(fetchPromises);
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      const blobUrl = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Album_Sandra_50.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error generando el zip:', error);
      alert('Hubo un problema descargando algunas imágenes.');
    } finally {
      setIsDownloading(false);
    }
  };

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
      alt: 'Foto de Sandra'
    }));
    setPhotos(mapped);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Real-time subscription
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
            alt: 'Nueva foto'
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
      if (selected?.id === id) {
        setSelected(null);
      }
    } catch (error) {
      console.error('Error al borrar:', error.message);
      alert('No se pudo borrar la foto.');
    }
  };

  const handleDownloadSingle = async (url, photoId) => {
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Network response was not ok');
      const blob = await resp.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `sandra50-foto-${photoId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Error downloading:', err);
      window.open(url, '_blank');
    }
  };

  // Removed items ad mixer

  return (
    <main className="mx-auto min-h-screen max-w-[1000px] px-4 pb-28 pt-8 relative">
      <header className="flex items-end justify-between mb-8 px-2 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <h1 className="font-headline text-3xl text-primary md:text-left text-center">Galería de Momentos</h1>
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading || photos.length === 0}
              className="flex flex-shrink-0 items-center gap-2 bg-black hover:bg-stone-900 text-white px-4 py-2 rounded-xl font-label text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-wait"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Empaquetando fotos...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Descargar Álbum
                </>
              )}
            </button>
          </div>
          <p className="text-on-surface-variant font-body text-sm mt-1 md:text-left text-center">Nuestros recuerdos favoritos</p>
        </div>
        <span className="hidden md:inline text-secondary font-label text-xs uppercase tracking-widest font-bold whitespace-nowrap">{photos.length} fotos</span>
      </header>

      {photos.length === 0 ? (
        <div className="text-center py-20 text-[#2D4636]/70">
          <span className="text-5xl mb-4 block">📸</span>
          <h3 className="font-sandra text-2xl mb-2 text-[#2D4636]">¡Sé el primero en compartir!</h3>
          <p className="font-body text-sm">Las fotos de la fiesta aparecerán aquí en tiempo real.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-[250px] gap-6 max-w-[1200px] mx-auto w-full">
          {photos.map((item) => {
            return (
              <div key={item.id} className="group break-inside-avoid mb-6 bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(45,70,54,0.05)] border border-[#2D4636]/10 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(45,70,54,0.12)] cursor-pointer relative">
                <button
                  onClick={() => setSelected(item)}
                  className="w-full outline-none block"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-auto block object-cover"
                    loading="lazy"
                  />
                  <div className="p-3 bg-white font-body text-[#2D4636] text-[0.85rem] flex justify-between items-center text-left">
                    <span>De: <strong>Invitado</strong></span>
                  </div>
                </button>
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20 md:opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePhoto(item.id, item.file_path);
                    }}
                    className="bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-600 p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all border border-red-100/50 hover:scale-105 active:scale-95"
                    aria-label="Borrar foto"
                    title="Borrar foto"
                  >
                    <span className="material-symbols-outlined text-[18px] block">delete</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadSingle(item.url, item.id);
                    }}
                    className="bg-white/90 hover:bg-emerald-50 text-[#446351] hover:text-emerald-700 p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all border border-emerald-100/50 hover:scale-105 active:scale-95"
                    aria-label="Descargar foto"
                    title="Descargar foto"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-[#f9f9f7] relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selected.url} alt={selected.alt} className="max-h-[75vh] w-full object-contain bg-black/5" />
            <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border-t border-black/5">
              <button
                onClick={() => handleDownloadSingle(selected.url, selected.id)}
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-label font-bold tracking-wide text-white shadow-md active:scale-95 transition-all hover:bg-stone-900"
              >
                <Download size={18} />
                Descargar
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl bg-[#446351] px-5 py-2.5 text-sm font-label font-bold tracking-wide text-white shadow-md active:scale-95 transition-all"
              >
                Cerrar
              </button>
            </div>
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePhoto(selected.id, selected.file_path);
                }}
                className="absolute top-4 left-4 z-20 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 p-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
                aria-label="Borrar foto"
                title="Borrar foto"
              >
                <span className="material-symbols-outlined text-[20px] block">delete</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
