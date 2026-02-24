import React, { useMemo } from 'react';

interface GradientNameProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  technology?: TechnologyName;
}

type TechnologyColorScheme = {
  light: string[];
  dark: string[];
};

type TechnologyColors = {
  [key: string]: TechnologyColorScheme;
};

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

const TECHNOLOGY_COLORS: TechnologyColors = {
  React: {
    light: ['#61DAFB', '#00B7FF', '#0088FF'],
    dark: ['#61DAFB', '#00D8FF', '#0088FF']
  },
  JavaScript: {
    light: ['#F7DF1E', '#E8D44D', '#C8B900'], // Brighter yellow to darker gold
    dark: ['#F7DF1E', '#FFD700', '#FFA500']
  },
  Angular: {
    light: ['#DD0031', '#C3002F', '#A6002A'],
    dark: ['#FF1744', '#FF4081', '#FF80AB']
  },
  'Node.js': {
    light: ['#339933', '#2E8B57', '#228B22'],
    dark: ['#66CC33', '#32CD32', '#00FF00']
  },
  TypeScript: {
    light: ['#007ACC', '#0288D1', '#039BE5'],
    dark: ['#007ACC', '#00B0FF', '#40C4FF']
  },
  Python: {
    light: ['#3776AB', '#4B8BBE', '#646464'],
    dark: ['#FFD43B', '#FFE873', '#FFF8DC']
  },
  Java: {
    light: ['#007396', '#5382A1', '#F8981D'],
    dark: ['#5382A1', '#1565C0', '#F8981D']
  },
  'C#': {
    light: ['#239120', '#37A93C', '#4CAF50'],
    dark: ['#67CF76', '#9CCC65', '#C5E1A5']
  },
  PHP: {
    light: ['#777BB4', '#8892BF', '#4F5B93'],
    dark: ['#8892BF', '#B0BEC5', '#CFD8DC']
  },
  Ruby: {
    light: ['#CC342D', '#E0115F', '#FF0000'],
    dark: ['#FF6347', '#FF4500', '#FF0000']
  },
  NextJs: {
    light: ['#000000', '#333333', '#666666'],
    dark: ['#FFFFFF', '#AAAAAA', '#CCCCCC']
  }
};
export type TechnologyName = keyof typeof TECHNOLOGY_COLORS;
// Colores específicos para tecnologías



export default function GradientName({
  children,
  size = 'medium',
  className = '',
  technology,
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
        <LightDarkGradient mode="light" technology={technology}>{children}</LightDarkGradient>
      </span>
      
      {/* Versión modo oscuro */}
      <span className="hidden dark:inline">
        <LightDarkGradient mode="dark" technology={technology}>{children}</LightDarkGradient>
      </span>
    </span>
  );
}

interface LightDarkGradientProps {
  children: React.ReactNode;
  mode: 'light' | 'dark';
  technology?: TechnologyName;
}

function LightDarkGradient({ children, mode, technology }: LightDarkGradientProps) {
  const selectedPalette = useMemo(() => {
  if (technology && TECHNOLOGY_COLORS[technology]) {
    return TECHNOLOGY_COLORS[technology][mode];
  }

  const palettes = COLOR_PALETTES[mode];
  const randomIndex = Math.floor(Math.random() * palettes.length);
  return palettes[randomIndex];
}, [mode, technology]);

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