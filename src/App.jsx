import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';

import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import UploadPage from './pages/UploadPage';
import TipsPage from './pages/TipsPage';
import PrivacyPage from './pages/PrivacyPage';

import SuccessUploadPage from './pages/SuccessUploadPage';
import PreGalleryPage from './pages/PreGalleryPage';
import PhotoGuidePage from './pages/PhotoGuidePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-100 text-neutral-900">
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link to="/" className="text-lg font-bold tracking-tight">
              Álbum Evento
            </Link>
            <Link to="/privacidad" className="text-sm text-neutral-600 hover:text-black">
              Política de Privacidad
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/subir" element={<UploadPage />} />
          <Route path="/consejos" element={<TipsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          
          <Route path="/acceder-galeria" element={<PreGalleryPage />} />
          <Route path="/gracias-por-subir" element={<SuccessUploadPage />} />
          <Route path="/guia-fotos" element={<PhotoGuidePage />} />
        </Routes>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
