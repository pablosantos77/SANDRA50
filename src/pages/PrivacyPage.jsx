import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-8">
      <article className="rounded-2xl bg-white p-6 md:p-10 shadow-[0_4px_12px_rgba(74,124,111,0.05)] border border-secondary/10">
        <h1 className="font-headline text-3xl md:text-4xl text-primary mb-6">Política de Privacidad</h1>
        <p className="mt-4 font-body text-base leading-8 text-on-surface-variant">
          En esta web se recopilan datos mínimos necesarios para permitir la subida de fotografías y el correcto
          funcionamiento del sitio. Los archivos enviados por los usuarios podrán almacenarse temporalmente con el fin
          de construir una galería compartida del 50 cumpleaños de Sandra.
        </p>
        <p className="mt-4 font-body text-base leading-8 text-on-surface-variant">
          Además, este sitio puede utilizar cookies técnicas y, en el futuro, servicios de terceros como Google
          AdSense para mostrar publicidad relevante. En ese caso, dichos servicios pueden usar cookies para personalizar
          anuncios y medir su rendimiento, conforme a sus propias políticas de privacidad.
        </p>
        <p className="mt-4 font-body text-base leading-8 text-on-surface-variant">
          El usuario puede solicitar la eliminación de sus imágenes o consultar cualquier cuestión relacionada con la
          privacidad contactando con el organizador del evento, o bien utilizar el botón de borrado de papelera si cometió un error.
        </p>
        <p className="mt-4 font-body text-base leading-8 text-on-surface-variant">
          Esta política podrá actualizarse para adaptarse a cambios técnicos, legales o funcionales de la web.
        </p>
      </article>
    </main>
  );
}
