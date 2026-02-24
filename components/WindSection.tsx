'use client';

import React, { useRef, useEffect } from 'react';

interface WindSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Hacia dónde sale la sección al scrollear hacia abajo */
  exitDirection?: 'left' | 'right';
  /** Intensidad del efecto 0–1 (default 0.6) */
  intensity?: number;
}

/**
 * WindSection
 *
 * Efecto de viento lateral para secciones normales del portfolio.
 * Al entrar en el viewport aparece desde el costado con blur y rotación.
 * Al salir se va volando hacia el lado opuesto.
 *
 * NO usar para la Introduction — usar HeroWindSection en su lugar.
 *
 * USO:
 *   <WindSection exitDirection="left"><AboutMe /></WindSection>
 *   <WindSection exitDirection="right"><Portfolio /></WindSection>
 */
export default function WindSection({
  children,
  className = '',
  exitDirection = 'left',
  intensity = 0.6,
}: WindSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animRef    = useRef<Animation | null>(null);
  const stateRef   = useRef<'hidden' | 'visible' | 'animating'>('hidden');

  const tx   = Math.round(90  * intensity);
  const rot  = parseFloat((2.5 * intensity).toFixed(2));
  const blur = Math.round(5   * intensity);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // ── helpers ───────────────────────────────────────────────────
    const cancelAnim = () => {
      if (animRef.current) { animRef.current.cancel(); animRef.current = null; }
    };

    const applyKF = (kf: Keyframe) => {
      el.style.transform = (kf.transform as string) ?? '';
      el.style.opacity   = String(kf.opacity ?? 1);
      el.style.filter    = (kf.filter  as string) ?? '';
    };

    const runAnim = (
      from: Keyframe,
      to:   Keyframe,
      ms:   number,
      done?: () => void
    ) => {
      cancelAnim();
      stateRef.current = 'animating';
      applyKF(from);
      const a = el.animate([from, to], {
        duration: ms,
        easing:   'cubic-bezier(0.22, 0.61, 0.36, 1)',
        fill:     'forwards',
      });
      animRef.current = a;
      a.onfinish = () => { animRef.current = null; applyKF(to); done?.(); };
      a.oncancel = () => { animRef.current = null; };
    };

    // ── keyframes ─────────────────────────────────────────────────
    const KF_VISIBLE: Keyframe = {
      transform: 'translateX(0px) translateY(0px) rotate(0deg)',
      opacity:   1,
      filter:    'blur(0px)',
    };

    const kfSide = (fromLeft: boolean): Keyframe => ({
      transform: `translateX(${fromLeft ? tx : -tx}px) translateY(0px) rotate(${fromLeft ? -rot : rot}deg)`,
      opacity:   0,
      filter:    `blur(${blur}px)`,
    });

    // Estado inicial: oculta fuera del viewport
    applyKF(kfSide(exitDirection !== 'left'));
    stateRef.current = 'hidden';

    // ── scroll handler ────────────────────────────────────────────
    let lastY = window.scrollY;

    const onScroll = () => {
      const rect      = el.getBoundingClientRect();
      const vh        = window.innerHeight;
      const curY      = window.scrollY;
      const goingDown = curY >= lastY;
      lastY = curY;

      // "en vista" = solapa el viewport al menos un 10%
      const inView = rect.top < vh * 0.88 && rect.bottom > vh * 0.12;

      if (inView && stateRef.current === 'hidden') {
        const enterFrom = goingDown
          ? kfSide(exitDirection !== 'left')
          : kfSide(exitDirection === 'left');
        runAnim(enterFrom, KF_VISIBLE, 680, () => { stateRef.current = 'visible'; });
      }

      if (!inView && stateRef.current === 'visible') {
        const exitLeft = goingDown
          ? exitDirection === 'left'
          : exitDirection !== 'left';
        const exitKF: Keyframe = {
          transform: `translateX(${exitLeft ? -tx : tx}px) translateY(0px) rotate(${exitLeft ? rot : -rot}deg)`,
          opacity:   0,
          filter:    `blur(${blur}px)`,
        };
        runAnim(KF_VISIBLE, exitKF, 450, () => { stateRef.current = 'hidden'; });
      }
    };

    // Chequeo inicial por si la sección ya está en pantalla al cargar
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnim();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exitDirection, intensity]);

  return (
    <div
      ref={wrapperRef}
      className={`wind-section ${className}`}
      style={{
        willChange: 'transform, opacity, filter',
        isolation:  'isolate',
      }}
    >
      {children}
    </div>
  );
}