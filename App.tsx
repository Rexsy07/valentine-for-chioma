import React, { useState, useCallback, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ProposalPage from './components/ProposalPage';
import CelebrationPage from './components/CelebrationPage';
import FloatingHearts from './components/FloatingHearts';
import { AppState } from './types';
import musicFile from './young and beautiful - lana del rey (slowed n reverb).mp3';

const MUSIC_URL = musicFile;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('PROPOSAL');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audio] = useState(new Audio(MUSIC_URL));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    if (audioEnabled) {
      audio.play().catch(err => console.log("Audio play failed:", err));
    } else {
      audio.pause();
    }
  }, [audioEnabled, audio]);

  const handleAccept = useCallback(() => {
    setCurrentPage('CELEBRATION');
    const burst = document.createElement('div');
    burst.className = 'fixed inset-0 pointer-events-none z-[100]';
    document.body.appendChild(burst);
    
    for (let i = 0; i < 100; i++) {
        const span = document.createElement('span');
        span.innerText = ['💖', '✨', '😍', '🎉', '🌸'][Math.floor(Math.random() * 5)];
        span.className = 'absolute text-2xl';
        span.style.left = '50%';
        span.style.top = '50%';
        span.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        burst.appendChild(span);
        
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 300 + Math.random() * 500;
            span.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 360}deg)`;
            span.style.opacity = '0';
        }, 10);
    }
    setTimeout(() => document.body.removeChild(burst), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-200 relative">
      <FloatingHearts />
      
      {/* Audio Control */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="fixed top-6 right-6 z-50 bg-white/50 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100 hover:bg-white transition-all text-rose-500 flex items-center gap-2 text-sm font-semibold"
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        <span>Tap for vibes</span>
      </button>

      {currentPage === 'PROPOSAL' ? (
        <ProposalPage onAccept={handleAccept} />
      ) : (
        <CelebrationPage />
      )}
    </div>
  );
};

export default App;
