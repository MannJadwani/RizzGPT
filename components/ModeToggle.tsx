import React from 'react';
import { RizzMode } from '../types';

interface ModeToggleProps {
  currentMode: RizzMode;
  setMode: (mode: RizzMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, setMode }) => {
  const modes = [
    { id: RizzMode.GENERIC, label: 'Standard' },
    { id: RizzMode.CHAT_HISTORY, label: 'Chat History' },
    { id: RizzMode.SCREENSHOT, label: 'Screenshot' },
  ];

  return (
    <div className="flex p-1 bg-white/50 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 mb-8 mx-auto w-fit">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setMode(mode.id)}
          className={`
            px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
            ${currentMode === mode.id 
              ? 'bg-white shadow-md text-gray-900 scale-100' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/40'}
          `}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;