import React from 'react';

const UploadingOverlay = () => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl mx-6">
      <div className="w-12 h-12 border-4 border-[#4a7c6f] border-t-transparent rounded-full animate-spin"></div>
      <p className="font-headline text-lg text-primary">Subiendo tus fotos...</p>
      <p className="text-on-surface-variant font-body text-sm tracking-wide">Espera un momento</p>
    </div>
  </div>
);

export default UploadingOverlay;
