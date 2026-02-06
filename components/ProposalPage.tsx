
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Stars } from 'lucide-react';
import { Position } from '../types';

interface ProposalPageProps {
  onAccept: () => void;
}

const NO_MESSAGES = [
  "Hmm… that was suspicious 😏",
  "Chioma please 😭",
  "At this point you’re just flirting",
  "Wrong button! Try again! ❤️",
  "Is that your final answer? 🤨",
  "I think your finger slipped...",
  "Are you testing my patience? 😂",
  "Stop playing hard to get! 💘",
  "Nice try, but I don't see a 'No' here."
];

const ProposalPage: React.FC<ProposalPageProps> = ({ onAccept }) => {
  const [noPos, setNoPos] = useState<Position>({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [teaseMessage, setTeaseMessage] = useState("");
  const [extraYesButtons, setExtraYesButtons] = useState<Position[]>([]);
  const [greeting, setGreeting] = useState("");
  const [deviceNote, setDeviceNote] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning, Chioma ☀️");
    else if (hour < 18) setGreeting("Good afternoon, Chioma 🌤️");
    else setGreeting("Good evening, Chioma 🌙");

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setDeviceNote(isMobile 
      ? "Chioma, you look cute holding your phone rn 😌" 
      : "Big screen energy… serious Valentine vibes 😏"
    );
  }, []);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 100;
    
    const newX = Math.random() * (rect.width - padding) - (rect.width / 2) + (padding / 2);
    const newY = Math.random() * (rect.height - padding) - (rect.height / 2) + (padding / 2);

    setNoPos({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
    setTeaseMessage(NO_MESSAGES[Math.floor(Math.random() * NO_MESSAGES.length)]);

    // Spawn 1 or 2 extra yes buttons at random positions
    const newYes: Position[] = [];
    const count = Math.random() > 0.5 ? 2 : 1;
    for (let i = 0; i < count; i++) {
        newYes.push({
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 50)
        });
    }
    setExtraYesButtons(prev => [...prev, ...newYes]);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden z-10"
    >
      {/* Decorative Icons */}
      <div className="absolute top-10 left-10 text-rose-300 animate-pulse">
        <Heart size={48} fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-10 text-rose-300 animate-bounce">
        <Stars size={48} />
      </div>

      {/* Main Card */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border-4 border-rose-100 transform transition-all">
        <p className="text-rose-500 font-medium mb-2">{greeting}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-cursive">
          Chioma, will you be my Valentine? 💖
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          I promise love, snacks, attention, and unlimited kisses 😌❤️
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onAccept}
            className="group relative bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-110 active:scale-95 transition-all text-xl"
          >
            YES 💕
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full text-rose-900 font-bold animate-bounce">
              BEST CHOICE
            </span>
          </button>

          {noCount < 15 && (
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: noCount > 0 ? 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-4 px-10 rounded-full transition-colors text-lg"
            >
              NO 🙄
            </button>
          )}
        </div>

        {teaseMessage && (
          <p className="mt-6 text-rose-400 font-bold italic animate-bounce">
            {teaseMessage}
          </p>
        )}
      </div>

      <p className="mt-8 text-rose-400/80 font-medium text-sm animate-pulse">
        {deviceNote}
      </p>

      {/* Spawning extra YES buttons */}
      {extraYesButtons.map((pos, idx) => (
        <button
          key={idx}
          onClick={onAccept}
          className="fixed bg-rose-500 text-white font-bold py-2 px-6 rounded-full shadow-md z-50 animate-bounce hover:scale-110 active:scale-90"
          style={{ 
            left: pos.x, 
            top: pos.y, 
            transition: 'all 0.5s ease-out' 
          }}
        >
          YES 💕
        </button>
      ))}
    </div>
  );
};

export default ProposalPage;
