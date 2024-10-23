import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Shuffle } from 'lucide-react';
import { AudioControl } from './components/AudioControl';
import { NumberDisplay } from './components/NumberDisplay';
import { SelectedNumbers } from './components/SelectedNumbers';

const MAX_NUMBER = 140;
const SHUFFLE_DURATION = 4000;
const INITIAL_INTERVAL = 50;

// Using a reliable audio hosting URL
const BGM_URL = '/home/kazu15/sb1-cdggap/src/SE114_2.mp3';

function App() {
  const [numbers, setNumbers] = useState<number[]>(Array.from({ length: MAX_NUMBER }, (_, i) => i + 1));
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const shuffleAnimation = useCallback(() => {
    setIsShuffling(true);
    const startTime = Date.now();
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
    
    const shuffle = () => {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime < SHUFFLE_DURATION) {
        setDisplayNumber(Math.floor(Math.random() * MAX_NUMBER) + 1);
        const progress = elapsedTime / SHUFFLE_DURATION;
        const nextInterval = INITIAL_INTERVAL + (450 * Math.pow(progress, 2));
        setTimeout(shuffle, nextInterval);
      } else {
        setIsShuffling(false);
        setDisplayNumber(currentNumber);
      }
    };

    shuffle();
  }, [currentNumber]);

  const generateRandomNumber = useCallback(() => {
    if (numbers.length === 0) {
      setCurrentNumber(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const selectedNumber = numbers[randomIndex];

    setCurrentNumber(selectedNumber);
    setTimeout(() => {
      setSelectedNumbers(prev => [...prev, selectedNumber]);
    }, SHUFFLE_DURATION + 1000);
    
    setNumbers(prev => prev.filter(num => num !== selectedNumber));
    shuffleAnimation();
  }, [numbers.length, shuffleAnimation]);

  const resetGame = useCallback(() => {
    setNumbers(Array.from({ length: MAX_NUMBER }, (_, i) => i + 1));
    setSelectedNumbers([]);
    setCurrentNumber(null);
    setDisplayNumber(null);
  }, []);

  useEffect(() => {
    if (!isShuffling && currentNumber !== null) {
      setDisplayNumber(currentNumber);
    }
  }, [isShuffling, currentNumber]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <AudioControl isMuted={isMuted} onToggleMute={toggleMute} />
      
      <h1 className="text-[50px] font-bold mb-8">抽選結果発表</h1>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-[50rem]">
        <NumberDisplay displayNumber={displayNumber} isShuffling={isShuffling} />
        
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={generateRandomNumber}
            disabled={numbers.length === 0 || isShuffling}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isShuffling && <Shuffle className="animate-spin mr-2" size={20} />}
            抽選する
          </button>
        </div>
        
        <SelectedNumbers numbers={selectedNumbers} />
      </div>
      
      <button
        onClick={resetGame}
        disabled={isShuffling}
        className="mt-8 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset
      </button>
      
      <audio ref={audioRef} src={BGM_URL} preload="auto" />
    </div>
  );
}

export default App;