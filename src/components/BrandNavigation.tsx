import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface BrandNavigationProps {
  currentBrand: 'regalia' | 'leili';
  onNavigate: (target: 'regalia' | 'leili') => void;
  isTransitioning: boolean;
}

export const BrandNavigation: React.FC<BrandNavigationProps> = ({
  currentBrand,
  onNavigate,
  isTransitioning,
}) => {
  const isRegalia = currentBrand === 'regalia';
  const targetBrand = isRegalia ? 'leili' : 'regalia';
  const buttonText = isRegalia ? 'CONHECER LEILI BUENO JOYERÍA' : 'CONHECER REGALIA';
  const subText = isRegalia ? 'EXPLORAR PRÓXIMA IDENTIDADE' : 'RETORNAR À APRESENTAÇÃO ANTERIOR';

  const handleClick = () => {
    if (isTransitioning) return;
    onNavigate(targetBrand);
  };

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-neutral-900 py-24 px-6 flex flex-col items-center justify-center text-center select-none">
      <div className="max-w-xl flex flex-col items-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-6">
          {subText}
        </span>

        <motion.button
          onClick={handleClick}
          disabled={isTransitioning}
          whileHover={{ scale: isTransitioning ? 1 : 1.02, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
          whileTap={{ scale: isTransitioning ? 1 : 0.98 }}
          className={`group relative inline-flex items-center gap-4 px-10 py-5 rounded-none border text-xs sm:text-sm font-medium tracking-[0.25em] transition-all duration-300 ${
            isRegalia
              ? 'border-neutral-700 text-neutral-200 hover:border-amber-500/60 hover:text-white'
              : 'border-neutral-700 text-neutral-200 hover:border-rose-400/60 hover:text-white'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ letterSpacing: '0.22em' }}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />

          {/* Subtle bottom edge glow on hover */}
          <span
            className={`absolute bottom-0 left-0 right-0 h-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
              isRegalia
                ? 'bg-gradient-to-r from-transparent via-amber-400/80 to-transparent'
                : 'bg-gradient-to-r from-transparent via-rose-300/80 to-transparent'
            }`}
          />
        </motion.button>

        {/* Agency signature credit */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <img
            src="/assets/LOGO-WISH.png"
            alt="WISH Agency"
            className="h-6 w-auto opacity-40 hover:opacity-70 transition-opacity duration-300"
          />
          <span className="text-[10px] text-neutral-600 tracking-widest font-mono uppercase mt-1">
            WISH Agency · Portfolio Digital de Identidade Visual
          </span>
        </div>
      </div>
    </footer>
  );
};
