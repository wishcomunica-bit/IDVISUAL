import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  delay = 0,
  duration = 1.1,
  yOffset = 0,
  className = '',
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative w-full block m-0 p-0 ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};
