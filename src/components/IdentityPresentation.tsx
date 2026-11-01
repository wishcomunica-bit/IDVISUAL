import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { RevealSection } from './RevealSection';
import { BrandNavigation } from './BrandNavigation';

interface IdentityPresentationProps {
  brand: 'regalia' | 'leili';
  onNavigateBrand: (target: 'regalia' | 'leili') => void;
  isTransitioning: boolean;
}

export const IdentityPresentation: React.FC<IdentityPresentationProps> = ({
  brand,
  onNavigateBrand,
  isTransitioning,
}) => {
  const brandPath = `/assets/sections/${brand}`;

  // In-view observer refs for compound sequential sections
  const sec3Ref = useRef<HTMLDivElement>(null);
  const isSec3InView = useInView(sec3Ref, { once: true, amount: 0.2 });

  const sec4Ref = useRef<HTMLDivElement>(null);
  const isSec4InView = useInView(sec4Ref, { once: true, amount: 0.15 });

  const sec5Ref = useRef<HTMLDivElement>(null);
  const isSec5InView = useInView(sec5Ref, { once: true, amount: 0.2 });

  const sec6Ref = useRef<HTMLDivElement>(null);
  const isSec6InView = useInView(sec6Ref, { once: true, amount: 0.15 });

  const sec7Ref = useRef<HTMLDivElement>(null);
  const isSec7InView = useInView(sec7Ref, { once: true, amount: 0.15 });

  const sec8Ref = useRef<HTMLDivElement>(null);
  const isSec8InView = useInView(sec8Ref, { once: true, amount: 0.2 });

  const sec9Ref = useRef<HTMLDivElement>(null);
  const isSec9InView = useInView(sec9Ref, { once: true, amount: 0.2 });

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">
      {/* 
        Master presentation composition container:
        Matches the exact coordinate system and continuous vertical presentation of the original PDF.
        Width is 100% responsive, up to 1600px desktop canvas.
        Zero margins, zero padding, zero rounded corners, zero cards.
      */}
      <main className="w-full max-w-[1600px] mx-auto bg-white flex flex-col p-0 m-0 shadow-2xl relative select-none">
        
        {/* ========================================================= */}
        {/* ETAPA 01 — ABERTURA (Y: 0 to 2380 | Aspect 5333 / 2380)   */}
        {/* ========================================================= */}
        <RevealSection delay={0.2} duration={1.3} className="block m-0 p-0">
          <div
            className="w-full relative overflow-hidden block m-0 p-0"
            style={{ aspectRatio: '5333 / 2380' }}
          >
            <img
              src={`${brandPath}/01_abertura.webp`}
              alt={brand === 'regalia' ? 'REGALIA - Abertura' : 'Leili Bueno Joyería - Abertura'}
              className="w-full h-full object-fill block m-0 p-0 pointer-events-none"
              loading="eager"
            />
          </div>
        </RevealSection>

        {/* ========================================================= */}
        {/* ETAPA 02 — ESSÊNCIA (Y: 2380 to 3320 | Aspect 5333 / 940) */}
        {/* ========================================================= */}
        <RevealSection delay={0.1} duration={1.1} className="block m-0 p-0 -mt-[1px]">
          <div
            className="w-full relative overflow-hidden block m-0 p-0"
            style={{ aspectRatio: '5333 / 940' }}
          >
            <img
              src={`${brandPath}/02_essencia.webp`}
              alt="Essência da Marca"
              className="w-full h-full object-fill block m-0 p-0 pointer-events-none"
              loading="lazy"
            />
          </div>
        </RevealSection>

        {/* ========================================================= */}
        {/* ETAPA 03 — CONSTRUÇÃO DO SÍMBOLO                          */}
        {/* (Y: 3320 to 3790 | Aspect 5333 / 470)                     */}
        {/* Sequential reveal of 1. *, 2. +, 3. L, 4. =, 5. Symbol    */}
        {/* Master image with CSS clip-paths ensures 0 misalignment    */}
        {/* ========================================================= */}
        <div
          ref={sec3Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 470' }}
        >
          {/* Base invisible image to establish absolute coordinate plane */}
          <img
            src={`${brandPath}/03_simbolo.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* 1. Ícone de brilho (*) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(0% 0%, 43.5% 0%, 43.5% 100%, 0% 100%)' }}
          >
            <img
              src={`${brandPath}/03_simbolo.webp`}
              alt="Ícone de brilho"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 2. Sinal de adição (+) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(43.5% 0%, 47.5% 0%, 47.5% 100%, 43.5% 100%)' }}
          >
            <img
              src={`${brandPath}/03_simbolo.webp`}
              alt="Sinal de adição"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 3. Letra L */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(47.5% 0%, 52.5% 0%, 52.5% 100%, 47.5% 100%)' }}
          >
            <img
              src={`${brandPath}/03_simbolo.webp`}
              alt="Letra L"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 4. Sinal de igualdade (=) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(52.5% 0%, 56.5% 0%, 56.5% 100%, 52.5% 100%)' }}
          >
            <img
              src={`${brandPath}/03_simbolo.webp`}
              alt="Sinal de igualdade"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 5. Símbolo final */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(56.5% 0%, 100% 0%, 100% 100%, 56.5% 100%)' }}
          >
            <img
              src={`${brandPath}/03_simbolo.webp`}
              alt="Símbolo Final"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* ETAPA 04 — FOTOGRAFIAS (Y: 3790 to 6425 | Aspect 5333 / 2635) */}
        {/* 1. Mulher braços abertos (esquerda)                       */}
        {/* 2. Retrato feminino joias (direita)                       */}
        {/* Seamless clip-path on identical master image              */}
        {/* ========================================================= */}
        <div
          ref={sec4Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 2635' }}
        >
          {/* Base image */}
          <img
            src={`${brandPath}/04_fotos.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Left photo: Mulher com os braços abertos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec4InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
          >
            <img
              src={`${brandPath}/04_fotos.webp`}
              alt="Fotografia da marca - Expressão"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* Right photo: Retrato feminino joias */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec4InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
          >
            <img
              src={`${brandPath}/04_fotos.webp`}
              alt="Fotografia da marca - Joias e Tipografia"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* ETAPA 05 — VARIAÇÕES LOGOTIPO                             */}
        {/* (Y: 6425 to 7015 | Aspect 5333 / 590)                     */}
        {/* 3 versions side by side revealed from left to right       */}
        {/* ========================================================= */}
        <div
          ref={sec5Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 590' }}
        >
          <img
            src={`${brandPath}/05_logos.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Version 1 (Left: 0 to 33.333%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec5InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(0% 0%, 33.333% 0%, 33.333% 100%, 0% 100%)' }}
          >
            <img
              src={`${brandPath}/05_logos.webp`}
              alt="Variação de Logotipo 1"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* Version 2 (Center: 33.333% to 66.666%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec5InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(33.333% 0%, 66.666% 0%, 66.666% 100%, 33.333% 100%)' }}
          >
            <img
              src={`${brandPath}/05_logos.webp`}
              alt="Variação de Logotipo 2"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* Version 3 (Right: 66.666% to 100%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec5InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(66.666% 0%, 100% 0%, 100% 100%, 66.666% 100%)' }}
          >
            <img
              src={`${brandPath}/05_logos.webp`}
              alt="Variação de Logotipo 3"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* ETAPA 06 — MOCKUPS 1 (Y: 7015 to 9375 | Aspect 5333 / 2360) */}
        {/* 1. Sacolas | 2. Tags | 3. Embalagem de tecido             */}
        {/* ========================================================= */}
        <div
          ref={sec6Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 2360' }}
        >
          <img
            src={`${brandPath}/06_mockups1.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* 1. Sacolas e embalagens (0 to 33.333%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec6InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(0% 0%, 33.333% 0%, 33.333% 100%, 0% 100%)' }}
          >
            <img
              src={`${brandPath}/06_mockups1.webp`}
              alt="Aplicação: Sacolas e embalagens"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 2. Tags e cartões (33.333% to 66.666%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec6InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(33.333% 0%, 66.666% 0%, 66.666% 100%, 33.333% 100%)' }}
          >
            <img
              src={`${brandPath}/06_mockups1.webp`}
              alt="Aplicação: Tags e cartões"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 3. Embalagem de tecido (66.666% to 100%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec6InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(66.666% 0%, 100% 0%, 100% 100%, 66.666% 100%)' }}
          >
            <img
              src={`${brandPath}/06_mockups1.webp`}
              alt="Aplicação: Embalagem de tecido"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* ETAPA 07 — MOCKUPS 2 (Y: 9375 to 11805 | Aspect 5333 / 2430) */}
        {/* 1. Papelaria impressa | 2. Apresentação no celular        */}
        {/* ========================================================= */}
        <div
          ref={sec7Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 2430' }}
        >
          <img
            src={`${brandPath}/07_mockups2.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* 1. Composição impressa (0 to 59%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec7InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(0% 0%, 59% 0%, 59% 100%, 0% 100%)' }}
          >
            <img
              src={`${brandPath}/07_mockups2.webp`}
              alt="Aplicação: Papelaria impressa"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>

          {/* 2. Celular com apresentação da marca (59% to 100%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSec7InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: 'polygon(59% 0%, 100% 0%, 100% 100%, 59% 100%)' }}
          >
            <img
              src={`${brandPath}/07_mockups2.webp`}
              alt="Aplicação: Celular feed Instagram"
              className="w-full h-full object-fill block m-0 p-0"
            />
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* ETAPA 08 — SÍMBOLOS GRÁFICOS                              */}
        {/* (Y: 11805 to 12705 | Aspect 5333 / 900)                   */}
        {/* 5 symbol groups revealed sequentially across the strip    */}
        {/* ========================================================= */}
        <div
          ref={sec8Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 900' }}
        >
          <img
            src={`${brandPath}/08_simbolos.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {[
            { id: 1, pStart: 0, pEnd: 25, delay: 0.15 },
            { id: 2, pStart: 25, pEnd: 43, delay: 0.35 },
            { id: 3, pStart: 43, pEnd: 59, delay: 0.55 },
            { id: 4, pStart: 59, pEnd: 77, delay: 0.75 },
            { id: 5, pStart: 77, pEnd: 100, delay: 0.95 },
          ].map((item) => (
            <motion.div
              key={`symbol-clip-${item.id}`}
              initial={{ opacity: 0 }}
              animate={isSec8InView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.9, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `polygon(${item.pStart}% 0%, ${item.pEnd}% 0%, ${item.pEnd}% 100%, ${item.pStart}% 100%)`,
              }}
            >
              <img
                src={`${brandPath}/08_simbolos.webp`}
                alt={`Símbolo ${item.id}`}
                className="w-full h-full object-fill block m-0 p-0"
              />
            </motion.div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* ETAPA 09 — PALETA DE CORES                                */}
        {/* (Y: 12705 to 14102 | Aspect 5333 / 1397)                  */}
        {/* 4 color blocks revealed from left to right                */}
        {/* ========================================================= */}
        <div
          ref={sec9Ref}
          className="w-full relative overflow-hidden block m-0 p-0 -mt-[1px]"
          style={{ aspectRatio: '5333 / 1397' }}
        >
          <img
            src={`${brandPath}/09_paleta.webp`}
            alt=""
            className="w-full h-full object-fill block opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {[
            { id: 1, pStart: 0, pEnd: 31, delay: 0.15 },
            { id: 2, pStart: 31, pEnd: 50, delay: 0.4 },
            { id: 3, pStart: 50, pEnd: 69, delay: 0.65 },
            { id: 4, pStart: 69, pEnd: 100, delay: 0.9 },
          ].map((color) => (
            <motion.div
              key={`palette-clip-${color.id}`}
              initial={{ opacity: 0 }}
              animate={isSec9InView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.1, delay: color.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `polygon(${color.pStart}% 0%, ${color.pEnd}% 0%, ${color.pEnd}% 100%, ${color.pStart}% 100%)`,
              }}
            >
              <img
                src={`${brandPath}/09_paleta.webp`}
                alt={`Cor ${color.id}`}
                className="w-full h-full object-fill block m-0 p-0"
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* ========================================================= */}
      {/* NAVEGAÇÃO ENTRE AS MARCAS (Separada ao final da página)   */}
      {/* ========================================================= */}
      <BrandNavigation
        currentBrand={brand}
        onNavigate={onNavigateBrand}
        isTransitioning={isTransitioning}
      />
    </div>
  );
};
