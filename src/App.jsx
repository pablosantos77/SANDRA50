import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import UploadPage from './pages/UploadPage';
import PrivacyPage from './pages/PrivacyPage';
import SuccessUploadPage from './pages/SuccessUploadPage';
import PhotoGuidePage from './pages/PhotoGuidePage';

const Header = () => (
  <header className="sticky top-0 w-full z-40 bg-[#f9f9f7]/90 dark:bg-stone-900/90 backdrop-blur-md shadow-[0_4px_20px_rgba(43,43,43,0.03)] transition-colors duration-300">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16 w-full">
      <Link to="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#446351] dark:text-emerald-200">spa</span>
        <h1 className="font-['Noto_Serif'] font-bold text-xl tracking-tight text-[#446351] dark:text-emerald-200">50 de Sandra</h1>
      </Link>
    </div>
  </header>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-on-surface font-body selection:bg-secondary-container min-h-screen pb-20">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/subir" element={<UploadPage />} />
          <Route path="/gracias-por-subir" element={<SuccessUploadPage />} />
          <Route path="/guia-fotos" element={<PhotoGuidePage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
