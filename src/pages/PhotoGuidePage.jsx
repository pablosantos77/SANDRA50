import React from 'react';
import AdBanner from '../components/AdBanner';

export default function PhotoGuidePage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-8">
      <article className="rounded-2xl bg-white p-6 md:p-10 shadow-[0_4px_12px_rgba(74,124,111,0.05)] border border-secondary/10">
        <h1 className="font-headline text-3xl md:text-4xl text-primary mb-6">Guía: Cómo hacer fotos épicas en eventos</h1>
        
        <p className="mt-4 font-body text-base leading-8 text-on-surface-variant">
          Hacer buenas fotos en un evento no depende solo de tener un móvil moderno. Muchas veces, la diferencia
          entre una imagen normal y una foto realmente bonita está en pequeños detalles: la luz, el encuadre,
          el momento exacto y la intención con la que se dispara. Cuando varias personas participan en un álbum
          compartido, como ocurre en cumpleaños, bodas, reuniones familiares o celebraciones privadas, conviene
          que todos tengan unas pautas básicas. Así se consigue una galería más útil, más agradable de revisar y
          mucho más coherente en calidad. Para el 50 cumpleaños de Sandra, queremos las mejores tomas.
        </p>

        <AdBanner slot="GD-003" className="my-8" />

        <h3 className="font-headline text-xl text-primary mt-8 mb-4">1. Aprovecha la luz natural y estabiliza el móvil</h3>
        <p className="font-body text-base leading-8 text-on-surface-variant">
          El primer consejo es aprovechar la luz natural siempre que sea posible. Si estás cerca de una ventana,
          en una terraza o en una zona exterior, intenta colocarte de manera que la luz ilumine a las personas de
          frente o ligeramente de lado. La luz suave suele favorecer mucho más que un flash agresivo. Si hay velas o luces bajas,
          es preferible estabilizar bien el móvil y disparar con calma antes que
          usar zoom o moverse demasiado rápido. La nitidez importa mucho más que acercarse artificialmente.
        </p>

        <h3 className="font-headline text-xl text-primary mt-8 mb-4">2. Cuida el encuadre y acércate</h3>
        <p className="font-body text-base leading-8 text-on-surface-variant">
          También es importante cuidar el encuadre. Antes de hacer la foto, merece la pena dedicar un segundo a
          revisar qué aparece alrededor. Muchas imágenes pierden fuerza porque detrás hay elementos que distraen:
          bolsas, sillas vacías, vasos fuera de lugar o fondos desordenados. Dar dos pasos a un lado, bajar un poco
          el ángulo o esperar a que el fondo quede más limpio puede cambiar completamente el resultado. No uses el zoom digital. Camina hacia Sandra para capturar el detalle de su sonrisa y evita cortar manos o cabezas en las fotos de grupo.
        </p>

        <AdBanner slot="GD-004" className="my-8" />

        <h3 className="font-headline text-xl text-primary mt-8 mb-4">3. Captura la naturalidad</h3>
        <p className="font-body text-base leading-8 text-on-surface-variant">
          Otro punto clave es capturar momentos reales. En muchos eventos, las mejores imágenes no son necesariamente
          las posadas, sino aquellas en las que alguien se ríe, abraza, brinda o habla con naturalidad. Estas fotos
          suelen transmitir más emoción y funcionan especialmente bien en álbumes compartidos porque ayudan a revivir
          la experiencia completa. Eso no significa que no deban hacerse fotos preparadas, pero conviene combinarlas
          con escenas espontáneas para que la galería no resulte monótona.
        </p>

        <h3 className="font-headline text-xl text-primary mt-8 mb-4">4. Evita los excesos y limpia la lente</h3>
        <p className="font-body text-base leading-8 text-on-surface-variant">
          Evitar el abuso del zoom también marca una gran diferencia. El zoom digital de muchos móviles reduce la
          calidad, genera ruido y hace que la imagen se vea menos definida. Siempre que puedas, acércate físicamente.
          Si no es posible, intenta mantener el plano abierto y luego seleccionar las mejores imágenes. Del mismo modo, conviene
          limpiar la lente del móvil antes de empezar. Es algo sencillo, pero muchas fotos pierden contraste por una
          huella o una pequeña mancha en la cámara.
        </p>

        <h3 className="font-headline text-xl text-primary mt-8 mb-4">5. Sube las mejores, no todas</h3>
        <p className="mt-4 font-body text-base leading-8 text-on-surface-variant">
          La variedad también ayuda a construir una galería más interesante. No hace falta subir veinte imágenes casi
          iguales del mismo momento. Es preferible aportar diferentes tipos de foto: alguna general del ambiente,
          retratos cercanos, grupos, detalles de decoración, comida, regalos o escenas de interacción entre invitados.
          Por último, antes de subir imágenes, conviene hacer una pequeña selección. Elegir las mejores fotos mejora
          la experiencia de todos con el fin de conservar los recuerdos que merecen la pena.
        </p>
      </article>
    </main>
  );
}
