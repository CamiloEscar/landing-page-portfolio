'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ExternalLink, Clock, Zap } from 'lucide-react';
import { dataTechModal } from '@/data';
import { iconMap, IconMapKey } from '@/components/shared/iconMap';
import { useTheme } from 'next-themes';

interface TechModalProps {
  techKey: string | null;
  onClose: () => void;
}

const TECH_COLORS: Record<string, string> = {
  react: '#61DAFB', 'next-js': '#aaaaaa', typescript: '#3178C6',
  javascript: '#F7DF1E', nodejs: '#339933', tailwindcss: '#06B6D4',
  mongodb: '#47A248', python: '#3776AB', docker: '#2496ED',
  postgresql: '#336791', php: '#777BB4', laravel: '#FF2D20',
  angular: '#DD0031', vue: '#4FC08D', graphql: '#E10098',
  express: '#68d391', vite: '#646CFF', html5: '#E34F26',
  css3: '#1572B6', 'socket-io': '#888', webpack: '#8DD6F9',
  babel: '#F9DC3E', sass: '#CC6699', redux: '#764ABC',
  oauth: '#7c7c7c', jwt: '#F7B731', django: '#44B78B',
  mysql: '#4479A1', axios: '#5A29E4', powerbi: '#F2C811',
  tableau: '#E97627',
};

const LEVEL_CONFIG: Record<string, { pct: number; dots: number; label: string }> = {
  'Básico':     { pct: 33,  dots: 1, label: 'Básico'     },
  'Intermedio': { pct: 66,  dots: 2, label: 'Intermedio' },
  'Avanzado':   { pct: 100, dots: 3, label: 'Avanzado'   },
};

