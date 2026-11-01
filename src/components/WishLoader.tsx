import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WishLoaderCanvas } from './WishLoaderCanvas';

interface WishLoaderProps {
  isLoading: boolean;
  onComplete: () => void;
  brandToPreload?: 'regalia' | 'leili';
}

export const WishLoader: React.FC<WishLoaderProps> = ({
  isLoading,
  onComplete,
  brandToPreload = 'regalia',
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'appear' | 'loading' | 'finishing' | 'fading_out' | 'done'>('appear');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Preload critical section images for the upcoming brand
  useEffect(() => {
    if (!isLoading) return;

    setImagesLoaded(false);
    setProgress(0);
    setPhase('appear');

    const brandFolder = brandToPreload === 'regalia' ? 'regalia' : 'leili';
    const criticalImages = [
      `/assets/sections/${brandFolder}/01_abertura.webp`,
      `/assets/sections/${brandFolder}/02_essencia.webp`,
      `/assets/sections/${brandFolder}/03_simbolo.webp`,
      `/assets/sections/${brandFolder}/04_fotos.webp`,
    ];

    let loadedCount = 0;
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount >= criticalImages.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [isLoading, brandToPreload]);

  // Smooth 0 -> 100% progress animation over ~3.2 seconds
  useEffect(() => {
    if (!isLoading) return;

    const startTime = performance.now();
    const duration = 3200; // minimum ~3.2s for cinematic feel

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth progress curve
      const easedProgress = Math.floor(rawProgress * 100);

      // Pause at 98% if assets aren't yet ready (max 4.5s)
      if (easedProgress >= 98 && !imagesLoaded && elapsed < 4500) {
        setProgress(98);
        animFrameRef.current = requestAnimationFrame(updateProgress);
        return;
      }

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        // Reached 100%!
        setProgress(100);
        setPhase('finishing');

        // Sequence:
        // 1. Progress bar fades out smoothly (350ms)
        // 2. Logo fades out (after 750ms)
        // 3. Black screen lifts with cinematic ease (after 1100ms)
        setTimeout(() => {
          setPhase('fading_out');
        }, 350);

        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1100);
      }
    };

    // Begin progress after logo fade-in starts
    const timer = setTimeout(() => {
      setPhase('loading');
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoading, imagesLoaded, onComplete]);

  if (!isLoading && phase === 'done') return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="wish-loader"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === 'done' ? 0 : 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
          style={{ backgroundColor: '#000000' }}
        >
          {/* 
            Official WISH Agency Animated Background Canvas
            Strictly limited to WishLoader: unmounts and disappears completely when loader finishes!
          */}
          <WishLoaderCanvas />

          {/* Central Logo & Progress Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Official WISH Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{
                opacity: phase === 'fading_out' || phase === 'done' ? 0 : 1,
                scale: phase === 'fading_out' ? 1.02 : 1,
                y: phase === 'fading_out' ? -6 : 0,
              }}
              transition={{
                duration: phase === 'fading_out' ? 0.6 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-center"
            >
              <img
                src="/assets/LOGO-WISH.png"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.postimg.cc/yW4Cz4Sx/LOGO-WISH.png';
                }}
                alt="WISH Agency"
                className="w-56 md:w-72 lg:w-84 h-auto object-contain drop-shadow-[0_0_40px_rgba(120,40,210,0.25)]"
              />
            </motion.div>

            {/* Progress Bar & Percentage in WISH official gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 'finishing' || phase === 'fading_out' || phase === 'done' ? 0 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="mt-12 flex flex-col items-center w-52 md:w-64"
            >
              {/* Thin Progress Track */}
              <div className="relative w-full h-[2px] bg-neutral-900 overflow-hidden rounded-full">
                {/* Progress Fill with Official WISH Gradient: Electric Blue -> Deep Violet -> Magenta */}
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#005af0] via-[#7828d2] to-[#dc00be]"
                  style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 12px rgba(220, 0, 190, 0.7), 0 0 24px rgba(0, 90, 240, 0.4)',
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Numerical Percentage */}
              <div className="mt-3 text-neutral-400 font-mono text-[11px] tracking-widest tabular-nums">
                {progress}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
