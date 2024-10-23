import React from 'react';

interface NumberDisplayProps {
  displayNumber: number | null;
  isShuffling: boolean;
}

export function NumberDisplay({ displayNumber, isShuffling }: NumberDisplayProps) {
  return (
    <div className="text-center mb-6">
      <div className={`text-[500px] leading-tight font-bold ${isShuffling ? 'text-gray-400' : 'text-blue-600'} h-[25rem] flex items-center justify-center transition-colors duration-300`}>
        {isShuffling ? (
          <span className="animate-pulse">{displayNumber}</span>
        ) : (
          displayNumber !== null ? displayNumber : '-'
        )}
      </div>
    </div>
  );
}