function getTechColor(key: string) { return TECH_COLORS[key] ?? '#6366f1'; }
function formatName(key: string) {
  return key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Arco circular SVG para el nivel
function CircularLevel({ pct, color, size = 72 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
      <motion.circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
      />
    </svg>
  );
}

export default function TechModal({ techKey, onClose }: TechModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark' || resolvedTheme === 'sunset';

  const data   = techKey ? dataTechModal.find(t => t.key === techKey) ?? null : null;
  const icon   = techKey && techKey in iconMap ? iconMap[techKey as IconMapKey] : null;
  const color  = getTechColor(techKey ?? '');
  const name   = formatName(techKey ?? '');
  const lvl    = data ? LEVEL_CONFIG[data.level] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = techKey ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [techKey]);

  // Colores base del panel izquierdo
  const panelBg  = isDark ? 'rgba(6,8,20,0.98)'    : 'rgba(18,18,28,0.96)';
  const modalBg  = isDark ? 'rgba(9,11,26,0.98)'   : 'rgba(252,252,255,0.99)';
  // const rightBgR = isDark ? '9,11,26'              : '252,252,255';

  return (
    <AnimatePresence>
      {techKey && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === overlayRef.current) onClose(); }}
          style={{
            background: isDark ? 'rgba(0,0,8,0.85)' : 'rgba(200,210,230,0.75)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 24,  scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            style={{
              borderRadius: '24px',
              background: modalBg,
              border: isDark
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(0,0,0,0.08)',
              boxShadow: isDark
                ? `0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03), 0 0 80px ${color}15`
                : `0 30px 90px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04), 0 0 60px ${color}10`,
            }}
          >
            {/* Imagen de fondo que sangra del panel izq al der */}
            {data?.image && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]" style={{ zIndex: 0 }}>
                <Image
                  src={data.image} alt={name} fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover object-center"
                  style={{ opacity: 0.04, mixBlendMode: isDark ? 'screen' : 'multiply' }}
                />
              </div>
            )}

            <div className="relative flex flex-col sm:flex-row" style={{ maxHeight: '90vh', zIndex: 1 }}>

              {/* ══ PANEL IZQUIERDO ══════════════════════════════════════ */}
              <div
                className="relative sm:w-52 flex-shrink-0 flex flex-col items-center justify-between overflow-hidden"
                style={{
                  borderRadius: '24px 0 0 24px',
                  background: panelBg,
                  minHeight: '280px',
                  padding: '32px 20px 24px',
                }}
              >
                {/* Malla de puntos animada — fondo atmosférico */}
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07 }}>
                  <defs>
                    <pattern id={`dot-${techKey}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="1.5" fill={color} />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dot-${techKey})`} />
                </svg>

                {/* Glow radial del color de la tech */}
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(ellipse 140% 80% at 50% 110%, ${color}22 0%, transparent 65%)`,
                }} />

                {/* Línea superior decorativa del color */}
                <motion.div
                  className="absolute top-0 left-4 right-4 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${color}88, transparent)` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />

                {/* Icono central con anillo circular de nivel */}
                <div className="relative flex items-center justify-center mt-2">
                  {lvl && (
                    <div className="absolute">
                      <CircularLevel pct={lvl.pct} color={color} size={96} />
                    </div>
                  )}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 340, damping: 22 }}
                    className="relative text-5xl"
                    style={{ filter: `drop-shadow(0 0 18px ${color}80)` }}
                  >
                    {icon}
                  </motion.div>
                </div>

                {/* Nombre de la tech */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="relative text-center font-bold tracking-tight text-white mt-4"
                  style={{ fontSize: '1.05rem', textShadow: `0 0 20px ${color}66` }}
                >
                  {name}
                </motion.p>

                {/* Nivel como texto con dots */}
                {lvl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.28 }}
                    className="relative flex flex-col items-center gap-2 mt-3"
                  >
                    <div className="flex gap-1.5">
                      {[1,2,3].map(d => (
                        <motion.div
                          key={d}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: d <= lvl.dots ? color : 'rgba(255,255,255,0.12)',
                            boxShadow: d <= lvl.dots ? `0 0 6px ${color}` : 'none',
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + d * 0.07, type: 'spring' }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                      style={{ color: `${color}cc` }}>
                      {lvl.label}
                    </span>
                  </motion.div>
                )}

                {/* Años de experiencia — elemento tipográfico grande */}
                {data?.yearsExp && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="relative mt-auto pt-5 flex flex-col items-center"
                  >
                    <div className="w-8 h-px mb-3" style={{ background: `${color}44` }} />
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Clock size={10} />
                      <span className="text-[10px] tracking-wide">{data.yearsExp}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ══ PANEL DERECHO ════════════════════════════════════════ */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

                {/* Header */}
                <div
                  className="flex items-start justify-between px-6 pt-5 pb-4 flex-shrink-0"
                  style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
                >
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 }}
                      className="flex items-center gap-2 mb-0.5"
                    >
                      {/* Pill del color de la tech */}
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                      />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: isDark ? `${color}99` : color }}>
                        Tecnología
                      </span>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.11 }}
                      className="text-xl font-bold tracking-tight"
                      style={{ color: isDark ? '#f0f4ff' : '#0d0f1a' }}
                    >
                      {name}
                    </motion.h2>
                  </div>

                  <motion.button
                    onClick={onClose}
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-4"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
                    }}
                    whileHover={{
                      rotate: 90,
                      background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <X size={13} />
                  </motion.button>
                </div>

                {/* Cuerpo scrolleable */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5"
                  style={{ scrollbarWidth: 'none' }}>
                  {data ? (
                    <>
                      {/* Resumen con línea lateral de color */}
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.14 }}
                        className="relative pl-3"
                        style={{ borderLeft: `2px solid ${color}55` }}
                      >
                        <p className="text-sm leading-relaxed"
                          style={{ color: isDark ? 'rgba(255,255,255,0.52)' : 'rgba(0,0,0,0.56)' }}>
                          {data.summary}
                        </p>
                      </motion.div>

                      {/* Habilidades */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <Zap size={10} style={{ color }} />
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: isDark ? `${color}88` : `${color}bb` }}>
                            Habilidades
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {data.highlights.map((h, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.85, y: 4 }}
                              animate={{ opacity: 1, scale: 1,    y: 0 }}
                              transition={{ delay: 0.22 + i * 0.035, type: 'spring', stiffness: 400 }}
                              className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                              style={{
                                background: isDark ? `${color}0e` : `${color}0c`,
                                color:      isDark ? `${color}e0` : color,
                                border:     `1px solid ${color}22`,
                              }}
                            >
                              {h}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Proyectos como timeline */}
                      {data.relatedProjects.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em]"
                              style={{ color: isDark ? `${color}88` : `${color}bb` }}>
                              Proyectos
                            </p>
                          </div>

                          {/* Timeline vertical */}
                          <div className="relative pl-4">
                            {/* Línea vertical */}
                            <div className="absolute left-1.5 top-1 bottom-1 w-px"
                              style={{ background: `linear-gradient(to bottom, ${color}55, ${color}11)` }} />

                            <div className="space-y-2">
                              {data.relatedProjects.map((p, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.32 + i * 0.07 }}
                                  className="group relative flex items-start gap-3 p-2.5 rounded-xl cursor-default"
                                  style={{
                                    background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
                                    border: '1px solid transparent',
                                    transition: 'background 0.15s, border-color 0.15s',
                                  }}
                                  onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.background = isDark ? `${color}0c` : `${color}07`;
                                    el.style.borderColor = `${color}25`;
                                  }}
                                  onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.background = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)';
                                    el.style.borderColor = 'transparent';
                                  }}
                                >
                                  {/* Dot del timeline */}
                                  <div className="absolute -left-[11px] top-3.5 w-2 h-2 rounded-full border-2 flex-shrink-0"
                                    style={{
                                      background: modalBg,
                                      borderColor: color,
                                      boxShadow: `0 0 6px ${color}66`,
                                    }} />

                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold leading-tight truncate"
                                      style={{ color: isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.78)' }}>
                                      {p.title}
                                    </p>
                                    <p className="text-xs mt-0.5 leading-snug"
                                      style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.36)' }}>
                                      {p.description}
                                    </p>
                                  </div>

                                  {p.url && (
                                    <Link
                                      href={p.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg"
                                      style={{ background: `${color}18` }}
                                    >
                                      <ArrowUpRight size={13} style={{ color }} />
                                    </Link>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <div className="py-12 flex flex-col items-center gap-3">
                      <div className="text-5xl opacity-15">{icon}</div>
                      <p className="text-sm text-center"
                        style={{ color: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.28)' }}>
                        Sin datos para{' '}
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(0,0,0,0.48)' }}>
                          {name}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  className="flex-shrink-0 flex items-center justify-between px-6 py-3"
                  style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}
                >
                  <span className="text-[11px]"
                    style={{ color: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.2)' }}>
                    <kbd className="px-1.5 py-0.5 rounded-md text-[10px] font-mono"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)'}`,
                      }}>
                      esc
                    </kbd>
                    {' '}para cerrar
                  </span>
                  <Link
                    href="https://github.com/CamiloEscar"
                    target="_blank"
                    className="flex items-center gap-1.5 text-[11px] transition-opacity hover:opacity-70"
                    style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)' }}
                  >
                    <ExternalLink size={10} />
                    CamiloEscar
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}