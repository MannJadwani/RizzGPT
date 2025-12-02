import React, { useState } from 'react';

interface ResultCardProps {
  text: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!text) return null;

  return (
    <div className="mt-8 transform transition-all animate-[fadeIn_0.5s_ease-out]">
      <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl">
        <div className="absolute -top-3 right-8">
            <button 
                onClick={handleCopy}
                className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-700 transition shadow-lg flex items-center gap-1"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
        <p className="text-gray-800 text-xl md:text-2xl font-medium leading-relaxed text-center font-sans tracking-tight">
          "{text}"
        </p>
      </div>
    </div>
  );
};

export default ResultCard;