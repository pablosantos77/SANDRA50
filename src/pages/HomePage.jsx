import React from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-28 pt-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 px-6 py-10 text-white shadow-2xl md:px-10 md:py-14">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80">
            Álbum digital del evento
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Guarda y comparte los mejores recuerdos del evento
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Esta web está pensada para reunir todas las fotos del evento en un solo lugar. Los invitados
            pueden escanear el QR, subir sus imágenes fácilmente y revisar la galería desde cualquier móvil.
            Así evitamos perder fotos dispersas en WhatsApp y conseguimos un álbum mucho más ordenado.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/subir"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Subir mis fotos
            </Link>
            <Link
              to="/galeria"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver galería
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-lg font-semibold">Fácil para todos</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Solo necesitan escanear un QR y elegir las fotos desde su móvil. Sin procesos complicados.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-lg font-semibold">Recuerdos organizados</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Todas las imágenes quedan agrupadas en una galería común para revisarlas después del evento.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-lg font-semibold">Preparada para monetizar</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Incluye páginas informativas y estructura válida para solicitar AdSense cuando el sitio esté listo.
          </p>
        </div>
      </section>

      <AdBanner className="mt-8" />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <h2 className="text-2xl font-semibold">Cómo funciona</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <div className="mb-2 text-sm font-semibold text-neutral-400">Paso 1</div>
            <p className="text-sm leading-6 text-neutral-700">Escanea el código QR desde el móvil.</p>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-neutral-400">Paso 2</div>
            <p className="text-sm leading-6 text-neutral-700">Entra en la página de subida y selecciona tus fotos favoritas.</p>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-neutral-400">Paso 3</div>
            <p className="text-sm leading-6 text-neutral-700">Revisa la galería y disfruta del álbum compartido con todos los asistentes.</p>
          </div>
        </div>
      </section>

      <AdBanner className="mt-8" />
    </main>
  );
}
