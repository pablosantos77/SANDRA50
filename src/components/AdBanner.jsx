import React, { useEffect } from 'react';

export default function AdBanner({ slot = '1234567890', format = 'auto', className = '' }) {
  const isProd = import.meta.env.PROD;
  const adsenseClient = 'ca-pub-XXXXXXXXXXXXXXXX'; 

  useEffect(() => {
    if (isProd && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    }
  }, [isProd]);

  if (!isProd) {
    return (
      <div className={`flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-xs text-gray-400 uppercase tracking-widest ${className}`}>
        Espacio Publicitario (Activo en sandra50.es)
      </div>
    );
  }

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={adsenseClient}
           data-ad-slot={slot}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
    </div>
  );
}
