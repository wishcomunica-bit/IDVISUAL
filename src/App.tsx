import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { WishLoader } from './components/WishLoader';
import { RegaliaPage } from './pages/RegaliaPage';
import { LeiliBuenoPage } from './pages/LeiliBuenoPage';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active brand based on pathname
  const isLeili = location.pathname.startsWith('/leili-bueno');
  const currentBrand: 'regalia' | 'leili' = isLeili ? 'leili' : 'regalia';

  // Loading screen state
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [brandToPreload, setBrandToPreload] = useState<'regalia' | 'leili'>(currentBrand);

  // Sync preloading brand with current location
  useEffect(() => {
    setBrandToPreload(currentBrand);
  }, [currentBrand]);

  // Handler for navigation between brands via the bottom button
  const handleNavigateBrand = useCallback(
    (target: 'regalia' | 'leili') => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setBrandToPreload(target);
      setIsLoading(true);

      // Give a tiny moment for loader dark overlay to be visible, then change route & scroll to top
      setTimeout(() => {
        const targetPath = target === 'regalia' ? '/regalia' : '/leili-bueno';
        navigate(targetPath);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 150);
    },
    [isTransitioning, navigate]
  );

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    setIsTransitioning(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Official WISH Agency Loading Screen */}
      <WishLoader
        isLoading={isLoading}
        onComplete={handleLoaderComplete}
        brandToPreload={brandToPreload}
      />

      {/* Pages Container */}
      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/regalia" replace />} />
          <Route
            path="/regalia"
            element={
              <RegaliaPage
                key="regalia-page"
                onNavigateBrand={handleNavigateBrand}
                isTransitioning={isTransitioning}
              />
            }
          />
          <Route
            path="/leili-bueno"
            element={
              <LeiliBuenoPage
                key="leili-page"
                onNavigateBrand={handleNavigateBrand}
                isTransitioning={isTransitioning}
              />
            }
          />
          <Route path="*" element={<Navigate to="/regalia" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
