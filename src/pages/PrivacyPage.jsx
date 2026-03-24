import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-8">
      <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Política de Privacidad</h1>
        <p className="mt-4 text-base leading-8 text-neutral-700">
          En esta web se recopilan datos mínimos necesarios para permitir la subida de fotografías y el correcto
          funcionamiento del sitio. Los archivos enviados por los usuarios podrán almacenarse temporalmente con el fin
          de construir una galería compartida del evento.
        </p>
        <p className="mt-4 text-base leading-8 text-neutral-700">
          Además, este sitio puede utilizar cookies técnicas y, en el futuro, servicios de terceros como Google
          AdSense para mostrar publicidad relevante. En ese caso, dichos servicios pueden usar cookies para personalizar
          anuncios y medir su rendimiento, conforme a sus propias políticas de privacidad.
        </p>
        <p className="mt-4 text-base leading-8 text-neutral-700">
          El usuario puede solicitar la eliminación de sus imágenes o consultar cualquier cuestión relacionada con la
          privacidad escribiendo al organizador del 50 de Sandra.
        </p>
        <p className="mt-4 text-base leading-8 text-neutral-700">
          Esta política podrá actualizarse para adaptarse a cambios técnicos, legales o funcionales de la web.
        </p>
      </article>
    </main>
  );
}
