import React from 'react';

interface GradientNameProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function GradientName({ children, size = 'medium', className = '' }: GradientNameProps) {
  const sizeClasses = {
    small: 'text-lg sm:text-xl lg:text-2xl',
    medium: 'text-2xl sm:text-3xl lg:text-4xl',
    large: 'text-4xl sm:text-5xl lg:text-7xl',
  };

  return (
    <span className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      <span className="animate-gradient bg-gradient-to-r bg-clip-text text-transparent 
        from-green-500 via-blue-500 to-purple-500
        animate-gradient bg-[length:200%_auto]">
        {children}
      </span>
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