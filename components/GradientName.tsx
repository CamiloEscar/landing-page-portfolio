import React from 'react';

export default function GradientName() {
  return (
    <div className="relative">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6">
        <span className="animate-gradient bg-gradient-to-r bg-clip-text text-transparent 
          from-green-500 via-blue-500 to-purple-500
          animate-gradient bg-[length:200%_auto]">
          Camilo Escar
        </span>
      </h1>
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
    </div>
  );
}