/* eslint-disable no-undef */
'use client';

import React, { useRef, useEffect, useState } from 'react';

interface WindSectionProps {
  children: React.ReactNode;
  className?: string;
  exitDirection?: 'left' | 'right';
  intensity?: number;
}

export default function WindSection({
  children,
  className = '',
  exitDirection = 'left',
  intensity = 0.6,
}: WindSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animRef    = useRef<Animation | null>(null);
  const stateRef   = useRef<'hidden' | 'visible' | 'animating'>('hidden');

  // null = todavia no sabemos (SSR/hidratacion) -> tratar como mobile para evitar
  // que el translateX inicial cause overflow y mueva el navbar
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const tx   = Math.round(110 * intensity);
  const ty   = Math.round(18  * intensity);
  const rot  = parseFloat((3.5 * intensity).toFixed(2));
  const blur = Math.round(8   * intensity);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Mobile o aun sin determinar: visible, sin animacion
    if (isMobile !== false) {
      el.style.transform = 'none';
      el.style.opacity   = '1';
      el.style.filter    = 'none';
      return;
    }

    const cancelAnim = () => {
      if (animRef.current) { animRef.current.cancel(); animRef.current = null; }
    };

    const applyKF = (kf: Keyframe) => {
      el.style.transform = (kf.transform as string) ?? '';
      el.style.opacity   = String(kf.opacity ?? 1);
      el.style.filter    = (kf.filter as string) ?? '';
    };

    const runAnim = (from: Keyframe, to: Keyframe, ms: number, easing: string, done?: () => void) => {
      cancelAnim();
      stateRef.current = 'animating';
      applyKF(from);
      const a = el.animate([from, to], { duration: ms, easing, fill: 'forwards' });
      animRef.current = a;
      a.onfinish = () => { animRef.current = null; applyKF(to); done?.(); };
      a.oncancel = () => { animRef.current = null; };
    };

    const KF_VISIBLE: Keyframe = {
      transform: 'translateX(0px) translateY(0px) rotate(0deg) scale(1)',
      opacity:   1,
      filter:    'blur(0px)',
    };

    const kfEnter = (fromLeft: boolean): Keyframe => ({
      transform: `translateX(${fromLeft ? tx : -tx}px) translateY(${ty}px) rotate(${fromLeft ? -rot : rot}deg) scale(0.97)`,
      opacity:   0,
      filter:    `blur(${blur}px)`,
    });

    const kfExit = (toLeft: boolean): Keyframe => ({
      transform: `translateX(${toLeft ? -tx * 1.2 : tx * 1.2}px) translateY(${-ty * 0.5}px) rotate(${toLeft ? rot * 1.3 : -rot * 1.3}deg) scale(0.94)`,
      opacity:   0,
      filter:    `blur(${blur * 0.8}px)`,
    });

    // Estado inicial: solo opacity para no causar overflow horizontal
    el.style.opacity   = '0';
    el.style.filter    = `blur(${blur}px)`;
    el.style.transform = 'none';
    stateRef.current   = 'hidden';

    let lastY = window.scrollY;

    const onScroll = () => {
      const rect      = el.getBoundingClientRect();
      const vh        = window.innerHeight;
      const curY      = window.scrollY;
      const goingDown = curY >= lastY;
      lastY = curY;

      const inView = rect.top < vh * 0.88 && rect.bottom > vh * 0.1;

      if (inView && stateRef.current === 'hidden') {
        const enterFrom = goingDown
          ? kfEnter(exitDirection !== 'left')
          : kfEnter(exitDirection === 'left');
        runAnim(enterFrom, KF_VISIBLE, 750, 'cubic-bezier(0.16, 1, 0.3, 1)',
          () => { stateRef.current = 'visible'; });
      }

      if (!inView && stateRef.current === 'visible') {
        const exitToLeft = goingDown
          ? exitDirection === 'left'
          : exitDirection !== 'left';
        runAnim(KF_VISIBLE, kfExit(exitToLeft), 400, 'cubic-bezier(0.55, 0, 1, 0.45)',
          () => { stateRef.current = 'hidden'; });
      }
    };

    // Doble rAF: espera 2 frames para que el DOM tenga dimensiones reales.
    // Sin esto, cuando isMobile cambia null->false, getBoundingClientRect()
    // puede retornar valores incorrectos y la seccion queda invisible.
    let rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(onScroll);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      cancelAnim();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exitDirection, intensity, isMobile]);

  return (
    <div
      ref={wrapperRef}
      className={`wind-section ${className}`}
      style={{
        willChange: isMobile === false ? 'transform, opacity, filter' : 'auto',
        isolation:  'isolate',
      }}
    >
      {children}
    </div>
  );
}