import React, { useMemo } from 'react';

interface GradientNameProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Paletas de colores predefinidas que son coherentes entre sí
const COLOR_PALETTES = [
  ['#FF6B6B', '#4ECDC4', '#45B7D1'], // Rojo, turquesa, azul claro
  ['#FFB347', '#FF7F50', '#FF4500'], // Naranjas
  ['#8A2BE2', '#9370DB', '#BA55D3'], // Púrpuras
  ['#3498db', '#2980b9', '#1abc9c'], // Azules y verde azulado
  ['#2ecc71', '#27ae60', '#f1c40f'], // Verdes y amarillo
  ['#e74c3c', '#c0392b', '#f39c12'], // Rojos y naranja
  ['#2E4053', '#5D6D7E', '#AAB7B8'], // Grises azules
  ['#1ABC9C', '#16A085', '#F39C12'], // Verde aguamarina y amarillo
  ['#F1C40F', '#F39C12', '#E67E22'], // Amarillo y naranjas
  ['#D35400', '#E67E22', '#C0392B']  // Naranjas y rojos oscuros
];

export default function GradientName({
  children,
  size = 'medium',
  className = '',
}: GradientNameProps) {
  const sizeClasses = {
    small: 'text-lg sm:text-xl lg:text-xl',
    medium: 'text-2xl sm:text-3xl lg:text-4xl',
    large: 'text-4xl sm:text-5xl lg:text-7xl',
  };

  // Seleccionar una paleta aleatoria al montar el componente
  const selectedPalette = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * COLOR_PALETTES.length);
    return COLOR_PALETTES[randomIndex];
  }, []);

  const [fromColor, viaColor, toColor] = selectedPalette;

  return (
    <span className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      <span
        className="animate-gradient bg-gradient-to-r bg-clip-text text-transparent 
        animate-gradient bg-[length:200%_auto]"
        style={{
          backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`
        }}
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </span>
  );
}