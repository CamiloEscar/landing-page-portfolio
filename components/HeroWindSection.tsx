'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface HeroWindSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

function ThrusterParticles({ baseX, baseY }: { baseX: number; baseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const baseXRef  = useRef(baseX);
  const baseYRef  = useRef(baseY);

  useEffect(() => { baseXRef.current = baseX; }, [baseX]);
  useEffect(() => { baseYRef.current = baseY; }, [baseY]);

  type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string; };
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(255,200,80,','rgba(255,120,40,','rgba(255,255,200,','rgba(180,100,255,'];

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      const cx = baseXRef.current;
      const cy = baseYRef.current;

      if (frame % 2 === 0) {
        for (let i = 0; i < 5; i++) {
          particlesRef.current.push({
            x: cx + (Math.random() - 0.5) * 80, y: cy,
            vx: (Math.random() - 0.5) * 2.5,    vy: 1.5 + Math.random() * 4,
            life: 0, maxLife: 18 + Math.random() * 22,
            size: 2 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.vx *= 0.97; p.life++;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) return;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grd.addColorStop(0,   `${p.color}${alpha})`);
        grd.addColorStop(0.5, `${p.color}${alpha * 0.4})`);
        grd.addColorStop(1,   `${p.color}0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2); ctx.fillStyle = `${p.color}${alpha})`; ctx.fill();
      });

      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }} />;
}

export default function HeroWindSection({
  children,
  className = '',
  intensity = 0.75,
}: HeroWindSectionProps) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  const [thrusterActive, setThrusterActive] = useState(false);
  const [thrusterX,      setThrusterX]      = useState(0);
  const [thrusterY,      setThrusterY]      = useState(0);

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const clamp       = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const easeIn      = (t: number) => t * t;
    const easeOut     = (t: number) => 1 - Math.pow(1 - t, 2);
    const launchCurve = (t: number) =>
      t < 0.15 ? t * t * 0.5 : Math.pow((t - 0.15) / 0.85, 2.5);

    const tick = () => {
      const outerRect   = outer.getBoundingClientRect();
      const scrolled    = -outerRect.top;
      const extraScroll = window.innerHeight * 0.65;
      const progress    = clamp(scrolled / extraScroll, 0, 1);

      if (progress <= 0) {
        sticky.style.transform = 'none';
        sticky.style.opacity   = '1';
        sticky.style.filter    = 'blur(0px)';
        sticky.style.boxShadow = 'none';
        setThrusterActive(false);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dark = document.documentElement.classList.contains('dark');

      if (dark) {
        const lp = launchCurve(progress);

        const lift   = lp * window.innerHeight * 1.4 * intensity;
        const driftX = Math.sin(progress * Math.PI * 1.5) * 15 * intensity * (1 - progress);
        const rotate = progress > 0.8 ? (progress - 0.8) * 5 * intensity : 0;

        const speedBlur  = lp * 20 * intensity;
        const brightness = progress < 0.15 ? 1 + progress * 3 : 1 + lp * 0.5;
        const opacity    = progress < 0.65
          ? 1
          : clamp(1 - ((progress - 0.65) / 0.35) * 2, 0, 1);

        sticky.style.transform = `translateX(${driftX}px) translateY(${-lift}px) rotate(${rotate}deg)`;
        sticky.style.opacity   = String(Math.max(0, opacity));
        sticky.style.filter    = `blur(${speedBlur}px) brightness(${brightness})`;
        sticky.style.boxShadow = 'none';

        // ✅ Buscar exactamente la card por data-hero-card
        // getBoundingClientRect ya tiene en cuenta el transform del sticky
        const cardEl = sticky.querySelector('[data-hero-card]') as HTMLElement | null;
        if (cardEl) {
          const rect = cardEl.getBoundingClientRect();
          setThrusterX(rect.left + rect.width / 2);
          setThrusterY(rect.bottom + 6);
        }

        setThrusterActive(progress > 0.02 && progress < 0.85);

      } else {
        const fly    = easeOut(progress);
        const driftX =  fly * 90  * intensity;
        const driftY = -fly * 160 * intensity;
        const rotate = fly * 12 * intensity
          + Math.sin(progress * Math.PI * 2.2) * 4 * intensity * (1 - progress);
        const scale   = 1 - easeIn(progress) * 0.07 * intensity;
        const opacity = progress < 0.3
          ? 1
          : clamp(1 - ((progress - 0.3) / 0.7) * 1.3, 0, 1);
        const blurPx  = progress < 0.45
          ? 0
          : easeIn((progress - 0.45) / 0.55) * 10 * intensity;

        sticky.style.transform = `translateX(${driftX}px) translateY(${driftY}px) rotate(${rotate}deg) scale(${scale})`;
        sticky.style.opacity   = String(Math.max(0, opacity));
        sticky.style.filter    = `blur(${blurPx}px)`;
        sticky.style.boxShadow = 'none';
        setThrusterActive(false);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (sticky) {
        sticky.style.transform = 'none';
        sticky.style.opacity   = '1';
        sticky.style.filter    = 'none';
        sticky.style.boxShadow = 'none';
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intensity, resolvedTheme]);

  return (
    <>
      {thrusterActive && <ThrusterParticles baseX={thrusterX} baseY={thrusterY} />}

      <div
        ref={outerRef}
        className={`hero-wind-outer ${className}`}
        style={{ height: '165vh', marginBottom: '-30vh', overflow: 'visible' }}
      >
        <div
          ref={stickyRef}
          style={{
            position:        'sticky',
            top:             0,
            height:          '100vh',
            willChange:      'transform, opacity, filter',
            isolation:       'isolate',
            transformOrigin: '50% 100%',
            zIndex:          10,
            overflow:        'visible',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}