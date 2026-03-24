import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { supabase } from '../supabaseClient';

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

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        await uploadPhoto(file);
      }
      navigate('/gracias-por-subir');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Hubo un error al subir alguna foto.');
      setUploading(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-28 pt-8">
      {uploading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl mx-6">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-bold">Subiendo tus fotos...</p>
            <p className="text-sm text-neutral-600">Por favor, espera un momento</p>
          </div>
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <h1 className="text-3xl font-bold tracking-tight">Subir fotos</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Selecciona tus imágenes favoritas del evento y súbelas al álbum compartido. Intenta enviar fotos
            nítidas y evita duplicados para mantener la galería más limpia y útil para todos.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="block rounded-3xl border-2 border-dashed border-neutral-300 p-6 text-center transition hover:border-neutral-400 cursor-pointer">
              <span className="block text-sm font-medium text-neutral-800">Pulsa aquí para elegir imágenes</span>
              <span className="mt-1 block text-xs text-neutral-500">Formatos recomendados: JPG, PNG, HEIC</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
            </label>

            {previews.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-neutral-800">Vista previa</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {previews.map((item, index) => (
                    <div key={`${item.file.name}-${index}`} className="overflow-hidden rounded-2xl bg-neutral-100">
                      <img src={item.url} alt={item.file.name} className="aspect-square w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {uploading ? 'Enviando...' : 'Enviar fotos'}
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Consejos rápidos</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-neutral-600">
              <li>Evita fotos borrosas o repetidas.</li>
              <li>Prioriza imágenes con buena luz.</li>
              <li>Sube momentos espontáneos y fotos de grupo.</li>
              <li>Revisa antes de enviar para no duplicar archivos.</li>
            </ul>
          </div>

          <AdBanner slot="UP-005" />
        </aside>
      </div>
    </main>
  );
}
