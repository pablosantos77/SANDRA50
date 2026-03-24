import React, { useMemo, useState, useEffect, useCallback } from 'react';
import AdBanner from '../components/AdBanner';
import { supabase } from '../supabaseClient';

const BUCKET = 'photos';

function getPublicUrl(filePath) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [photos, setPhotos] = useState([]);

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

  const items = useMemo(() => {
    const mixed = [];
    photos.forEach((photo, index) => {
      mixed.push({ type: 'photo', ...photo });
      if ((index + 1) % 6 === 0 && index !== photos.length - 1) {
        mixed.push({ type: 'ad', id: `ad-${index}` });
      }
    });
    return mixed;
  }, [photos]);

  return (
    <main className="mx-auto min-h-screen max-w-[1000px] px-4 pb-28 pt-8 relative">
      <header className="flex justify-between items-end mb-8 px-2">
        <div>
          <h1 className="font-headline text-3xl text-primary md:text-left text-center">Galería de Momentos</h1>
          <p className="text-on-surface-variant font-body text-sm mt-1 md:text-left text-center">Nuestros recuerdos favoritos</p>
        </div>
        <span className="hidden md:inline text-secondary font-label text-xs uppercase tracking-widest font-bold">{photos.length} fotos</span>
      </header>

      {photos.length === 0 ? (
        <div className="text-center py-16 text-on-surface-variant bg-white rounded-xl shadow-[0_4px_12px_rgba(74,124,111,0.05)] mx-2">
          <span className="material-symbols-outlined text-5xl mb-4 block opacity-40">photo_camera</span>
          <p className="font-headline text-lg">¡Sé el primero en compartir!</p>
          <p className="font-body text-sm mt-1">Las fotos aparecerán aquí en tiempo real.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            if (item.type === 'ad') {
              return (
                <div key={item.id} className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-center">
                  <AdBanner slot={`GL-${item.id}`} />
                </div>
              );
            }

            return (
              <div key={item.id} className="group overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(74,124,111,0.08)] bg-white relative aspect-square">
                <button
                  onClick={() => setSelected(item)}
                  className="h-full w-full outline-none"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePhoto(item.id, item.file_path);
                  }}
                  className="absolute top-2 left-2 z-20 bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-600 p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all md:opacity-0 group-hover:opacity-100 border border-red-100/50 hover:scale-105 active:scale-95"
                  aria-label="Borrar foto"
                  title="Borrar foto"
                >
                  <span className="material-symbols-outlined text-[18px] block">delete</span>
                </button>
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
            <div className="flex items-center justify-between p-4">
              <p className="font-headline text-primary">{selected.alt}</p>
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
