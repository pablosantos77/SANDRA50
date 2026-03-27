import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPhoto } from '../utils/upload';
import UploadingOverlay from '../components/UploadingOverlay';

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
      {uploading && <UploadingOverlay />}
      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <section className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_12px_rgba(74,124,111,0.05)] md:p-8">
          <header className="mb-6">
            <h1 className="font-headline text-3xl text-primary">Añadir al Álbum</h1>
            <p className="text-on-surface-variant font-body text-sm mt-2">
              Selecciona tus imágenes favoritas del evento y súbelas a la galería compartida del 50 cumpleaños. Intenta enviar fotos
              nítidas y evita duplicados para mantener la galería más limpia.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block rounded-xl border-2 border-dashed border-secondary/30 bg-white p-8 text-center transition hover:border-secondary cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 0" }}>add_photo_alternate</span>
              <span className="block font-headline text-lg text-primary">Pulsa para buscar en el móvil</span>
              <span className="mt-1 block font-label text-xs text-secondary tracking-widest uppercase">Formatos recomendados: JPG, PNG, HEIC</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
            </label>

            {previews.length > 0 && (
              <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm">
                <h2 className="mb-3 font-headline text-sm text-primary uppercase tracking-widest">Vista previa ({previews.length})</h2>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                  {previews.map((item, index) => (
                    <div key={`${item.file.name}-${index}`} className="overflow-hidden rounded-lg bg-stone-100 aspect-square">
                      <img src={item.url} alt={item.file.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-label font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              <span className="material-symbols-outlined">{uploading ? 'cloud_sync' : 'cloud_upload'}</span>
              {uploading ? 'ENVIANDO...' : 'ENVIAR FOTOS'}
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl shadow-[0_4px_12px_rgba(74,124,111,0.05)]">
            <h2 className="font-headline text-xl text-primary flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
              Consejos rápidos
            </h2>
            <ul className="space-y-3 font-body text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#4a7c6f] text-[18px]">check_circle</span>
                Prioriza imágenes con buena luz.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#4a7c6f] text-[18px]">check_circle</span>
                Sube momentos espontáneos y fotos de grupo.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#4a7c6f] text-[18px]">check_circle</span>
                Revisa antes de enviar para no duplicar fotos.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
