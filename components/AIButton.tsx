import React from 'react';

interface AIButtonProps {
  onClick: () => void;
  isLoading: boolean;
  text: string;
}

const AIButton: React.FC<AIButtonProps> = ({ onClick, isLoading, text }) => {
  return (
    <div className="relative group perspective-1000 w-full max-w-sm mx-auto mt-8">
      {/* Outer glow/shadow for depth */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
      
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          relative w-full h-16 rounded-full overflow-hidden
          bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700
          shadow-lg shadow-indigo-500/30
          transform transition-all duration-300
          hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-80 disabled:cursor-not-allowed
          flex items-center justify-center gap-3
        `}
      >
        {/* Top glossy reflection - the "Glass" effect */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none"></div>
        
        {/* Inner rim highlight */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20 pointer-events-none"></div>

        {/* Content */}
        <span className={`text-white font-bold text-xl tracking-wide drop-shadow-md flex items-center gap-2 ${isLoading ? 'animate-pulse' : ''}`}>
          {isLoading ? 'Cooking...' : text}
          
          {/* Sparkles SVG */}
          {!isLoading && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
              <path d="M18 16L19 19L22 20L19 21L18 24L17 21L14 20L17 19L18 16Z" fill="currentColor" opacity="0.8"/>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default AIButton;