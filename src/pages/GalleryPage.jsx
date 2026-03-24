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
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-28 pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Galería compartida</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Aquí aparecen las fotos que se han reunido del evento. Puedes pulsar cualquier imagen para verla
          más grande o borrarla si te has equivocado al subirla.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          if (item.type === 'ad') {
            return (
              <div key={item.id} className="col-span-2 md:col-span-3 lg:col-span-4">
                <AdBanner slot={`GL-${item.id}`} />
              </div>
            );
          }

          return (
            <div key={item.id} className="group overflow-hidden rounded-3xl bg-neutral-100 shadow-sm ring-1 ring-black/5 relative aspect-square">
              <button
                onClick={() => setSelected(item)}
                className="h-full w-full outline-none"
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePhoto(item.id, item.file_path);
                }}
                className="absolute top-3 left-3 md:top-4 md:left-4 z-20 bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-600 p-2 rounded-full shadow-md transition-all md:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
                aria-label="Borrar foto"
                title="Borrar foto"
              >
                <span className="material-symbols-outlined text-[20px] block">delete</span>
              </button>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-4xl overflow-hidden rounded-3xl bg-white relative" onClick={(e) => e.stopPropagation()}>
            <img src={selected.url} alt={selected.alt} className="max-h-[80vh] w-full object-contain bg-neutral-100" />
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-neutral-600">{selected.alt}</p>
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Cerrar
              </button>
            </div>
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePhoto(selected.id, selected.file_path);
                }}
                className="absolute top-4 left-4 z-20 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 p-2 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
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
