/* eslint-disable no-unused-vars */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface HeroWindSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

// ─── Disintegration canvas — dark mode ──────────────────────────────────────
// Recibe el progress (0→1) y la referencia al sticky para leer pixeles de la card
function DisintegrationCanvas({
  progress,
  cardRef,
}: {
  progress: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const progressRef = useRef(progress);
  useEffect(() => { progressRef.current = progress; }, [progress]);

  type Shard = {
    // posición origen (en coords del canvas fixed)
    ox: number; oy: number;
    // posición actual
    x: number; y: number;
    // velocidad
    vx: number; vy: number;
    // rotación
    angle: number; spin: number;
    // tamaño del fragmento
    w: number; h: number;
    // color base
    r: number; g: number; b: number;
    // vida
    life: number; maxLife: number;
    // cuándo empieza a moverse (stagger basado en posición)
    delay: number;
  };

  const shardsRef   = useRef<Shard[]>([]);
  const burstDoneRef = useRef(false);
  const prevProg    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Paleta de colores para los fragmentos — azules/violetas/blancos fríos
    const COLORS = [
      [160, 180, 255], [120, 140, 240], [200, 210, 255],
      [100, 120, 220], [220, 225, 255], [80,  100, 200],
    ];

    // Generar fragmentos que salen de la card hacia afuera
    const burst = (prog: number) => {
      if (!cardRef.current) return;
      const rect   = cardRef.current.getBoundingClientRect();
      const count  = 180;                     // total de fragmentos
      shardsRef.current = [];

      for (let i = 0; i < count; i++) {
        // Posición de origen aleatoria dentro de la card
        const ox = rect.left + Math.random() * rect.width;
        const oy = rect.top  + Math.random() * rect.height;

        // Dirección: mayormente hacia afuera desde el centro de la card
        const cx  = rect.left + rect.width  / 2;
        const cy  = rect.top  + rect.height / 2;
        const dx  = ox - cx;
        const dy  = oy - cy;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        // Velocidad — los fragmentos del borde salen más rápido
        const edgeFactor = Math.sqrt((dx / (rect.width  / 2)) ** 2 + (dy / (rect.height / 2)) ** 2);
        const speed = 3 + edgeFactor * 6 + Math.random() * 8;
        const spread = (Math.random() - 0.5) * 0.8;    // dispersión angular

        const col = COLORS[Math.floor(Math.random() * COLORS.length)];

        // Stagger: fragmentos del lado derecho salen primero (como barrido)
        const delay = (ox - rect.left) / rect.width * 0.3;

        shardsRef.current.push({
          ox, oy, x: ox, y: oy,
          vx: (dx / len + spread) * speed,
          vy: (dy / len + (Math.random() - 0.5) * 0.4) * speed,
          angle: Math.random() * Math.PI * 2,
          spin:  (Math.random() - 0.5) * 0.25,
          w: 3 + Math.random() * 10,
          h: 2 + Math.random() * 6,
          r: col[0], g: col[1], b: col[2],
          life: 0, maxLife: 40 + Math.random() * 30,
          delay,
        });
      }
      burstDoneRef.current = true;
    };

    const draw = () => {
      const prog = progressRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trigger burst cuando progress entra al rango activo
      if (prog > 0.05 && !burstDoneRef.current) {
        burst(prog);
      }
      // Reset si vuelve al inicio
      if (prog < 0.02 && burstDoneRef.current) {
        burstDoneRef.current = false;
        shardsRef.current = [];
      }

      // Actualizar y dibujar fragmentos
      const activeCount = shardsRef.current.length;
      for (let i = activeCount - 1; i >= 0; i--) {
        const s = shardsRef.current[i];

        // Stagger: no empieza a moverse hasta que prog > delay
        if (prog < s.delay) continue;
        const localProg = Math.min((prog - s.delay) / (1 - s.delay), 1);

        s.x     += s.vx * localProg * 0.8;
        s.y     += s.vy * localProg * 0.8;
        s.vy    += 0.15;                       // gravedad leve
        s.vx    *= 0.985;                      // fricción
        s.angle += s.spin;
        s.life++;

        const t     = s.life / s.maxLife;
        const alpha = t < 0.1 ? t / 0.1 : Math.pow(1 - t, 1.5);
        if (alpha < 0.01) continue;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        // Fragmento rectangular con glow
        ctx.shadowColor  = `rgba(${s.r},${s.g},${s.b},0.8)`;
        ctx.shadowBlur   = 6;
        ctx.fillStyle    = `rgba(${s.r},${s.g},${s.b},${alpha.toFixed(3)})`;
        ctx.fillRect(-s.w / 2, -s.h / 2, s.w, s.h);

        // Línea de trail
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${(alpha * 0.4).toFixed(3)})`;
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-s.vx * 2, -s.vy * 2);
        ctx.stroke();

        ctx.restore();
      }

      prevProg.current = prog;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [cardRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}
    />
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function HeroWindSection({
  children,
  className = '',
  intensity = 0.75,
}: HeroWindSectionProps) {
  const outerRef      = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const windCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef        = useRef<number>(0);
  // Progreso compartido entre scroll tick y draw loop — sin setState, sin re-renders
  const progressRef   = useRef(0);
  const isDarkRef     = useRef(false);

  const { resolvedTheme } = useTheme();

  const [isMobile,              setIsMobile]              = useState(false);
  const [disintegrationActive,  setDisintegrationActive]  = useState(false);
  const [disintegrationProgress, setDisintegrationProgress] = useState(0);
  // cardRef para que DisintegrationCanvas sepa dónde está la card
  const heroCardRef = useRef<HTMLDivElement | null>(null);

  // ── Detectar mobile ─────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Loop único: scroll + wind lines + dark mode en un solo rAF ──────────
  useEffect(() => {
    // En mobile no hay efecto — reset y salir
    if (isMobile) {
      if (stickyRef.current) {
        stickyRef.current.style.transform = 'none';
        stickyRef.current.style.opacity   = '1';
        stickyRef.current.style.filter    = 'none';
      }
      setDisintegrationActive(false);
      return;
    }

    const outer      = outerRef.current;
    const sticky     = stickyRef.current;
    const windCanvas = windCanvasRef.current;
    if (!outer || !sticky || !windCanvas) return;

    // ── Inicializar canvas de viento ──────────────────────────────────────
    const ctx = windCanvas.getContext('2d')!;

    // CRÍTICO: setear dimensiones explícitas en px, no confiar en CSS 100%
    const initCanvas = () => {
      const w = sticky.getBoundingClientRect().width;
      const h = sticky.getBoundingClientRect().height;
      // Solo actualizar si el tamaño cambió o es 0
      if (windCanvas.width !== Math.floor(w) || windCanvas.height !== Math.floor(h)) {
        windCanvas.width  = Math.floor(w)  || window.innerWidth;
        windCanvas.height = Math.floor(h)  || window.innerHeight;
      }
    };

    // Esperar al primer paint para tener dimensiones reales
    requestAnimationFrame(initCanvas);
    window.addEventListener('resize', initCanvas);

    // ── Wind lines state ──────────────────────────────────────────────────
    type WindLine = {
      x: number; y: number;
      angle: number; length: number; speed: number;
      life: number; maxLife: number;
      width: number; maxAlpha: number; curve: number;
    };
    const windLines: WindLine[] = [];
    let windFrame = 0;

    const spawnWindLine = (prog: number) => {
      const w = windCanvas.width;
      const h = windCanvas.height;
      if (w === 0 || h === 0) return;
      windLines.push({
        x:        Math.random() * w,
        y:        Math.random() * h,
        angle:    -0.65 + (Math.random() - 0.5) * 0.6,
        length:   50 + Math.random() * 90,
        speed:    6  + Math.random() * 6 + prog * 8,
        life:     0,
        maxLife:  16 + Math.random() * 16,
        width:    1.2 + Math.random() * 1.8,
        maxAlpha: 0.5 + Math.random() * 0.5,
        curve:    (Math.random() - 0.5) * 40,
      });
    };

    const drawWindLines = (prog: number) => {
      const w = windCanvas.width;
      const h = windCanvas.height;
      ctx.clearRect(0, 0, w, h);

      windFrame++;

      if (prog > 0.03 && prog < 0.97) {
        // Más líneas cuanto más avanza — de 1 a 5 por tick
        const rate = Math.ceil(1 + prog * 4);
        if (windFrame % 2 === 0) {
          for (let i = 0; i < rate; i++) spawnWindLine(prog);
        }
      }

      windLines.forEach(l => {
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;
        l.life++;

        const t     = l.life / l.maxLife;
        const alpha = t < 0.2
          ? (t / 0.2) * l.maxAlpha
          : l.maxAlpha * (1 - (t - 0.2) / 0.8);
        if (alpha < 0.015) return;

        const x0  = l.x - Math.cos(l.angle) * l.length;
        const y0  = l.y - Math.sin(l.angle) * l.length;
        const cpx = (x0 + l.x) / 2 + Math.sin(l.angle) * l.curve;
        const cpy = (y0 + l.y) / 2 - Math.cos(l.angle) * l.curve;

        const grd = ctx.createLinearGradient(x0, y0, l.x, l.y);
        grd.addColorStop(0,    'rgba(80, 140, 220, 0)');
        grd.addColorStop(0.2,  `rgba(100, 160, 240, ${alpha})`);
        grd.addColorStop(0.8,  `rgba(100, 160, 240, ${alpha})`);
        grd.addColorStop(1,    'rgba(80, 140, 220, 0)');

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cpx, cpy, l.x, l.y);
        ctx.strokeStyle = grd;
        ctx.lineWidth   = l.width;
        ctx.lineCap     = 'round';
        ctx.stroke();
      });

      // Limpiar líneas muertas
      for (let i = windLines.length - 1; i >= 0; i--) {
        if (windLines[i].life >= windLines[i].maxLife) windLines.splice(i, 1);
      }
    };

    // ── Warm particles (sunrise / sunset) ───────────────────────────────────
    type WarmParticle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; alpha: number;
      color: string;
    };
    const warmParticles: WarmParticle[] = [];
    let warmFrame = 0;

    const drawWarmParticles = (prog: number, isSunset: boolean) => {
      const w = windCanvas.width;
      const h = windCanvas.height;
      ctx.clearRect(0, 0, w, h);
      if (w === 0 || h === 0) return;
      warmFrame++;

      if (prog > 0.03 && prog < 0.95) {
        // sunrise: polvo dorado suave. sunset: brasas/embers con turbulencia
        const rate = Math.ceil(1 + prog * (isSunset ? 5 : 3));
        if (warmFrame % 2 === 0) {
          for (let i = 0; i < rate; i++) {
            const colors = isSunset
              ? ['rgba(255,100,30,', 'rgba(255,60,20,', 'rgba(255,160,40,', 'rgba(200,40,10,']
              : ['rgba(255,210,80,', 'rgba(255,190,60,', 'rgba(255,230,120,', 'rgba(255,170,50,'];
            warmParticles.push({
              x:       Math.random() * w,
              y:       h * (0.3 + Math.random() * 0.7), // nacer desde abajo
              vx:      (Math.random() - 0.5) * (isSunset ? 2.5 : 0.8),
              vy:      -(1.5 + Math.random() * (isSunset ? 3.5 : 2)),
              life:    0,
              maxLife: 30 + Math.random() * (isSunset ? 20 : 40),
              size:    isSunset ? (1 + Math.random() * 3) : (2 + Math.random() * 5),
              alpha:   0,
              color:   colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }

      warmParticles.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        // Sunset: turbulencia lateral como chispa
        if (isSunset) { p.vx += (Math.random() - 0.5) * 0.4; p.vy -= 0.06; }
        else          { p.vx *= 0.98; p.vy -= 0.01; }   // sunrise: sube tranquilo
        p.life++;

        const t = p.life / p.maxLife;
        p.alpha = t < 0.15 ? (t / 0.15) : (1 - t);
        if (p.alpha <= 0.01) return;

        // Glow suave
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grd.addColorStop(0,   `${p.color}${(p.alpha * (isSunset ? 0.9 : 0.6)).toFixed(2)})`);
        grd.addColorStop(0.4, `${p.color}${(p.alpha * (isSunset ? 0.4 : 0.25)).toFixed(2)})`);
        grd.addColorStop(1,   `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core brillante
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(p.alpha * 1.2, 1).toFixed(2)})`;
        ctx.fill();
      });

      // Limpiar muertas
      for (let i = warmParticles.length - 1; i >= 0; i--) {
        if (warmParticles[i].life >= warmParticles[i].maxLife) warmParticles.splice(i, 1);
      }
    };

    // ── Helpers ───────────────────────────────────────────────────────────
    const clamp       = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const easeIn      = (t: number) => t * t;
    const easeOut     = (t: number) => 1 - Math.pow(1 - t, 2);

    // ── Loop principal ────────────────────────────────────────────────────
    const tick = () => {
      const outerRect   = outer.getBoundingClientRect();
      const scrolled    = -outerRect.top;
      const extraScroll = window.innerHeight * 0.65;
      const progress    = clamp(scrolled / extraScroll, 0, 1);
      progressRef.current = progress;

      const classList = document.documentElement.classList;
      const sunrise = classList.contains('sunrise');
      const sunset  = classList.contains('sunset');
      // dark = ONLY the 'dark' class, NOT sunset (sunset has its own branch)
      const dark    = classList.contains('dark') && !sunrise && !sunset;
      isDarkRef.current = dark || sunset;

      if (progress <= 0) {
        sticky.style.transform = 'none';
        sticky.style.opacity   = '1';
        sticky.style.filter    = 'blur(0px)';
        // Limpiar canvas de viento
        ctx.clearRect(0, 0, windCanvas.width, windCanvas.height);
        setDisintegrationActive(false);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (sunrise || sunset) {
        // ── SUNRISE / SUNSET: deriva suave + partículas de luz ───
        ctx.clearRect(0, 0, windCanvas.width, windCanvas.height);

        const fly    = easeOut(progress);
        const driftX = Math.sin(progress * Math.PI) * 30 * intensity;
        const driftY = -fly * 120 * intensity;
        const rotate = Math.sin(progress * Math.PI * 1.2) * 5 * intensity * (1 - progress * 0.5);
        const scale   = 1 - easeIn(progress) * 0.04 * intensity;
        const opacity = progress < 0.4 ? 1 : clamp(1 - ((progress - 0.4) / 0.6) * 1.5, 0, 1);
        const blurPx  = progress < 0.5 ? 0 : easeIn((progress - 0.5) / 0.5) * 6 * intensity;

        sticky.style.transform = `translateX(${driftX}px) translateY(${driftY}px) rotate(${rotate}deg) scale(${scale})`;
        sticky.style.opacity   = String(Math.max(0, opacity));
        sticky.style.filter    = `blur(${blurPx}px)`;

        initCanvas();
        drawWarmParticles(progress, sunset);
        setDisintegrationActive(false);

      } else if (dark) {
        // ── DARK: desintegración — la card se disuelve en fragmentos ──
        ctx.clearRect(0, 0, windCanvas.width, windCanvas.height);

        // La card queda estática los primeros 0→0.08, luego empieza a perder opacidad
        // mientras las partículas salen. Sin transform — el efecto lo hacen los shards.
        // dissolve: 0 los primeros 8% de scroll, luego sube a 1 en el 68%
        const dissolve = progress < 0.08 ? 0 : clamp((progress - 0.08) / 0.6, 0, 1);
        const opacity  = 1 - dissolve;
        // Zoom-in: escala de 1 → 1.18 mientras se desvanece — efecto "se acerca"
        const scale    = 1 + dissolve * 0.18 * intensity;
        // Blur leve que acompaña el zoom para dar sensación de desenfoque de cámara
        const blurPx   = dissolve * 5 * intensity;

        sticky.style.transform    = `scale(${scale})`;
        sticky.style.transformOrigin = '50% 50%';
        sticky.style.opacity      = String(Math.max(0, opacity));
        sticky.style.filter       = `blur(${blurPx}px)`;

        // Guardar ref de la card para el canvas de desintegración
        const cardEl = sticky.querySelector('[data-hero-card]') as HTMLDivElement | null;
        if (cardEl && heroCardRef.current !== cardEl) heroCardRef.current = cardEl;

        setDisintegrationProgress(progress);
        setDisintegrationActive(progress > 0.05);

      } else {
        // ── LIGHT: viento ────────────────────────────────────────
        const fly    = easeOut(progress);
        const driftX =  fly * 90  * intensity;
        const driftY = -fly * 160 * intensity;
        const rotate = fly * 12 * intensity
          + Math.sin(progress * Math.PI * 2.2) * 4 * intensity * (1 - progress);
        const scale   = 1 - easeIn(progress) * 0.07 * intensity;
        const opacity = progress < 0.3 ? 1 : clamp(1 - ((progress - 0.3) / 0.7) * 1.3, 0, 1);
        const blurPx  = progress < 0.45 ? 0 : easeIn((progress - 0.45) / 0.55) * 10 * intensity;

        sticky.style.transform = `translateX(${driftX}px) translateY(${driftY}px) rotate(${rotate}deg) scale(${scale})`;
        sticky.style.opacity   = String(Math.max(0, opacity));
        sticky.style.filter    = `blur(${blurPx}px)`;

        initCanvas();
        drawWindLines(progress);
        setDisintegrationActive(false);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', initCanvas);
      if (sticky) {
        sticky.style.transform = 'none';
        sticky.style.opacity   = '1';
        sticky.style.filter    = 'none';
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intensity, resolvedTheme, isMobile]);

  return (
    <>
      {disintegrationActive && isMobile === false &&  <DisintegrationCanvas progress={disintegrationProgress} cardRef={heroCardRef} />}

      <div
        ref={outerRef}
        className={`hero-wind-outer ${className}`}
        style={isMobile !== false
          ? { height: 'auto', overflow: 'visible' }
          : { height: '165vh', marginBottom: '-30vh', overflow: 'visible' }
        }
      >
        <div
          ref={stickyRef}
          style={isMobile !== false
            ? { position: 'relative', height: 'auto', zIndex: 10, overflow: 'visible' }
            : {
                position:        'sticky',
                top:             0,
                height:          '100vh',
                willChange:      'transform, opacity, filter',
                transformOrigin: '50% 100%',
                zIndex:          10,
                overflow:        'visible',
              }
          }
        >
          {children}

          {/* Canvas dentro del sticky — se transforma con la sección */}
          <canvas
            ref={windCanvasRef}
            style={{
              position:      'absolute',
              inset:         0,
              zIndex:        20,
              pointerEvents: 'none',
              display: isMobile !== false ? 'none' : 'block',
              // NO usar width/height 100% en CSS — el canvas se setea en px via JS
            }}
          />
        </div>
      </div>
    </>
  );
}