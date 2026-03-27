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
  <header className="sticky top-[env(safe-area-inset-top)] w-full z-40 bg-white/85 backdrop-blur-xl border-b border-primary/5 shadow-[0_8px_30px_rgba(45,70,54,0.04)] transition-all duration-500">
    <div className="mx-auto flex max-w-[1200px] h-16 w-full items-center justify-center md:justify-start px-4 sm:px-6">
      <Link 
        to="/" 
        className="group relative flex items-center gap-3 overflow-hidden rounded-2xl py-2 px-3 transition-all hover:bg-surface-container-low"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(45,70,54,0.25)]">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
        </div>
        <div className="flex items-baseline gap-1.5 transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="font-headline text-[1.1rem] font-bold tracking-widest text-[#2D4636]">50</span>
          <span className="font-sandra text-[1.35rem] font-normal leading-none tracking-normal text-secondary lowercase pt-1 group-hover:text-primary transition-colors duration-300">cumpleaños de Sandra</span>
        </div>
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
