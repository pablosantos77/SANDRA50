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
        className="group relative flex items-center gap-3.5 overflow-hidden rounded-2xl py-2 px-3 transition-all hover:bg-surface-container-lowest hover:shadow-[0_2px_10px_rgba(45,70,54,0.02)]"
      >
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-white shadow-sm transition-all duration-[800ms] group-hover:rotate-90 group-hover:scale-[1.05] group-hover:border-primary/50 group-hover:bg-[#446351]/5 group-hover:shadow-[0_4px_16px_rgba(68,99,81,0.15)]">
          <div className="absolute inset-x-1 inset-y-1 rounded-full border-[0.5px] border-primary/10 transition-all duration-700 group-hover:scale-[0.80] group-hover:border-primary/30"></div>
          <span 
            className="material-symbols-outlined text-[20px] text-primary transition-all duration-[800ms] group-hover:-rotate-90"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
          >
            spa
          </span>
        </div>
        
        <div className="flex items-baseline gap-1.5 transition-transform duration-500 group-hover:translate-x-1">
          <span className="font-headline text-[1.15rem] font-bold tracking-widest text-[#2D4636]">50</span>
          <span className="font-sandra text-[1.4rem] font-normal leading-none tracking-normal text-secondary lowercase pt-1 group-hover:text-primary transition-colors duration-300">cumpleaños de Sandra</span>
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
