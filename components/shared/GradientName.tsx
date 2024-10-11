import React, { useMemo } from 'react';

interface GradientNameProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Paletas de colores optimizadas para modo claro y oscuro
const COLOR_PALETTES = {
  light: [
    ['#0366D6', '#2EA043', '#2188FF'], // GitHub azul, verde, azul claro
    ['#4969E1', '#2EA043', '#6F42C1'], // Azul royal, verde, púrpura
    ['#1A73E8', '#188038', '#A142F4'], // Google blue, green, purple
    ['#0060B9', '#2EA043', '#5E17EB'], // Azure blue, verde, violeta
  ],
  dark: [
    ['#58A6FF', '#3FB950', '#79C0FF'], // GitHub azul claro, verde claro, celeste
    ['#79C0FF', '#56D364', '#D2A8FF'], // Celeste, verde claro, lavanda
    ['#39D353', '#388BFD', '#8957E5'], // Verde neón, azul brillante, púrpura
  ]
};

export default function GradientName({
  children,
  size = 'medium',
  className = '',
}: GradientNameProps) {
  const sizeClasses = {
    small: 'text-lg sm:text-xl lg:text-2xl',
    medium: 'text-2xl sm:text-3xl lg:text-4xl',
    large: 'text-4xl sm:text-5xl lg:text-7xl',
  };

  return (
    <span className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      {/* Versión modo claro */}
      <span className="dark:hidden">
        <LightDarkGradient mode="light">{children}</LightDarkGradient>
      </span>
      
      {/* Versión modo oscuro */}
      <span className="hidden dark:inline">
        <LightDarkGradient mode="dark">{children}</LightDarkGradient>
      </span>
    </span>
  );
}

interface LightDarkGradientProps {
  children: React.ReactNode;
  mode: 'light' | 'dark';
}

function LightDarkGradient({ children, mode }: LightDarkGradientProps) {
  const selectedPalette = useMemo(() => {
    const palettes = COLOR_PALETTES[mode];
    const randomIndex = Math.floor(Math.random() * palettes.length);
    return palettes[randomIndex];
  }, [mode]);

  const [fromColor, viaColor, toColor] = selectedPalette;

  return (
    <span
      className="animate-gradient bg-gradient-to-r bg-clip-text text-transparent 
      animate-gradient bg-[length:200%_auto]"
      style={{
        backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </span>
  );
}