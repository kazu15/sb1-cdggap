import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export function AudioControl({ isMuted, onToggleMute }: AudioControlProps) {
  return (
    <div className="fixed top-4 right-4">
      <button
        onClick={onToggleMute}
        className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors"
      >
        {isMuted ? <VolumeX size={30} /> : <Volume2 size={30} />}
      </button>
    </div>
  );
}