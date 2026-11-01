import React, { useEffect, useRef } from 'react';

/**
 * High-performance cinematic canvas background for WISH Agency loading screen.
 * Strictly uses official WISH logo colors:
 * - Electric Blue: #005af0 / rgb(0, 90, 240)
 * - Deep Violet: #7828d2 / rgb(120, 40, 210)
 * - Vibrant Magenta / Fuchsia: #dc00be / rgb(220, 0, 190)
 * - Crisp White / Silver accents: #ffffff
 * Against absolute black #000000.
 */
export const WishLoaderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle pool
    const particleCount = 42;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      alphaTarget: number;
      color: string;
      pulseSpeed: number;
    }> = [];

    const wishColors = [
      'rgba(0, 90, 240, ',   // Electric Blue
      'rgba(120, 40, 210, ', // Deep Violet
      'rgba(220, 0, 190, ',  // Magenta
      'rgba(255, 255, 255, ', // White/Silver
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
        alphaTarget: Math.random() * 0.5 + 0.2,
        color: wishColors[Math.floor(Math.random() * wishColors.length)],
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // Abstract geometric lines
    const lineCount = 5;
    const lines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.12 + 0.04,
        color: i % 2 === 0 ? 'rgba(0, 90, 240,' : 'rgba(220, 0, 190,',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;

      // Pure black canvas clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // 1. Cinematic Ambient Radial Glows (Electric Blue & Magenta shifting gently)
      const glow1X = width * 0.45 + Math.sin(time * 0.6) * 60;
      const glow1Y = height * 0.48 + Math.cos(time * 0.5) * 40;
      const grad1 = ctx.createRadialGradient(glow1X, glow1Y, 10, glow1X, glow1Y, Math.max(width, height) * 0.45);
      grad1.addColorStop(0, 'rgba(0, 90, 240, 0.14)');
      grad1.addColorStop(0.5, 'rgba(120, 40, 210, 0.06)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const glow2X = width * 0.55 + Math.cos(time * 0.7) * 70;
      const glow2Y = height * 0.52 + Math.sin(time * 0.6) * 50;
      const grad2 = ctx.createRadialGradient(glow2X, glow2Y, 10, glow2X, glow2Y, Math.max(width, height) * 0.4);
      grad2.addColorStop(0, 'rgba(220, 0, 190, 0.12)');
      grad2.addColorStop(0.5, 'rgba(120, 40, 210, 0.05)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Minimalist subtle rotating geometric ring around center
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.08);

      // Outer delicate dashed ring
      ctx.beginPath();
      ctx.arc(0, 0, 220, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 90, 240, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 24]);
      ctx.stroke();

      // Middle ring
      ctx.beginPath();
      ctx.arc(0, 0, 290, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(220, 0, 190, 0.06)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 38]);
      ctx.stroke();

      ctx.restore();

      // 3. Subtle fine geometric lines drifting across background
      ctx.setLineDash([]);
      for (const line of lines) {
        line.x1 += line.vx;
        line.y1 += line.vy;
        line.x2 += line.vx;
        line.y2 += line.vy;

        if (line.x1 < -100 || line.x1 > width + 100) line.vx *= -1;
        if (line.y1 < -100 || line.y1 > height + 100) line.vy *= -1;

        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `${line.color} ${line.alpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // 4. Floating particles with delicate breathing glow & subtle connectors
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Breathing opacity
        p.alpha += (p.alphaTarget - p.alpha) * p.pulseSpeed;
        if (Math.abs(p.alphaTarget - p.alpha) < 0.03) {
          p.alphaTarget = Math.random() * 0.55 + 0.15;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color === wishColors[0] ? '#005af0' : '#dc00be';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle connections between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(120, 40, 210, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ background: '#000000' }}
    />
  );
};
